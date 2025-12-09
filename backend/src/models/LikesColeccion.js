import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const LikesColeccion = sequelize.define(
  "LikesColeccion",
  {
    IdUsuario: { type: DataTypes.INTEGER, primaryKey: true },
    IdColeccion: { type: DataTypes.INTEGER, primaryKey: true },
    Fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  { tableName: "LikesColeccion", timestamps: false }
);
