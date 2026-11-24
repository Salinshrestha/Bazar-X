import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, User } from "lucide-react";
import { users } from "../data/users";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    const found = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!found) {
      setError(`No ${role} account matches those details.`);
      return;
    }

    const { password: _, ...safeUser } = found;
    localStorage.setItem("user", JSON.stringify(safeUser));

    navigate(found.role === "admin" ? "/admin" : "/account");
  };

  return (
    <div className="grid min-h-[calc(100vh-5rem)] lg:grid-cols-2">
      {/* LEFT — image panel */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80"
          alt="Store"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-16 left-12 right-12 text-white">
          <p className="text-xs font-semibold tracking-[0.25em]">VELONIX</p>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-tight">
            Minimal fashion,<br />made to last
          </h2>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="flex items-center justify-center bg-[#EDEBE7] px-6 py-20">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight">Sign in</h1>
          <p className="mt-3 text-sm text-neutral-600">
            Welcome back. Choose your account type to continue.
          </p>

          {/* ROLE TOGGLE */}
          <div className="mt-8 flex border border-neutral-900">
            <button
              type="button"
              onClick={() => { setRole("customer"); setError(""); }}
              className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-[0.12em] transition ${
                role === "customer" ? "bg-neutral-900 text-white" : "hover:bg-white"
              }`}
            >
              <User size={15} /> CUSTOMER
            </button>
            <button
              type="button"
              onClick={() => { setRole("admin"); setError(""); }}
              className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-[0.12em] transition ${
                role === "admin" ? "bg-neutral-900 text-white" : "hover:bg-white"
              }`}
            >
              <ShieldCheck size={15} /> ADMIN
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">
                EMAIL
              </label>
              <div className="relative">
                <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full border border-neutral-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">
                PASSWORD
              </label>
              <div className="relative">
                <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-neutral-300 bg-white py-3.5 pl-12 pr-12 text-sm outline-none focus:border-neutral-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Toggle password visibility"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900"
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-neutral-600">
                <input type="checkbox" className="h-3.5 w-3.5 accent-neutral-900" />
                Remember me
              </label>
              <span className="cursor-pointer underline">Forgot password?</span>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
            >
              SIGN IN AS {role.toUpperCase()}
            </button>
          </form>

          {role === "customer" && (
            <p className="mt-8 text-center text-sm text-neutral-600">
              New here?{" "}
              <Link to="/register" className="font-semibold underline">
                Create an account
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;