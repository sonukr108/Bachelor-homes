import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running");
});
app.get("/hello",(req,res)=>{
    res.json({"message":"Hello, World!"});
})

app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/image", imageRoutes);
export default app;