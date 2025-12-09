import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Usuario } from "../models/index.js";

dotenv.config();
const router = Router();

/**
 * POST /api/auth/register
 * Crea un nuevo usuario
 */
router.post("/register", async (req, res) => {
  try {
    let { nombre, correo, contrasenia, descripcion } = req.body;

    // Validaciones básicas
    if (!nombre || !correo || !contrasenia) {
      return res
        .status(400)
        .json({ message: "Nombre, correo y contraseña son obligatorios" });
    }

    // Quitar espacios innecesarios
    nombre = nombre.trim();
    correo = correo.trim();
    contrasenia = contrasenia.trim();

    const existe = await Usuario.findOne({ where: { Correo: correo } });
    if (existe) {
      return res.status(400).json({ message: "Correo ya registrado" });
    }

    // Encriptar contraseña
    const hash = await bcrypt.hash(contrasenia, 10);

    const nuevo = await Usuario.create({
      Nombre: nombre,
      Correo: correo,
      Contrasenia: hash,
      Descripcion: descripcion || null
    });

    return res
      .status(201)
      .json({ message: "Usuario creado", id: nuevo.IdUsuario });
  } catch (err) {
    console.error("Error en registro:", err);
    return res
      .status(500)
      .json({ message: "Error en registro", error: err.message });
  }
});

/**
 * POST /api/auth/login
 * Inicia sesión y devuelve un token
 */
router.post("/login", async (req, res) => {
  try {
    let { correo, contrasenia } = req.body;

    if (!correo || !contrasenia) {
      return res
        .status(400)
        .json({ message: "Correo y contraseña son obligatorios" });
    }

    correo = correo.trim();
    contrasenia = contrasenia.trim();

    const usuario = await Usuario.findOne({ where: { Correo: correo } });

    if (!usuario) {
      // El correo no existe en la BD
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const ok = await bcrypt.compare(contrasenia, usuario.Contrasenia);

    if (!ok) {
      // El correo existe, pero la contraseña no coincide
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      { idUsuario: usuario.IdUsuario, rol: usuario.Rol },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      token,
      usuario: {
        id: usuario.IdUsuario,
        nombre: usuario.Nombre,
        correo: usuario.Correo,
        rol: usuario.Rol
      }
    });
  } catch (err) {
    console.error("Error en login:", err);
    return res
      .status(500)
      .json({ message: "Error en login", error: err.message });
  }
});

export default router;
