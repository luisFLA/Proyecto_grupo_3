import { Usuario } from "./Usuario.js";
import { Archivo } from "./Archivo.js";
import { Coleccion } from "./Coleccion.js";
import { ArchivoColeccion } from "./ArchivoColeccion.js";
import { LikesColeccion } from "./LikesColeccion.js";
import { Compartir } from "./Compartir.js";
import { Descargas } from "./Descargas.js";

// Usuario 1 - N Archivo
Usuario.hasMany(Archivo, { foreignKey: "IdUsuario" });
Archivo.belongsTo(Usuario, { foreignKey: "IdUsuario" });

// Usuario 1 - N Coleccion
Usuario.hasMany(Coleccion, { foreignKey: "IdUsuario" });
Coleccion.belongsTo(Usuario, { foreignKey: "IdUsuario" });

// Archivo N - N Coleccion
Archivo.belongsToMany(Coleccion, {
  through: ArchivoColeccion,
  foreignKey: "IdArchivo",
  otherKey: "IdColeccion"
});
Coleccion.belongsToMany(Archivo, {
  through: ArchivoColeccion,
  foreignKey: "IdColeccion",
  otherKey: "IdArchivo"
});

// LikesColeccion
Usuario.belongsToMany(Coleccion, {
  through: LikesColeccion,
  foreignKey: "IdUsuario",
  otherKey: "IdColeccion",
  as: "ColeccionesLikeadas"
});
Coleccion.belongsToMany(Usuario, {
  through: LikesColeccion,
  foreignKey: "IdColeccion",
  otherKey: "IdUsuario",
  as: "UsuariosQueDieronLike"
});

// Descargas
Usuario.hasMany(Descargas, { foreignKey: "IdUsuario" });
Archivo.hasMany(Descargas, { foreignKey: "IdArchivo" });

export {
  Usuario,
  Archivo,
  Coleccion,
  ArchivoColeccion,
  LikesColeccion,
  Compartir,
  Descargas
};
