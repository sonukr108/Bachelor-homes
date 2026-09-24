import express from "express";

import {
    ownerSignup,
    ownerSignin,
    refreshAccessToken,
} from "../controllers/ownerController.js";

const router = express.Router();


// ==========================================
// OWNER AUTH ROUTES
// ==========================================

router.post("/signup", ownerSignup);

router.post("/signin", ownerSignin);

router.post("/refresh-token", refreshAccessToken);


export default router;