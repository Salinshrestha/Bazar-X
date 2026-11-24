import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Search, User, Heart, ShoppingBag, X, LogOut, LayoutDashboard } from "lucide-react";

const POPULAR = ["Hoodie", "Jacket", "Polo", "Trousers", "Knit"];

const Navbar = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const linkClass = ({ isActive }) =>
    `text-xs font-medium uppercase tracking-[0.15em] transition ${
      isActive ? "text-neutral-900" : "text-black/60 hover:text-neutral-900"
    }`;

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const runSearch = (term) => {
    if (!term.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(term.trim())}`);
    closeSearch();
  };

  const logout = () => {
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 bg-[#EDEBE7]">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-12">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3" aria-label="Velonix home">
          <svg width="32" height="32" viewBox="0 0 100 100" aria-hidden="true">
            <rect
              x="20" y="20" width="60" height="60"
              transform="rotate(45 50 50)"
              fill="none" stroke="#1A1A1A" strokeWidth="3"
            />
            <path
              d="M35 38 L50 68 L65 38"
              stroke="#1A1A1A" strokeWidth="7" fill="none" strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-semibold tracking-[0.25em]">VELONIX</span>
        </Link>

        {/* LINKS */}
        <nav className="flex items-center gap-10">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/collection" className={linkClass}>Collection</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* ICONS */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="transition hover:opacity-60"
          >
            <Search size={18} />
          </button>

          <Link to="/wishlist" aria-label="Wishlist" className="transition hover:opacity-60">
            <Heart size={18} />
          </Link>

          <Link to="/cart" aria-label="Cart" className="relative transition hover:opacity-60">
            <ShoppingBag size={18} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
              0
            </span>
          </Link>

          {/* AUTH */}
          {user ? (
            <div className="relative" onMouseLeave={() => setMenuOpen(false)}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:opacity-60"
              >
                <User size={18} />
                {user.name.split(" ")[0]}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full w-52 border border-neutral-200 bg-white pt-0 shadow-lg">
                  <div className="border-b border-neutral-200 px-5 py-4">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-neutral-500">{user.email}</p>
                  </div>

                  <Link
                    to={user.role === "admin" ? "/admin" : "/account"}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 text-sm transition hover:bg-[#EDEBE7]"
                  >
                    <LayoutDashboard size={15} />
                    {user.role === "admin" ? "Dashboard" : "My account"}
                  </Link>

                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 border-t border-neutral-200 px-5 py-3 text-sm transition hover:bg-[#EDEBE7]"
                  >
                    <LogOut size={15} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-neutral-900 px-6 py-3 text-xs font-semibold tracking-[0.12em] text-white transition hover:bg-neutral-700"
            >
              SIGN IN
            </Link>
          )}
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <>
          <div onClick={closeSearch} className="fixed inset-0 z-40 bg-black/40" />

          <div className="absolute left-0 right-0 top-0 z-50 bg-white">
            <div className="mx-auto max-w-[1400px] px-12 py-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runSearch(query);
                }}
                className="flex items-center gap-4 border-b border-neutral-900 pb-4"
              >
                <Search size={20} className="shrink-0 text-neutral-500" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 bg-transparent text-xl outline-none placeholder:text-neutral-400"
                />
                <button type="button" onClick={closeSearch} aria-label="Close search">
                  <X size={22} className="text-neutral-700 transition hover:opacity-60" />
                </button>
              </form>

              <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Popular searches
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    onClick={() => runSearch(term)}
                    className="rounded-full border border-neutral-300 px-5 py-2 text-sm transition hover:border-neutral-900"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;