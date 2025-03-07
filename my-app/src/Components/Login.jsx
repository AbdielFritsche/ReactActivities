import { TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  

const Login = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  

  const onsubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Los campos no deben estar vacíos");
      return;
    }

    const isLoginSuccess = login({ username, password });

    if (isLoginSuccess) {
      setUsername("");
      setPassword("");
      navigate("/");  
    } else {
      alert("Algo salió mal, por favor intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={onsubmit}>
      <Box
        margin="auto"
        flexDirection="column"
        display="flex"
        width={400}
        marginTop="10px"
      >
        <TextField 
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField 
          label="Password"
          type="password"  
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <button type="submit">Login</button> 
      </Box>
    </form>
  );
};

export default Login;
