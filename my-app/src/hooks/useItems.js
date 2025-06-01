import { useEffect, useState } from 'react';

export const useItems = (token, isAuthenticated) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const res = await fetch("https://backenddeployreactactivities-production.up.railway.app/items_mongo/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error al obtener items:", error);
    }
  };

  const getItem = async (id) => {
    try {
      const res = await fetch(`https://backenddeployreactactivities-production.up.railway.app/items_mongo/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      if (!res.ok) {
      console.error(`Error: status ${res.status}`);
      return null;
    }

      const data = await res.json();
      return data;
      
    } catch (error) {
      console.error("Error al obtener el item:", error);
      return null;
    }
  };

  const addItem = async (item) => {
    const res = await fetch("https://backenddeployreactactivities-production.up.railway.app/items_mongo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(item)
    });
    const newItem = await res.json();
    if (res.ok) setItems((prev) => [...prev, newItem]);
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`https://backenddeployreactactivities-production.up.railway.app/items_mongo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getItems();
  }, [isAuthenticated]);

  return { items, addItem, deleteItem, getItem };
};
