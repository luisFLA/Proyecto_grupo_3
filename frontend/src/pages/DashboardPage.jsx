import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArchivos, crearArchivo } from "../api/archivos";

export default function DashboardPage() {
  const [archivos, setArchivos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [ruta, setRuta] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cargarArchivos = async () => {
    try {
      setError("");
      const res = await getArchivos();
      console.log("Archivos:", res.data);
      setArchivos(res.data);
    } catch (err) {
      console.log("Error al obtener archivos:", err.response?.data || err);

      // si es 401, sí sacamos al login
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError("No se pudieron cargar los archivos.");
      }
    }
  };

  useEffect(() => {
    cargarArchivos();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nombre || !ruta) return;

    try {
      await crearArchivo({ nombre, tipo: "genérico", tamano: 0, ruta });
      setNombre("");
      setRuta("");
      cargarArchivos();
    } catch (err) {
      console.log("Error al crear archivo:", err.response?.data || err);
      setError("No se pudo crear el archivo.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📁 Mis archivos</h2>
        <button className="btn btn-danger" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-3 mb-4 shadow-sm">
        <h5>Agregar archivo (solo metadatos)</h5>
        <form className="row g-3" onSubmit={handleCrear}>
          <div className="col-md-5">
            <input
              placeholder="Nombre"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <input
              placeholder="Ruta (ej: /uploads/archivo.pdf)"
              className="form-control"
              value={ruta}
              onChange={(e) => setRuta(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">Guardar</button>
          </div>
        </form>
      </div>

      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Lista de archivos</h5>

        {archivos.length === 0 ? (
          <p className="text-muted">No hay archivos aún.</p>
        ) : (
          <ul className="list-group">
            {archivos.map((a) => (
              <li
                key={a.IdArchivo}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  <strong>{a.Nombre}</strong> — {a.Ruta}
                </span>
                <span className="badge bg-secondary">{a.Estado}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
