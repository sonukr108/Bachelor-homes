import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "https://bachelor-homes-admin.vercel.app",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests without Origin
            // (Postman, server-to-server requests, etc.)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);
app.use(express.json());


app.get("/", (req, res) => {
    res.send("API is running");
});
app.get("/hello", (req, res) => {
    res.json({ "message": "Hello, World!" });
})

app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/image", imageRoutes);
export default app;