import { useState, useEffect } from "react";
import Filtro from "../components/header/Filtro";
//import Filtro from "../components/Filtro";

export default function OfertasFiltradas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOfertasPorCategoria = async () => {
      if (!categoriaSeleccionada || !token) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://apiv1.lacuponera.store/api/v1/admin/offers/categories/${categoriaSeleccionada}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Error al obtener ofertas");
        const data = await res.json();
        setOfertas(data.offers);
      } catch (err) {
        console.error(err);
        setOfertas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertasPorCategoria();
  }, [categoriaSeleccionada]);

  return (
    <div className="p-6">
      <Filtro onSelectCategory={setCategoriaSeleccionada} />
      {loading && <p className="mt-4">Cargando ofertas...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {ofertas.map((oferta) => (
          <div key={oferta.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold text-primary">{oferta.title}</h3>
            <p>{oferta.description}</p>
            <p className="text-sm mt-2">
              <strong>Precio: </strong> ${oferta.discountPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
