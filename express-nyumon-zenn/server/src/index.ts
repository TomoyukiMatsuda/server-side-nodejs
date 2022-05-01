import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.get("/helloWorld", (req, res) => {
  res.status(200).send({ message: "ハロー, ワールド!!" });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
