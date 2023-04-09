const express = require('express');

// サーバー用のインスタンスを作成
const app = express();

// GET / アクセス時の処理
app.get('/', (req, res) => {
  res.status(200).send('ホゲホゲ!!!');
});

// サーバーを起動
app.listen(8000, () => {
  // サーバー起動後に呼び出されるcallback
  console.log('サーバー起動');
})