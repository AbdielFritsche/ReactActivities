import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Button from './Components/Button';
import List from './Components/List';
import Add from './Components/Add';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import Login from './Components/Login';
import Home from './Components/Home';
import Logout from './Components/Logout';
import Register from './Components/Register';

function App() {
  console.log("App component is running");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("Autenticación ha cambiado, estado actual:", isAuthenticated);
    if (isAuthenticated) {
      getItems();
    }
  }, [isAuthenticated]);
  

  const getItems = async () => {
    try {
      const result = await fetch("https://backenddeployreactactivities-production.up.railway.app/items_mongo/", { 
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          } 
        }
      );
      const data = await result.json();      
      setItems(data);
    } catch (error) {
      console.error("Error al obtener items:", error);
    }
  };
  


  let [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  const add = async (item) => {
    console.log(token)
    const result = await fetch("https://backenddeployreactactivities-production.up.railway.app/items_mongo/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(item)
    });
    const newItem = await result.json();
    if (result.ok) {
      if (Array.isArray(items)) {
        setItems((prev) => Array.isArray(prev) ? [...prev, newItem] : [newItem]);
      } else {
        setItems([newItem]); // Reinicia como nuevo array
      }
    }
  };
  
  

  const del = async (id) => {
    if (!id) {
      return;
    }
  
    try {
      const response = await fetch(`https://backenddeployreactactivities-production.up.railway.app/items_mongo/${id}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      );
      if (response.ok) {
        setItems(items.filter((item) => item._id !== id)); 
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const login = async (user) => {
    const result = await fetch("https://backenddeployreactactivities-production.up.railway.app/mongo/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    const data = await result.json();

    setToken(data.token);
    setIsAuthenticated(data.isLogin);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const register = async (user) => {
    const result = await fetch("https://backenddeployreactactivities-production.up.railway.app/mongo/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    
    });
    const data = await result.json();
  
    if (data.success) {
      alert("Registro exitoso, ahora puedes iniciar sesión.");
    } else {
      alert("Error en el registro: " + data.message);
    }
  };

  return (
    <div>
      <BrowserRouter>
      <ResponsiveAppBar isAuthenticated={isAuthenticated} logout={logout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />      
            <Route path="/agregar-item" element={<Add add={add}/>}/>
            <Route path="/lista-items" element={<List items={items} ondelete={del}/>}/>
            <Route path="/login" element={!isAuthenticated ? <Login login={login} /> : <Home />} />
            <Route path="/register" element={<Register register={register}/>}></Route>
          </Routes>
        <Footer/>
      </BrowserRouter>
    
      
      
    </div>
  );
}

export default App;
