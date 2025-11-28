const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notes API",
      version: "1.0.0",
      description: "API documentation for User & Notes with Auth & RBAC",
    },
    servers: [{ url: "http://localhost:3000/api/v1" }],
  },

  apis: ["./routers/*.js"],   
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
