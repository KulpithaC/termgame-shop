import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

/**
 * สมัครสมาชิกพร้อมใส่ role ใน user_metadata
 * role จะกำหนดจาก req.body.role หรือ default = 'user'
 */
export const signUp = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { role: role || 'user' } // 👈 ใส่ role ใน user_metadata
    }
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Signup successful', user: data.user });
};

/**
 * เข้าสู่ระบบ (login)
 */
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Signin successful', user: data.user, session: data.session });
};
