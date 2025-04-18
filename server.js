import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import connectMongoDB from './config/db.js';
import dotenv from 'dotenv';
import experienceRoutes from "./routes/Experience/experienceRoutes.js"
import educationRoutes from "./routes/Education/educationRoutes.js"
import skillRoutes from "./routes/Skill/skillRoutes.js"
import blogsRoutes from "./routes/Blog/blogRoutes.js"
import projectRoutes from "./routes/Project/projectRoutes.js"
import contactRoutes from "./routes/Contact/contactRoutes.js"
import swaggerDocs from './middleware/swagger.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Support ES module __dirname behavior
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
    cors({
        origin: "*", // Allow all origins (Use a specific domain in production)
        methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
        allowedHeaders: "Content-Type,Authorization", // Allowed headers
    })
);
app.use(express.static(path.join(__dirname, 'public')));

connectMongoDB();

app.use(express.json());
app.use("/api", blogsRoutes);
app.use("/api", experienceRoutes);
app.use("/api", educationRoutes);
app.use("/api", skillRoutes)
app.use("/api", projectRoutes);
app.use("/api", contactRoutes);
swaggerDocs(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})