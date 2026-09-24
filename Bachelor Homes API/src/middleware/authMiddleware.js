import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check Authorization header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token is required",
            });
        }

        // Extract token
        const accessToken = authHeader.split(" ")[1];

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Access token is required",
            });
        }

        // Verify our JWT
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        // Attach authenticated owner to request
        req.user = decoded;

        next();

    } catch (error) {
        console.error("Authentication error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Access token expired",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid access token",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};