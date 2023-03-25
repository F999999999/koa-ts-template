import http from "http";
import debugMobile from "debug";
import { app } from "./app";

// 设置服务端口
const port = normalizePort(process.env.PORT) || 3000;
// 端口处理
function normalizePort(val: string) {
  const port = parseInt(val, 10);
  return Number.isNaN(port) || port > 0 ? port : false;
}

// 创建 HTTP 服务
const server = http.createServer(app.callback());
// 在所有网络接口上监听服务端口
server.listen(port);
// HTTP服务“错误”事件的事件监听器
server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
// HTTP服务“监听”事件的事件监听器
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debugMobile("demo:server")("Listening on " + bind);
});
