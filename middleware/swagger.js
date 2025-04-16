import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerAuth from "./swaggerAuth.js";

// Set the SERVER_URL based on the environment
let SERVER_URL;

if (process.env.NODE_ENV === "production") {
    SERVER_URL = "https://api.prashantcodes.dev"; // Production URL
} else {
    SERVER_URL = `http://localhost:${process.env.PORT || 3000}`; // Localhost URL for development
}

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
                description: process.env.NODE_ENV === "production" ? "Production server" : "Local development server",
            },
        ],
    },
    apis: ["./routes/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs",
        swaggerAuth,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );
    console.log(`Swagger docs available at ${SERVER_URL}/api-docs`);
};

export default swaggerDocs;