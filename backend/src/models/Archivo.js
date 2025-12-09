import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Archivo = sequelize.define(
  "Archivo",
  {
    IdArchivo: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    IdUsuario: { type: DataTypes.INTEGER, allowNull: false },
    Nombre: { type: DataTypes.STRING(95), allowNull: false },
    Tipo: DataTypes.STRING(75),
    Tamano: DataTypes.DECIMAL(10, 2),
    Ruta: { type: DataTypes.STRING(155), allowNull: false },
    FechaSubida: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    Estado: {
      type: DataTypes.ENUM("Visible", "Restringido"),
      defaultValue: "Visible"
    }
  },
  { tableName: "Archivo", timestamps: false }
);
