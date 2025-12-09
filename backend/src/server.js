import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import archivoRoutes from "./routes/archivoRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/archivos", archivoRoutes);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("BD conectada");

    // Si algún día quieres que Sequelize cree tablas automáticamente:
    // await sequelize.sync({ alter: false });

    app.listen(PORT, () => {
      console.log(`Backend escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error al conectar BD", err);
  }
};

start();
