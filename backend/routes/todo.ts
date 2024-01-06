import { Todo } from "../db";
import express from "express";
const router = express.Router();
import { authenticateJwt } from "../middleware";
import { object, string } from "zod";

const todoSchema = object({
  title: string(),
  description: string(),
});

router.post("/todos", authenticateJwt, async (req, res) => {
  try {
    console.log("control reaches here")
    const { title, description } = todoSchema.parse(req.body);
    const done = false;
    const userId = req.headers["userId"];

    const todoExists = await Todo.findOne({ title, description });
    if (todoExists) res.status(403).json({ message: "Todo already exists" });
    else {
      const newTodo = new Todo({ title, description, done, userId });

      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to create a new todo" });
  }
});

router.get("/todos", authenticateJwt, async (req, res) => {
  try {
    const userId = req.headers["userId"];
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

router.delete("/todos/:todoId", authenticateJwt, async (req, res) => {
  try {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    await Todo.findByIdAndDelete({ _id: todoId, userId });
    res.json("Todo Deleted!");
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

router.patch("/todos/:todoId/update", authenticateJwt, async (req, res) => {
  try {
    const { todoId } = req.params;
    const userId = req.headers["userId"];
    const todo= req.body

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      {todo},
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

export default router;