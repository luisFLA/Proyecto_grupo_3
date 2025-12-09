import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArchivos, crearArchivo } from "../api/archivos";

export default function DashboardPage() {
  const [archivos, setArchivos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [ruta, setRuta] = useState("");
  const navigate = useNavigate();

  const cargarArchivos = async () => {
    try {
      const res = await getArchivos();
      setArchivos(res.data);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    cargarArchivos();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!nombre || !ruta) return;
    await crearArchivo({ nombre, tipo: "genérico", tamano: 0, ruta });
    setNombre("");
    setRuta("");
    cargarArchivos();
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📁 Mis archivos</h2>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Cerrar sesión
        </button>
      </div>

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
              <li key={a.IdArchivo} className="list-group-item d-flex justify-content-between">
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
