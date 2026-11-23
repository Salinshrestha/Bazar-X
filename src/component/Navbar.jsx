import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Search, User, Heart, ShoppingBag, X } from "lucide-react";

const POPULAR = ["Hoodie", "Jacket", "Polo", "Trousers", "Knit"];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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

  return (
    <header className="sticky top-0 z-40 bg-[#EDEBE7]">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-12">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          VeloniX
        </Link>

        <nav className="flex items-center gap-10">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/collection" className={linkClass}>Collection</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="transition hover:opacity-60"
          >
            <Search size={18} />
          </button>

          <Link to="/account" aria-label="Account" className="transition hover:opacity-60">
            <User size={18} />
          </Link>

          <Link to="/wishlist" aria-label="Wishlist" className="transition hover:opacity-60">
            <Heart size={18} />
          </Link>

          <Link to="/cart" aria-label="Cart" className="relative transition hover:opacity-60">
            <ShoppingBag size={18} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <>
          {/* dark background — click to close */}
          <div
            onClick={closeSearch}
            className="fixed inset-0 top-0 z-40 bg-black/40"
          />

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