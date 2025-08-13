import { supabase } from './supabase'

const BASE = import.meta.env.VITE_API_BASE_URL as string

export async function apiFetch(input: string, init: RequestInit = {}) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  const res = await fetch(`${BASE}${input}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': (init as any).body instanceof FormData ? undefined : 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    } as HeadersInit,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Request failed: ${res.status}`)
  }
  // ถ้าเป็น 204 ไม่มี body
  if (res.status === 204) return null
  return res.json()
}
