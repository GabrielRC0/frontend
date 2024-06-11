// src/pages/Register.tsx
import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminUuid, setAdminUuid] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(username, email, password, adminUuid);
        navigate('/login');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>Username</Label>
                <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </FormGroup>
            <FormGroup>
                <Label>Admin UUID (Optional)</Label>
                <Input type="text" value={adminUuid} onChange={(e) => setAdminUuid(e.target.value)} />
            </FormGroup>
            <Button type="submit">Register</Button>
        </Form>
    );
};

export default Register;
