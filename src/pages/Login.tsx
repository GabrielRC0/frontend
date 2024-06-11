// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { setAuthToken } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import * as jwt from 'jwt-decode';
import { User } from '../types';

const Form = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Login: React.FC = () => {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = await login(username, password);
        setAuthToken(token);
        const decodedUser = jwt.jwtDecode<User>(token);
        setUser(decodedUser);
        navigate('/dashboard');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Username</Label>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormGroup>
            <Button type="submit">Login</Button>
        </Form>
    );
};

export default Login;
