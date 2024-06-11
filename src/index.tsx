// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setAuthToken } from './services/api';

const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
