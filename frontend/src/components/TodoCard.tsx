// TodoCard.tsx
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';

interface TodoCardProps {
  todo: {
    _id: string;
    title: string;
    description: string;
    done: boolean;
  };
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <Grid item key={todo._id} xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {todo.title}
          </Typography>
          <Typography color="textSecondary">
            {todo.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            {todo.done ? 'Completed' : 'Mark as Done'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
