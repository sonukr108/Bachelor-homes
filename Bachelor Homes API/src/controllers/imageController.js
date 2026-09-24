import path from "path";
import supabase from "../config/supabase.js";


// ==========================================
// UPLOAD IMAGE
// ==========================================
export const uploadImage = async (req, res) => {
    try {
        const userId = req.user.id;

        // Check image
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const extension = path.extname(req.file.originalname);

        const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 10)}${extension}`;

        // User-specific folder
        const filePath = `${userId}/${fileName}`;

        // Upload image
        const { error: uploadError } = await supabase.storage
            .from("property-images")
            .upload(filePath, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false,
            });

        if (uploadError) {
            console.error("Image upload error:", uploadError);

            return res.status(500).json({
                success: false,
                message: uploadError.message,
            });
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
            .from("property-images")
            .getPublicUrl(filePath);

        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully",

            image: {
                url: publicUrlData.publicUrl,
                path: filePath,
                fileName,
            },
        });

    } catch (error) {
        console.error("Upload image error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// ==========================================
// DELETE IMAGE
// ==========================================
export const deleteImage = async (req, res) => {
    try {
        const userId = req.user.id;

        const { fileName } = req.body;

        // Check filename
        if (!fileName || typeof fileName !== "string") {
            return res.status(400).json({
                success: false,
                message: "fileName is required",
            });
        }

        const filePath = `${userId}/${fileName}`;

        // Delete image
        const { data, error } = await supabase.storage
            .from("property-images")
            .remove([filePath]);

        if (error) {
            console.error("Image delete error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully",

            deleted: {
                fileName,
                path: filePath,
            },

            data,
        });

    } catch (error) {
        console.error("Delete image error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};