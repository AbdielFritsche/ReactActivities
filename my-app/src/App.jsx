import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Button from './Components/Button';
import List from './Components/List';
import Add from './Components/Add';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import CredentialsSignInPage from './Components/Login';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "item1", price: 1 },
    { id: 2, name: "item2", price: 2 },
    { id: 3, name: "item3", price: 3 }
  ]);

  let [count,setCount] = useState(0);
  const sum = () => {
    setCount(count+1);
  };
  const resta = () => {
    setCount(count-1);
  };

  const nombre = "Hugo Reyes";
  const elemento = <h1>Hello, {nombre}</h1>;

  const add = (item) => {
    item.id = items.length + 1
    setItems([...items, item]);
  };

  const del = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Header/>
          <Routes>
            <Route path="/add" element={<Add add={add}/>}/>
            <Route path="/items" element={<List items={items} ondelete={del}/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
      {/*
          <h1>{count}</h1>
          
          <Button name={"Suma"} click={sum}/>
          <Button name={"Resta"} click={resta}/>
          <Button name={"Mensaje"} click={() => alert("hola")}/>
          
          <Add add={add}/>
          
          <List items={items} ondelete={del}/>*/}
      
      
    </div>
  );
}

export default App;
