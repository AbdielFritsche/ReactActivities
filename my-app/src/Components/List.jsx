import React from 'react'
import Item from './Item'


const List = ({ items, ondelete }) => {
  if (!Array.isArray(items)) {
    return <p>No tienes acceso a la lista de ítems</p>;
  }

  if (items.length === 0) {
    return <p>No hay ítems para mostrar</p>;
  }

  return (
    <>
      {items.map((item) => (
        <Item key={item._id} item={item} ondelete={ondelete} />
      ))}
    </>
  );
};

export default List;