import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const getProducts = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, image_url, stock } = req.body;
  const { data, error } = await supabase.from('products').insert([{ name, price, image_url, stock }]).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, image_url, stock } = req.body;
  const { data, error } = await supabase.from('products').update({ name, price, image_url, stock }).eq('id', id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Product deleted' });
};
