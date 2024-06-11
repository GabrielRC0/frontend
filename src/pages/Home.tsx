// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  &:hover {
    background-color: #0056b3;
  }
`;

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <Title>Welcome to Kanban Board</Title>
            <ButtonGroup>
                <Button to="/login">Login</Button>
                <Button to="/register">Register</Button>
            </ButtonGroup>
        </HomeContainer>
    );
};

export default Home;
