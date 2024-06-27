// src/components/KanbanColumn.tsx
import Modal from 'react-modal'; // Corrigir o import
import React, { useState } from 'react';
import styled from 'styled-components';
import { Task, User } from '../types';
import { Draggable } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  users: User[];
  innerRef: (element: HTMLElement | null) => void;
  droppableProps: any;
  placeholder: React.ReactNode;
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

const DeleteButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  tasks,
  onUpdateTask,
  onDeleteTask,
  users,
  innerRef,
  droppableProps,
  placeholder
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <Column ref={innerRef} {...droppableProps}>
      <ColumnTitle>{title.charAt(0).toUpperCase() + title.slice(1)}</ColumnTitle>
      {tasks.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <TaskItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <div><strong>Description:</strong> {task.description}</div>
              <div><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</div>
              <div><strong>Priority:</strong> {task.priority}</div>
              <div><strong>Assignee:</strong> {task.assignee}</div>
              {task.status === 'to-do' && <TaskButton onClick={() => onUpdateTask({ ...task, status: 'in-progress' })}>Start</TaskButton>}
              {task.status === 'in-progress' && <TaskButton onClick={() => onUpdateTask({ ...task, status: 'completed' })}>Complete</TaskButton>}
              <TaskButton onClick={() => openEditModal(task)}>Edit</TaskButton>
              <DeleteButton onClick={() => onDeleteTask(task._id)}>Delete</DeleteButton>
            </TaskItem>
          )}
        </Draggable>
      ))}
      {placeholder}
      {taskToEdit && (
        <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal} contentLabel="Edit Task">
          <h2>Edit Task</h2>
          <TaskForm
            task={taskToEdit}
            onTaskCreated={() => {
              onUpdateTask(taskToEdit);
              closeEditModal();
            }}
          />
          <button onClick={closeEditModal}>Close</button>
        </Modal>
      )}
    </Column>
  );
};

export default KanbanColumn;
