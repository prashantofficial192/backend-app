import express from 'express';
import cors from 'cors';
import connectMongoDB from './config/db.js';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js"
import experienceRoutes from "./routes/Experience/experienceRoutes.js"
import swaggerDocs from './middleware/swagger.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*", // Allow all origins (Use a specific domain in production)
        methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
        allowedHeaders: "Content-Type,Authorization", // Allowed headers
    })
);

connectMongoDB();

app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", experienceRoutes);
swaggerDocs(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})