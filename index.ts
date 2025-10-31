import express from "express";
import cors from "cors";
import { AppDataSource } from "./datasource";
import { Todo } from "./todo.entity";

const app = express();
const PORT = 8888;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello WEB");
});

app.post("/todo", async (req, res) => {
  const { title, description } = req.body;
  const todo = new Todo();
  todo.title = title;
  todo.description = description;
  const todoRepository = AppDataSource.getRepository(Todo);
  const newTodo = await todoRepository.save(todo);
  res.json(newTodo);
});

app.get("/todo", async (req, res) => {
  const todoRepository = AppDataSource.getRepository(Todo);
  const todos = await todoRepository.find();
  res.json(todos);
});

app.get("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOneBy({ id: parseInt(id) });
  res.json(todo);
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todoRepository = AppDataSource.getRepository(Todo);
  const existingTodo = await todoRepository.findOneBy({ id: parseInt(id) });
  existingTodo!.title = title;
  const updatedTodo = await todoRepository.save(existingTodo!);
  res.json(updatedTodo);
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const todoRepository = AppDataSource.getRepository(Todo);
  await todoRepository.delete(id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("サーバーが起動しました");
});

AppDataSource.initialize()
  .then(() => {
    console.log("データベースに接続しました");
  })
  .catch((error) => console.log(error));
