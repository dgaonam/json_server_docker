const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = aplication => {
  aplication.use("/posts", createProxyMiddleware({ target: process.env.REACT_APP_BACKEND, changeOrigin: true }));
  aplication.use("/comments", createProxyMiddleware({ target: process.env.REACT_APP_BACKEND, changeOrigin: true }));
};