import "reflect-metadata";
import { DataSource } from "typeorm";

let path = "src";
let extension = "ts";
if (process.env.NODE_ENV == "production") {
  path = "dist";
  extension = "js";
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "test",
  password: "",
  database: "test",
  synchronize: false,
  logging: true,
  entities: [`${path}/entity/*.${extension}`],
  migrations: [`${path}/migration/*.${extension}`],
  subscribers: [],
});
