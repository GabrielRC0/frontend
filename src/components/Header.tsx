import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  & > a {
    color: white;
    margin: 0 10px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <h1>Kanban Board</h1>
      <NavLinks>
        {user && <Link to="/">Home</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
