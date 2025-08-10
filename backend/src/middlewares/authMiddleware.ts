import { Request, Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase';

/**
 * ตรวจสอบว่า request มี token และ token นั้น valid หรือไม่
 * ถ้า valid จะเก็บข้อมูล user ใน req.user
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return res.status(401).json({ error: 'Token missing' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // เก็บ user object ไว้ให้ route ใช้ต่อ
    (req as any).user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

/**
 * ตรวจสอบ role ของ user ว่าตรงตามที่กำหนดหรือไม่
 * roles: array ของ role ที่อนุญาต เช่น ['admin', 'manager']
 */
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userRole = user.user_metadata?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: 'Access denied: insufficient role' });
    }

    next();
  };
};
