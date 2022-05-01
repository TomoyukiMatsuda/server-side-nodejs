import { Router } from "express";

export const createRouter = () => {
  const router = Router();

  // GET: '/helloWorld' の処理を設定？
  router.get("/helloWorld", (req, res) => {
    res.status(200).send({ message: "ハロハロ、ワールド!!" });
  });

  // ルーターを返す
  return router;
};
