import { useState, useEffect } from 'react';
import { Button, Typography, Grid, CircularProgress } from "@mui/material";
import { useRecoilState } from 'recoil';
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
    const [authStateValue, setAuthState] = useRecoilState(authState);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    const getTodos = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ID}/todo/todos`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data: Todo[] = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodos();
    }, [authStateValue.token]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setTitle('');
        setDescription('');
        setOpenModal(false);
    };

    const handleAddTodo = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ID} / todo / todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        if (response.ok) {
            const todoExists = todos.some((todo) => todo._id === data._id);
            if (!todoExists) {
                setTodos([...todos, data]);
            }
            handleCloseModal();
        } else {
            toast.error(data.message, { position: "top-right" });
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setAuthState((prevAuthState) => ({ ...prevAuthState, username: null }));
        navigate('/');
    };
    const handleDeleteTodo = async (todoId: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ID} / todo / todos / ${todoId}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.ok) {
                getTodos();
            } else {
                console.error(`Failed to delete todo with ID ${todoId}.Status: ${response.status} `);
            }
        } catch (error) {
            console.error(`An error occurred while deleting todo with ID ${todoId} `);
        }
    };


    const handleUpdateTodo = async (todoId: string, updatedTodo: { title: string, description: string }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_ID} /todo/todos / ${todoId} `, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")} `
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
    }

    return (
        <>
            <div className="header-bar">
                <Typography variant="h5" component="div" className="header-text">
                    {authStateValue.username}'s Toodooz
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

            {loading ? (
                <div className="loading-indicator-container">
                    <CircularProgress />
                </div>
            ) : (
                <>
                    {/* Display Todos using MUI Card */}
                    <Grid container spacing={2}>
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
            )}

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

            <ToastContainer />
        </>
    );
}

export default Dashboard;
