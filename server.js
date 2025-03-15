import express from 'express';
import connectMongoDB from './config/db.js';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js"
import swaggerDocs from './middleware/swagger.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectMongoDB();

app.use(express.json());
app.use("/api", userRoutes);
swaggerDocs(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})