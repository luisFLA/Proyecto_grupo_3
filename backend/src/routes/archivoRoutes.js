import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { Archivo } from "../models/index.js";

const router = Router();

router.get("/", authRequired, async (req, res) => {
  const archivos = await Archivo.findAll({
    where: { IdUsuario: req.user.idUsuario }
  });
  res.json(archivos);
});

router.post("/", authRequired, async (req, res) => {
  try {
    const { nombre, tipo, tamano, ruta } = req.body;
    const nuevo = await Archivo.create({
      IdUsuario: req.user.idUsuario,
      Nombre: nombre,
      Tipo: tipo,
      Tamano: tamano,
      Ruta: ruta
    });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ message: "Error al crear archivo", error: err.message });
  }
});

export default router;
