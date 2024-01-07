// AddTodoModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
  onAddTodo: (title: string, description: string) => void; // Updated prop type
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({ open, onClose, onAddTodo, title, setTitle, description, setDescription }) => {
  const handleAddTodo = () => {
    if (title.trim() !== '' && description.trim() !== ''){
      onAddTodo(title, description);
      setTitle('');
      setDescription('');
      onClose();
    } else{
      alert("todo fields cannot be empty!")
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          multiline
          rows={4}
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddTodo} color="success">Add</Button>
      </DialogActions>
    </Dialog>
  );
};
