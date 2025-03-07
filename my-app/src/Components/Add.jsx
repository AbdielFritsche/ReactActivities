import React, { useState } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom';

const Add = ({ add }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [value, setValue] = useState(""); 

  const onsubmit = (e) => {
    e.preventDefault();
    if (!name || value === "") { 
      alert("Ingresa todos los datos necesarios");
      return;
    }
    add({ name, value: parseInt(value) }); 
    setName("");
    setValue("");
    navigate("/lista-items");
  };

  return (
    <form onSubmit={onsubmit}>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Item Name"
      />
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type="text"
        placeholder="Value"
      />
      <input type="submit" value="Agregar"/>
    </form>
  );
};


export default Add
