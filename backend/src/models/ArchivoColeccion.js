import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ArchivoColeccion = sequelize.define(
  "ArchivoColeccion",
  {
    IdArchivo: { type: DataTypes.INTEGER, primaryKey: true },
    IdColeccion: { type: DataTypes.INTEGER, primaryKey: true }
  },
  { tableName: "ArchivoColeccion", timestamps: false }
);
