import './App.css';

import {useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import { useAuth } from './hooks/useAuth';
import { useItems } from './hooks/useItems';

import Footer from './Components/Footer';
import List from './Components/List';
import Add from './Components/Add';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import LifeCycle from './Components/LifeCycle';
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import ItemDetail from './Components/ItemDetail';

function App() {
  const { isAuthenticated, token, login, logout, register } = useAuth();
  const { items, addItem, deleteItem } = useItems(token, isAuthenticated);

  const [show, setShow] = useState(true);

  return (
    <div>
      <BrowserRouter>
      <ResponsiveAppBar isAuthenticated={isAuthenticated} logout={logout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />      
            <Route path="/agregar-item" element={<Add add={addItem}/>}/>
            <Route path="/lista-items" element={<List items={items} ondelete={deleteItem}/>}/>
            <Route path="/login" element={!isAuthenticated ? <Login login={login} /> : <Home />} />
            <Route path="/register" element={<Register register={register}/>}></Route>
            <Route path="/items" element={<ItemDetail token={token} isAuthenticated={isAuthenticated} />} />
          </Routes>
        <Footer/>
      </BrowserRouter>
    
      <button 
        onClick={() => setShow(!show)}
      >
        {show ? "Ocultar Componente" : "Mostrar Componente"}
      </button>
      {show && <LifeCycle/>}

    </div>
  );
}

export default App;
