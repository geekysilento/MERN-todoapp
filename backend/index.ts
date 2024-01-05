import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/auth';
// import todoRoutes from './routes/todo';
const app = express();
const port = 3000;
const password = 135792468

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
// app.use("/todo", todoRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

mongoose.connect(`mongodb+srv://adityakarna:${password}@cluster0.oqkzqfh.mongodb.net/`)