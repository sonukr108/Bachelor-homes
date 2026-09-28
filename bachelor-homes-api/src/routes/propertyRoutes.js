import express from "express";

import {
    createProperty,
    getProperties,
    getProperty,
    updateProperty,
    deleteProperty,
    getPropertiesByCity,
    getPropertiesByOwner,
} from "../controllers/propertyController.js";

import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

router.get("/", getProperties);

router.get("/city/:city", getPropertiesByCity);

router.get("/:id", getProperty);

router.get("/owner/:ownerId", getPropertiesByOwner);

// ==========================================
// PROTECTED OWNER ROUTES
// ==========================================


router.post(
    "/",
    authenticateUser,
    createProperty
);

router.put(
    "/:id",
    authenticateUser,
    updateProperty
);

router.delete(
    "/:id",
    authenticateUser,
    deleteProperty
);


export default router;