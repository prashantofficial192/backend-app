import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// const SERVER_URL = process.env.NODE_ENV === "production"
//     ? "https://backend-m0sz.onrender.com"
//     : `http://localhost:${process.env.PORT || 3000}`;

const SERVER_URL = `http://localhost:${process.env.PORT || 3000}`;

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
                url: SERVER_URL,
                description: process.env.NODE_ENV === "production" ? "Production server" : "Local server",
            },
        ],
    },
    apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );
    console.log(`Swagger docs available at http://localhost:${process.env.PORT || 3000}/api-docs`);
};

export default swaggerDocs;
