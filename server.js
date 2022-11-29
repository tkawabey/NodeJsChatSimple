// expressモジュールを使用する宣言を行います
const express = require("express");
// expressのインスタンスを作成
const app = express();
// httpのインスタンスを作成
const http = require("http");
// HTTPサーバーの作成
const server = http.createServer(app);
 
// WebSocket技術によるデータの双方向通信のインスタンスを作成します。
// serverのインスタンスを引数に渡します。
const { Server } = require("socket.io");
// WebSocketのインスタンスを作成。
const io = new Server(server);
// ポート番号
const PORT = 8090;
 
// クライアントからルートにアクセスがあった場合の処理を記述します。
app.get("/", (req,res) => {
    // index.htmlファイルをクライアントに送信
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");
    socket.on("chat message", (msg) => {
      // console.log("massage:" + msg);
      io.emit("chat message", msg);
    });
  });
 
// サーバーを指定したポートでリッスン開始します。
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
} );
