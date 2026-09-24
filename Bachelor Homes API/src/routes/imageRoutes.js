import express from "express";
import multer from "multer";

import {
    uploadImage, deleteImage
} from "../controllers/imageController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 4,
    },

    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.mimetype)) {
            return cb(
                new Error(
                    "Only JPG, JPEG, PNG and WEBP images are allowed"
                )
            );
        }

        cb(null, true);
    },
});

router.post(
    "/upload",
    authenticateUser,
    upload.single("image"),
    uploadImage
);

router.delete(
    "/delete",
    authenticateUser,
    deleteImage
);

export default router;