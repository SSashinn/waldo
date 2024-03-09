import express from 'express';
import { users } from '../controllers/home.controller.js';
import { makeChar } from "../controllers/home.controller.js";
const router = express.Router();

router.get('/users', users);
router.post('/char',makeChar);
export default router;