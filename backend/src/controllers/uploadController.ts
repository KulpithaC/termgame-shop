import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import path from 'path';
import { randomUUID } from 'crypto';

export const uploadProductImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileExt = path.extname(req.file.originalname);
  const fileName = `${randomUUID()}${fileExt}`;
  const filePath = `${fileName}`;

  // อัปโหลดไฟล์ไป Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, req.file.buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: req.file.mimetype
    });

  if (uploadError) {
    return res.status(500).json({ error: uploadError.message });
  }

  // สร้าง public URL
  const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);

  res.json({ image_url: data.publicUrl });
};
