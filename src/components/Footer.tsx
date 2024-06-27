// src/components/Footer.tsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <p>&copy; 2024 Kanban Board. All rights reserved.</p>
        </FooterContainer>
    );
};

export default Footer;