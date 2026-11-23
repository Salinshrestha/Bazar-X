import { Link } from "react-router";
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import ProductCard from "../component/ProductCard";
import { categories, products } from "../data/product";

const HERO = "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80";

const Home = () => {
  const newArrivals = products.filter((p) => p.tag === "new");
  const bestsellers = products.filter((p) => p.tag === "best");

  return (
    <main>
      {/* HERO */}
      <section className="bg-[#EDEBE7]">
        <div className="mx-auto grid min-h-[88vh] max-w-[1400px] items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-12">
          <div>
            <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-neutral-500">
              NEW SEASON · 2026
            </p>
            <h1 className="text-6xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-7xl xl:text-8xl">
              Create a<br />fashion<br />vibe
            </h1>
            <p className="mt-8 max-w-sm text-neutral-600">
              Minimal fashion designed for everyday confidence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop" className="bg-neutral-900 px-10 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700">
                SHOP NOW
              </Link>
              <Link to="/collection" className="border border-neutral-900 px-10 py-4 text-xs font-semibold tracking-[0.15em] transition hover:bg-neutral-900 hover:text-white">
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>

          <div className="h-[520px] overflow-hidden lg:h-[78vh]">
            <img src={HERO} alt="Model" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.name} to="/shop" className="group relative aspect-[4/5] overflow-hidden">
              <img
                src={c.img}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xl font-bold uppercase">{c.name}</p>
                <p className="mt-1 flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em]">
                  SHOP NOW <ArrowRight size={13} className="transition group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold uppercase md:text-5xl">New Arrivals</h2>
          <p className="mt-3 text-neutral-500">Timeless pieces crafted with premium fabrics</p>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} badge="NEW" />
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold uppercase md:text-5xl">Bestsellers</h2>
          <p className="mt-3 text-neutral-500">Our most-loved pieces this month</p>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} badge="BESTSELLER" />
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/shop" className="inline-block border border-neutral-900 px-12 py-4 text-xs font-semibold tracking-[0.15em] transition hover:bg-neutral-900 hover:text-white">
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-3 lg:px-12">
          {[
            { Icon: Truck, title: "FREE DELIVERY", text: "On orders over Rs. 5,000" },
            { Icon: RotateCcw, title: "30-DAY RETURNS", text: "Easy, no-questions returns" },
            { Icon: ShieldCheck, title: "SECURE CHECKOUT", text: "Your data is always protected" },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center gap-5">
              <Icon size={30} strokeWidth={1.5} />
              <div>
                <p className="text-sm font-bold tracking-[0.1em]">{title}</p>
                <p className="mt-1 text-sm text-neutral-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;