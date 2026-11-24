import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { User, Mail, Lock } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Fill in all the fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: "customer",
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/account");
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#EDEBE7] px-6 py-20">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight">Create account</h1>
        <p className="mt-3 text-sm text-neutral-600">
          Join Velonix for early access to new arrivals.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">FULL NAME</label>
            <div className="relative">
              <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={form.name}
                onChange={update("name")}
                placeholder="Salin Shrestha"
                className="w-full border border-neutral-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">EMAIL</label>
            <div className="relative">
              <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="name@email.com"
                className="w-full border border-neutral-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">PASSWORD</label>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                value={form.password}
                onChange={update("password")}
                placeholder="At least 6 characters"
                className="w-full border border-neutral-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                value={form.confirm}
                onChange={update("confirm")}
                placeholder="Repeat your password"
                className="w-full border border-neutral-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none focus:border-neutral-900"
              />
            </div>
          </div>

          {error && (
            <p className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-neutral-900 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;