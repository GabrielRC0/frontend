// src/components/KanbanBoard.tsx
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { Task } from '../types';
import KanbanColumn from './KanbanColumn';
import { AuthContext } from '../contexts/AuthContext';

const Board = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const KanbanBoard: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const response = await api.get('/tasks');
        setTasks(response.data.filter((task: Task) => task.user === user?.adminUuid));
    };

    const updateTask = async (updatedTask: Task) => {
        await api.put(`/tasks/${updatedTask._id}`, updatedTask);
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Board>
            <KanbanColumn
                title="To Do"
                tasks={tasks.filter((task) => task.status === 'to-do')}
                onUpdateTask={updateTask}
            />
            <KanbanColumn
                title="In Progress"
                tasks={tasks.filter((task) => task.status === 'in-progress')}
                onUpdateTask={updateTask}
            />
            <KanbanColumn
                title="Completed"
                tasks={tasks.filter((task) => task.status === 'completed')}
                onUpdateTask={updateTask}
            />
        </Board>
    );
};

export default KanbanBoard;
