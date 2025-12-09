import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authRequired = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token requerido" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { idUsuario, rol }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
