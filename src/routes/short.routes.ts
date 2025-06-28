import express from 'express';
import { createUrl, redirectUrl } from '../controller/short.controller';
const router = express.Router();

router.post('/short-link', createUrl);
router.get('/:callBackUrl', redirectUrl);

export default router;
