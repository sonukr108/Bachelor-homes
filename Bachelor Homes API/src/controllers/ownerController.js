import supabase from "../config/supabase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ==========================================
// Generate Access Token
// ==========================================
const generateAccessToken = (owner) => {
    return jwt.sign(
        {
            id: owner.id,
            phone: owner.phone,
            role: "owner",
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );
};


// ==========================================
// Generate Refresh Token
// ==========================================
const generateRefreshToken = (owner) => {
    return jwt.sign(
        {
            id: owner.id,
            role: "owner",
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
};


// ==========================================
// OWNER SIGNUP
// ==========================================
export const ownerSignup = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        // Validation
        if (!name || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, phone and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // Check if phone already exists
        const { data: existingOwner, error: checkError } =
            await supabase
                .from("owners")
                .select("id")
                .eq("phone", phone)
                .maybeSingle();

        if (checkError) {
            console.error("Check owner error:", checkError);

            return res.status(500).json({
                success: false,
                message: "Unable to check owner",
            });
        }

        if (existingOwner) {
            return res.status(409).json({
                success: false,
                message: "Owner with this phone number already exists",
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create owner
        const { data: owner, error: insertError } =
            await supabase
                .from("owners")
                .insert({
                    name,
                    phone,
                    password_hash: passwordHash,
                })
                .select("id, name, phone, is_active, created_at")
                .single();

        if (insertError) {
            console.error("Create owner error:", insertError);

            return res.status(500).json({
                success: false,
                message: insertError.message,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Owner signup successful",
            owner,
        });

    } catch (error) {
        console.error("Owner signup error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// ==========================================
// OWNER SIGNIN
// ==========================================
export const ownerSignin = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Validation
        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone and password are required",
            });
        }

        // Find owner
        const { data: owner, error } =
            await supabase
                .from("owners")
                .select("*")
                .eq("phone", phone)
                .maybeSingle();

        if (error) {
            console.error("Find owner error:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to login",
            });
        }

        if (!owner) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone number or password",
            });
        }

        // Check account status
        if (!owner.is_active) {
            return res.status(403).json({
                success: false,
                message: "Owner account is inactive",
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            owner.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone number or password",
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(owner);

        const refreshToken = generateRefreshToken(owner);

        // Don't send password hash
        const ownerInfo = {
            id: owner.id,
            name: owner.name,
            phone: owner.phone,
            is_active: owner.is_active,
            created_at: owner.created_at,
        };

        return res.status(200).json({
            success: true,
            message: "Owner login successful",

            owner: ownerInfo,

            tokens: {
                accessToken,
                refreshToken,
                expiresIn: 15 * 60,
            },
        });

    } catch (error) {
        console.error("Owner signin error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================
export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required",
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Find owner
        const { data: owner, error } =
            await supabase
                .from("owners")
                .select("id, phone, is_active")
                .eq("id", decoded.id)
                .maybeSingle();

        if (error) {
            console.error("Refresh owner error:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to refresh token",
            });
        }

        if (!owner) {
            return res.status(401).json({
                success: false,
                message: "Owner not found",
            });
        }

        if (!owner.is_active) {
            return res.status(403).json({
                success: false,
                message: "Owner account is inactive",
            });
        }

        // Generate new access token
        const accessToken = generateAccessToken(owner);

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",

            accessToken,

            expiresIn: 15 * 60,
        });

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Refresh token expired. Please login again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        console.error("Refresh token error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};