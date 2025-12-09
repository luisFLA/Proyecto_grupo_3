import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    IdUsuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Nombre: { type: DataTypes.STRING(75), allowNull: false },
    Correo: { type: DataTypes.STRING(95), allowNull: false, unique: true },
    Contrasenia: { type: DataTypes.STRING(75), allowNull: false },
    Descripcion: DataTypes.TEXT,
    URLFotoPerfil: DataTypes.STRING(155),
    Rol: {
      type: DataTypes.ENUM("Admin", "Usuario"),
      defaultValue: "Usuario"
    },
    Estado: {
      type: DataTypes.ENUM("Activo", "Bloqueado"),
      defaultValue: "Activo"
    }
  },
  { tableName: "Usuario", timestamps: false }
);
