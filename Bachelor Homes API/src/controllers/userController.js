import supabase from "../config/supabase.js";
import bcrypt from "bcrypt";

// Get all users
const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Users")
            .select("*");

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(200).json({
            success: true,
            count: data.length,
            users: data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Create user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from("Users")
            .insert([
                {
                    name,
                    email,
                    password: hashedPassword
                }
            ])
            .select();

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: data[0]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const { data, error } = await supabase
            .from("Users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !data) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, data.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Remove password from response
        const { password: _, ...user } = data;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export { getUsers, createUser, loginUser };