// src/components/KanbanColumn.tsx
import React from 'react';
import styled from 'styled-components';
import { Task } from '../types';

interface KanbanColumnProps {
    title: string;
    tasks: Task[];
    onUpdateTask: (task: Task) => void;
}

const Column = styled.div`
  width: 30%;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const ColumnTitle = styled.h3`
  text-align: center;
  color: #333;
`;

const TaskItem = styled.div`
  background-color: white;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, onUpdateTask }) => {
    return (
        <Column>
            <ColumnTitle>{title}</ColumnTitle>
            {tasks.map((task) => (
                <TaskItem key={task._id}>
                    <div>{task.description}</div>
                    <div>{task.deadline}</div>
                    <div>{task.priority}</div>
                    {task.status === 'to-do' && <TaskButton onClick={() => onUpdateTask({ ...task, status: 'in-progress' })}>Start</TaskButton>}
                    {task.status === 'in-progress' && <TaskButton onClick={() => onUpdateTask({ ...task, status: 'completed' })}>Complete</TaskButton>}
                </TaskItem>
            ))}
        </Column>
    );
};

export default KanbanColumn;
