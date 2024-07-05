const swaggerJSDoc = require("swagger-jsdoc");

module.exports = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo tasks API",
      version: "1.0.0",
      description: "A simple Express Library API",
      contact: {
        name: "Daniel",
        email: "jinyuanzhang1992@hotmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000", // 你的服务器地址
      },
    ],
  },
  apis: ["./src/controllers/*.js"],
});

//yaml 格式
