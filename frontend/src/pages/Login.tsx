import { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState(''), [password, setPassword] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const nav = useNavigate()
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    const r = await signIn(email.trim(), password)
    if (r.error) setErr(r.error)
    else nav(from, { replace: true })
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <input className="px-3 py-2 rounded bg-white/10" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="px-3 py-2 rounded bg-white/10" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        {err && <div className="text-red-400 text-sm">{err}</div>}
        <button className="px-3 py-2 rounded bg-white/20">Login</button>
      </form>
      <div className="mt-3 text-sm">
        No account? <Link to="/signup" className="underline">Sign up</Link>
      </div>
    </div>
  )
}
