import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AuthCtx = {
  user: User | null
  role: string | null
  session: Session | null
  loading: boolean
  signIn(email: string, password: string): Promise<{ error?: string }>
  signUp(email: string, password: string): Promise<{ error?: string }>
  signOut(): Promise<void>
}

const Ctx = createContext<AuthCtx | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => {
      setSession(sess)
      setUser(sess?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const role = useMemo(() => (user?.user_metadata as any)?.role ?? null, [user])

  async function signIn(email: string, password: string) {
    // เลือกได้ 2 ทาง: frontend login เอง หรือเรียก backend
    // ทาง A (frontend): 
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message }

    // ทาง B (backend) — ถ้าต้องการใช้ token จาก backend:
    // const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signin`, {
    //   method: 'POST', headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // });
    // if (!res.ok) return { error: (await res.json()).error || 'Signin failed' }
    // const json = await res.json()
    // await supabase.auth.setSession(json.session)  // sync session เข้า supabase client
    // return {}
  }

  async function signUp(email: string, password: string) {
    // สมัครผ่าน **backend** เท่านั้น เพื่อกัน user ยัด role เอง
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) // ไม่มี role
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      return { error: j.error || 'Signup failed' }
    }
    // สมัครเสร็จ → ให้ผู้ใช้ไปหน้า Login แล้วค่อย Signin
    return {}
  }

  async function signOut() { await supabase.auth.signOut() }

  return (
    <Ctx.Provider value={{ user, role, session, loading, signIn, signUp, signOut }}>
      {children}
    </Ctx.Provider>
  )
}
export function useAuth(){ const c = useContext(Ctx); if(!c) throw new Error('useAuth inside AuthProvider'); return c }
