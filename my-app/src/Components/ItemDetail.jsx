import { useEffect, useState } from "react";
import { useItems } from "../hooks/useItems";
import { useSearchParams } from "react-router-dom";

const ItemDetail = ({ token, isAuthenticated }) => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  const [item, setItem] = useState(null);
  const { getItem } = useItems(token, isAuthenticated);

  useEffect(() => {
    const fetchItem = async () => {
      const data = await getItem(id);
      setItem(data);
    };
    fetchItem();
  }, [id]);

  if (!item) return <p>Cargando item...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Detalle del Item</h2>
      <p><strong>ID:</strong> {item._id}</p>
      <p><strong>Nombre:</strong> {item.name}</p>
      <p><strong>Valor:</strong> {item.value}</p>
    </div>
  );
};

export default ItemDetail;