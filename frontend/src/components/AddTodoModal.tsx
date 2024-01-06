// AddTodoModal.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
  onAddTodo: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({ open, onClose, onAddTodo, title, setTitle, description, setDescription }) => {
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
        <Button onClick={onAddTodo} color="success">Add</Button>
      </DialogActions>
    </Dialog>
  );
};
