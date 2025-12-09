import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Compartir = sequelize.define(
  "Compartir",
  {
    IdCompartir: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    IdUsuarioEmisor: DataTypes.INTEGER,
    IdUsuarioReceptor: DataTypes.INTEGER,
    IdArchivo: DataTypes.INTEGER,
    IdColeccion: DataTypes.INTEGER,
    Fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { tableName: "Compartir", timestamps: false }
);
