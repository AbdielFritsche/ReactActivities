import { TextField, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ register }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      alert('Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const isRegisterSuccess = register({ username, password });

    if (isRegisterSuccess) {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login'); 
    } else {
      alert('Error en el registro, intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
        <TextField 
          label="Confirm Password"
          type="password"  
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Box>
    </form>
  );
};

export default Register;
