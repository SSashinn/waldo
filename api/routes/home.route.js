import express from 'express';
import { getChar, users , verifyCoordinate} from '../controllers/home.controller.js';
import { makeChar } from "../controllers/home.controller.js";
const router = express.Router();

router.get('/users', users);
router.post('/char',makeChar);
router.get('/chars', getChar);
router.post('/coordinates', verifyCoordinate);
export default router;