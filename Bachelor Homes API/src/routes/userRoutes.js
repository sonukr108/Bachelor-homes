import express from 'express';
const router = express.Router();

import { getUsers, createUser, loginUser } from '../controllers/userController.js';

router.get("/", getUsers);

router.post("/signup", createUser);

router.post("/login", loginUser);

export default router;