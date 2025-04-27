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
import healthRoutes from "./routes/Health/healthRoutes.js"
import swaggerDocs from './middleware/swagger.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Support ES module __dirname behavior
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
    "https://prashantcodes.dev",
    "http://localhost:3000",
    "http://localhost:5173"
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin); // allow this origin
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
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
app.use("/api", healthRoutes);
swaggerDocs(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})