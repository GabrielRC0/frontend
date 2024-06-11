// src/pages/Dashboard.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import KanbanBoard from '../components/KanbanBoard';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <TaskForm onTaskCreated={() => { }} />
            <KanbanBoard />
        </div>
    );
};

export default Dashboard;
