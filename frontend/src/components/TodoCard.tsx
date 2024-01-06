import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
interface TodoCardProps {
    todo: {
        _id: string;
        title: string;
        description: string;
        done: boolean;
    };
    onDelete: (todoId: string) => void;
    onUpdate: (todoId: string, updatedTodo: { title: string, description: string }) => void;
}


export const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete, onUpdate }) => {
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const [updatedDescription, setUpdatedDescription] = useState(todo.description);

    const handleDelete = () => {
        onDelete(todo._id);
    };

    const handleUpdate = () => {
        const updatedTodo = { title: updatedTitle, description: updatedDescription };
        onUpdate(todo._id, updatedTodo);
        setOpenUpdateDialog(false);
    };

    const handleOpenUpdateDialog = () => {
        setUpdatedTitle(todo.title);
        setUpdatedDescription(todo.description);
        setOpenUpdateDialog(true);
    };

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    return (
        <Grid item key={todo._id} xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#1d232c', color: '#d7d9dd' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {todo.title}
                    </Typography>
                    <Typography >
                        {todo.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleOpenUpdateDialog}>
                        Update
                    </Button>
                    <Button size="small" color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                </CardActions>

                {/* Update Todo Dialog */}
                <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog} >
                    <DialogTitle>Update Todo</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            multiline
                            rows={4}
                            fullWidth
                            variant="standard"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
                        <Button onClick={handleUpdate} color='success'>Update</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Grid>
    );
};
