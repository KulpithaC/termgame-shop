import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Public
router.get('/', getProducts);

// Admin only
router.post('/', requireAuth, requireRole(['admin']), createProduct);
router.patch('/:id', requireAuth, requireRole(['admin']), updateProduct);
router.delete('/:id', requireAuth, requireRole(['admin']), deleteProduct);

export default router;
