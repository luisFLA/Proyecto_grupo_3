import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Descargas = sequelize.define(
  "Descargas",
  {
    IdDescarga: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    IdUsuario: DataTypes.INTEGER,
    IdArchivo: DataTypes.INTEGER,
    Fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { tableName: "Descargas", timestamps: false }
);
