// server.ts
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Mock database for demonstration purposes
let todos: Todo[] = [
  { id: 1, text: "Learn React Nativeee", completed: false },
  { id: 2, text: "Write Node.js server", completed: false },
];

app.use(cors());
app.use(bodyParser.json());

// Get all todos
app.get("/todos", (req: Request, res: Response) => {
  res.json(todos);
});

// Update a todo
app.patch("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const updatedId = parseInt(id, 10);
  todos = todos.map((todo) =>
    todo.id === updatedId
      ? { ...todo, ...(text && { text }), ...(completed !== undefined && { completed }) }
      : todo
  );

  const updatedTodo = todos.find((todo) => todo.id === updatedId);
  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res.status(404).send("Todo not found");
  }
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome to the Todo API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
