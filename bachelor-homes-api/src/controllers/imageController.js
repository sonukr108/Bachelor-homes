import path from "path";
import crypto from "crypto";
import supabase from "../config/supabase.js";

// ==========================================
// UPLOAD MULTIPLE IMAGES
// ==========================================
export const uploadImages = async (req, res) => {
    try {
        const userId = req.user.id;

        // Check files
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required",
            });
        }

        // ==========================================
        // GET EXISTING FILES FOR THIS USER
        // ==========================================
        const { data: existingFiles, error: listError } =
            await supabase.storage
                .from("property-images")
                .list(userId);

        if (listError) {
            console.error("List images error:", listError);

            return res.status(500).json({
                success: false,
                message: "Failed to check existing images",
            });
        }

        // ==========================================
        // CREATE HASH FOR EACH FILE
        // ==========================================
        const filesWithHash = req.files.map((file) => {
            const hash = crypto
                .createHash("sha256")
                .update(file.buffer)
                .digest("hex");

            return {
                file,
                hash,
            };
        });

        // ==========================================
        // REMOVE DUPLICATES FROM SAME REQUEST
        // ==========================================
        const uniqueFiles = [];

        const requestHashes = new Set();

        for (const item of filesWithHash) {
            if (!requestHashes.has(item.hash)) {
                requestHashes.add(item.hash);
                uniqueFiles.push(item);
            }
        }

        // ==========================================
        // PROCESS IMAGES
        // ==========================================
        const uploadPromises = uniqueFiles.map(async ({ file, hash }) => {
            // Find existing image by hash
            const existingFile = existingFiles?.find((item) => {
                const existingName = item.name;

                // Remove extension
                const existingHash = path
                    .parse(existingName)
                    .name;

                return existingHash === hash;
            });

            // ==========================================
            // IMAGE ALREADY EXISTS
            // ==========================================
            if (existingFile) {
                const filePath = `${userId}/${existingFile.name}`;

                const { data: publicUrlData } = supabase.storage
                    .from("property-images")
                    .getPublicUrl(filePath);

                return {
                    url: publicUrlData.publicUrl,
                    path: filePath,
                    fileName: existingFile.name,
                    originalName: file.originalname,
                    status: "existing",
                };
            }

            // ==========================================
            // IMAGE DOES NOT EXIST
            // ==========================================
            const extension = path.extname(file.originalname).toLowerCase();

            // Hash becomes filename
            const fileName = `${hash}${extension}`;

            const filePath = `${userId}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("property-images")
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false,
                });

            if (uploadError) {
                // Handle race condition:
                // Another request may have uploaded the same image
                if (
                    uploadError.message?.includes("already exists") ||
                    uploadError.message?.includes("Duplicate")
                ) {
                    const { data: publicUrlData } = supabase.storage
                        .from("property-images")
                        .getPublicUrl(filePath);

                    return {
                        url: publicUrlData.publicUrl,
                        path: filePath,
                        fileName,
                        originalName: file.originalname,
                        status: "existing",
                    };
                }

                throw new Error(
                    `Failed to upload ${file.originalname}: ${uploadError.message}`
                );
            }

            // ==========================================
            // GET PUBLIC URL
            // ==========================================
            const { data: publicUrlData } = supabase.storage
                .from("property-images")
                .getPublicUrl(filePath);

            return {
                url: publicUrlData.publicUrl,
                path: filePath,
                fileName,
                originalName: file.originalname,
                status: "uploaded",
            };
        });

        const images = await Promise.all(uploadPromises);

        // ==========================================
        // RESPONSE
        // ==========================================
        return res.status(201).json({
            success: true,
            message: "Images processed successfully",
            count: images.length,
            images,
        });
    } catch (error) {
        console.error("Upload images error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
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