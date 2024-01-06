import { useState, useEffect } from 'react';
import { Button, Typography, Grid } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { userName } from "../store/userName";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import { authState } from '../store/authState';
import { AddTodoModal } from './AddTodoModal';
import { TodoCard } from './TodoCard';

interface Todo {
    _id: string;
    title: string;
    description: string;
    done: boolean;
}

function Dashboard() {
    const username = useRecoilValue(userName);
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data: Todo[] = await response.json();
            setTodos(data);
        };
        getTodos();
    }, [authStateValue.token]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
        handleCloseModal();
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate('/');
    };
    const handleDeleteTodo = async (todoId: string) => {
        // Implement the logic to delete the todo
        // Update the state accordingly
      };

      const handleUpdateTodo = async (todoId: string, updatedTodo: { title: string, description: string }) => {
        // Implement the logic to update the todo
        // Update the state accordingly
      };
      
    return (
        <>
            <div className="header-bar">
                <Typography variant="h5" component="div" className="header-text">
                    {username}'s Toodooz
                </Typography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" color="error" onClick={logoutHandler}>Logout</Button>
                </div>
            </div>
            <div className="add-todo-button">
                <Button variant="contained" color="success" onClick={handleOpenModal}>
                    Add Todo
                </Button>
            </div>

            {/* Customized Material-UI Modal */}
            <AddTodoModal
                open={openModal}
                onClose={handleCloseModal}
                onAddTodo={handleAddTodo}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
            />

            {/* Display Todos using MUI Card */}
            <Grid container spacing={2} >
                {todos.map((todo) => (
                    <TodoCard
                    key={todo._id}
                    todo={todo}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                />
                ))}
            </Grid>
        </>
    );
}

export default Dashboard;
