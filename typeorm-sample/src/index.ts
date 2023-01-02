import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";
import { Book } from "./entity/Book";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // listen で express server が起動する
    // start express server
    app.listen(3000);

    // User テストデータを生成
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27,
      })
    );
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24,
      })
    );

    // Book テストデータを生成
    await AppDataSource.manager.save(
      AppDataSource.manager.create(Book, {
        title: "最強のモーニングメソッド",
        description: "やる気と未来への希望が湧いてくる本です！",
      })
    );
    await AppDataSource.manager.save(
      AppDataSource.manager.create(Book, {
        title: "嫌われる勇気",
        description: "最強の自己啓発本の決定版！",
      })
    );

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
