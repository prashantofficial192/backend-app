import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Portfolio API Docs",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: "Local server",
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to API routes
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger docs available at http://localhost:${process.env.PORT || 3000}/api-docs`);
};

export default swaggerDocs;
