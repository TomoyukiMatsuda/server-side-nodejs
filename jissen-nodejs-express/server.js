const express = require("express");
const Redis = require("ioredis");

// サーバー用のインスタンスを作成
const app = express();
const redis = new Redis({
  port: 6379,
  host: "localhost",
  password: process.env.REDIS_PASSWORD,
  enableOfflineQueue: false,
});
// Redisに初期データをセットする
const init = async () => {
  await Promise.all([
    redis.set("users:1", JSON.stringify({ id: 1, name: "alpha" })),
    redis.set(
      "users:2",
      JSON.stringify({
        id: 2,
        name: "bravo",
      })
    ),
    redis.set("users:3", JSON.stringify({ id: 3, name: "charlie" })),
    redis.set(
      "users:4",
      JSON.stringify({
        id: 4,
        name: "delta",
      })
    ),
  ]);
};

app.get("/", (req, res) => {
  res.status(200).send("hello world\n");
});
app.get("/user/:id", async (req, res) => {
  try {
    // ユーザーデータをredisから取得して返す
    const key = `users:${req.params.id}`;
    const val = await redis.get(key);
    const user = JSON.parse(val);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("internal error");
  }
});
app.get("/users", async (req, res) => {
  try {
    const stream = redis.scanStream({
      match: "users:*",
      count: 2, // 1回の呼び出しで2つ取り出す
    });
    const users = [];
    for await (const resultKeys of stream) {
      for (const key of resultKeys) {
        const value = await redis.get(key);
        const user = JSON.parse(value);
        users.push(user);
      }
    }
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("internal error");
  }
});

redis.once("ready", async () => {
  await init();

  try {
    // サーバーを起動
    app.listen(8000, () => {
      // サーバー起動後に呼び出されるcallback
      console.log("サーバー起動");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
redis.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
// 包括的エラーハンドリング
app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

// 包括的エラーハンドリングでは非同期のエラーはキャッチできない;
// async関数内のthrowなのでPromise.rejectと等価
app.get("/", async (req, res) => {
  throw new Error("非同期でエラー");
});
// ここではキャッチできない
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
});
