import { Router } from 'express';
import multer from 'multer';
import { requireAuth, requireRole } from '../middlewares/authMiddleware';
import { uploadProductImage } from '../controllers/uploadController';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// อัปโหลดรูป (admin เท่านั้น)
router.post(
  '/product-image',
  requireAuth,
  requireRole(['admin']),
  upload.single('image'),
  uploadProductImage
);

export default router;
