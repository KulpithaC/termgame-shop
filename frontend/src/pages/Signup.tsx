import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);
    const r = await signUp(email.trim(), password);
    if (r.error) setErr(r.error);
    else {
      setOk("Account created. Please login.");
      setTimeout(() => nav("/login"), 800);
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign up</h1>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <input
          className="px-3 py-2 rounded bg-white/10"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-3 py-2 rounded bg-white/10"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <div className="text-red-400 text-sm">{err}</div>}
        {ok && <div className="text-green-400 text-sm">{ok}</div>}
        <button className="px-3 py-2 rounded bg-white/20">
          Create account
        </button>
      </form>
      <div className="mt-3 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}
