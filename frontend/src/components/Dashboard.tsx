import { useState, useEffect } from 'react';
import { Button, Typography, Grid } from "@mui/material";
import { useRecoilValue } from 'recoil';
import { userName } from "../store/userName";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
import { authState } from '../store/authState';
import { AddTodoModal } from './AddTodoModal';
import { TodoCard } from './TodoCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Todo {
    _id: string;
    title: string;
    description: string;
}

function Dashboard() {
    const username = useRecoilValue(userName);
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const getTodos = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data: Todo[] = await response.json();
        setTodos(data);
    };
    useEffect(() => {
        getTodos();
    }, [authStateValue.token]); //initial load

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setTitle('');
        setDescription('');
        setOpenModal(false);
    };

    const handleAddTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        if(response.ok){
            const todoExists = todos.some((todo) => todo._id === data._id);
            if (!todoExists) {
                setTodos([...todos, data]);
            }
            handleCloseModal();
        }else{
            toast.error(data.message, { position: "top-right" });
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate('/');
    };
    const handleDeleteTodo = async (todoId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/todo/todos/${todoId}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.ok) {
                getTodos();
            } else {
                console.error(`Failed to delete todo with ID ${todoId}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error(`An error occurred while deleting todo with ID ${todoId}`);
        }
    };


    const handleUpdateTodo = async (todoId: string, updatedTodo: { title: string, description: string }) => {
        try {
            const response = await fetch(`http://localhost:3000/todo/todos/${todoId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(updatedTodo)
            });

            if (response.ok) {
                getTodos()

                console.log("Todo updated successfully.");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message, { position: "top-right" });
            }
        } catch (error) {

            console.error("An error occurred while updating the todo:", error);
        }
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
            <Grid container spacing={2}>
                {todos.map((todo) => (
                    <TodoCard
                        key={todo._id}  // Ensure that each TodoCard has a unique key
                        todo={todo}
                        onDelete={handleDeleteTodo}
                        onUpdate={handleUpdateTodo}
                    />
                ))}
            </Grid>
            <ToastContainer />
        </>
    );
}

export default Dashboard;
