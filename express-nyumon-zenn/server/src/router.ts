import { Router } from "express";
import { DbAccessor } from "src/dbAccessor";

const dbAccessor = new DbAccessor();

export const createRouter = () => {
  const router = Router();

  // Read: '/helloWorld' の処理を設定？
  router.get("/", async (req, res) => {
    try {
      const resBody = await dbAccessor.get();
      res.status(200).send({ message: "get success", resBody });
    } catch (e) {
      console.error(e);
      res.status(400).send({ message: "get failed" });
    }
  });

  // Create
  router.put("/", async (req, res) => {
    try {
      if (!req.body.title) {
        res.status(400).send({ message: "title required" });
      }
      await dbAccessor.create(req.body.title);
      res.status(200).send({ message: "create success" });
    } catch (e) {
      console.error(e);
      res.status(400).send({ message: "create failed" });
    }
  });

  // Update
  router.post("/:taskId", async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({ message: "body required" });
      }
      await dbAccessor.update({ uuid: req.params.taskId, ...req.body });
      res.status(200).send({ message: "update success" });
    } catch (e) {
      console.error(e);
      res.status(400).send({ message: "update failed" });
    }
  });

  // Delete
  router.delete("/:taskId", async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({ message: "body required" });
      }
      // req.params.taskId の taskId はpath /:taskId に準じて決まっている
      await dbAccessor.delete({ uuid: req.params.taskId });
      res.status(200).send({ message: "delete success" });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "delete failed" });
    }
  });

  // ルーターを返す
  return router;
};
