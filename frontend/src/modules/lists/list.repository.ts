import api from "../../lib/api";
import { List } from "./list.entity";

export const listRepository = {
  async find(): Promise<List[]> {
    const result = await api.get("/todo");
    return result.data.map((list: List) => new List(list));
  },
};
