import api from "../../lib/api";
import { List } from "./list.entity";

export const listRepository = {
  async find(): Promise<List[]> {
    const result = await api.get("/todo");
    return result.data.map((list: List) => new List(list));
  },
  async create(title: string, description: string): Promise<List> {
    const result = await api.post("/todo", { title, description });
    return new List(result.data);
  },
  async show(id: number): Promise<List> {
    const result = await api.get(`/todo/${id}`);
    return new List(result.data);
  },
  async update(
    id: number,
    payload: { title?: string; description?: string }
  ): Promise<List> {
    const result = await api.put(`/todo/${id}`, payload);
    return new List(result.data);
  },
};
