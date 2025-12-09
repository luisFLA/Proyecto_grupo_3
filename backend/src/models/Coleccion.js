import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Coleccion = sequelize.define(
  "Coleccion",
  {
    IdColeccion: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    IdUsuario: { type: DataTypes.INTEGER, allowNull: false },
    Nombre: { type: DataTypes.STRING(95), allowNull: false },
    Descripcion: DataTypes.STRING(75),
    FechaCreacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { tableName: "Coleccion", timestamps: false }
);
