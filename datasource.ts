import { DataSource } from "typeorm";
import { Todo } from "./todo.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Todo],
});
