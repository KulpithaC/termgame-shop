import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import uploadRoutes from './upload';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/upload', uploadRoutes);

export default router;
