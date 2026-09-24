import express from 'express';

import userRoutes from './routes/userRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/users', userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/image", imageRoutes);

export default app;