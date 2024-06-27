// src/pages/Dashboard.tsx
import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import TaskForm from '../components/TaskForm';
import KanbanBoard from '../components/KanbanBoard';
import UserList from '../components/UserList';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
import { User } from '../types';

Modal.setAppElement('#root');

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Dashboard: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [tasksUpdated, setTasksUpdated] = useState(false); // Estado para controlar a atualização das tarefas

    const fetchUsers = async () => {
        const response = await api.get('/users');
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRemoveUser = (userId: string) => {
        setUsers(users.filter(user => user._id !== userId));
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleTaskCreated = () => {
        setTasksUpdated(true);
        closeModal();
    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <DashboardContainer>
            <Button onClick={openModal}>Create Task</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Create Task"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                    },
                }}
            >
                <h2>Create Task</h2>
                <TaskForm onTaskCreated={handleTaskCreated} />
                <button onClick={closeModal}>Close</button>
            </Modal>
            <KanbanBoard tasksUpdated={tasksUpdated} setTasksUpdated={setTasksUpdated} /> {/* Passa o estado de atualização das tarefas */}
        </DashboardContainer>
    );
};

export default Dashboard;
