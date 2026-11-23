import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Heart } from "lucide-react";
import { products, rs } from "../data/product";

const CATS = ["All", "Men", "Women", "Unisex", "Accessories"];

const Shop = () => {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("featured");

  let list = products.filter((p) => {
    const matchCat = cat === "All" || p.cat === cat;
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {/* HEADER */}
      <section className="bg-[#EDEBE7]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center lg:px-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-neutral-500">
            COLLECTION 2026
          </p>
          <h1 className="text-5xl font-extrabold uppercase tracking-tight md:text-6xl">
            {query ? `"${query}"` : "Shop All"}
          </h1>
          <p className="mt-4 text-neutral-600">Everyday essentials, made to last.</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-20 z-30 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-12">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  cat === c
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500">{list.length} products</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-neutral-300 px-4 py-2 text-xs uppercase tracking-[0.1em] outline-none focus:border-neutral-900"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-12">
        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-2xl font-semibold uppercase">Nothing found</p>
            <p className="mt-3 text-neutral-500">Try a different category or search term.</p>
            <button
              onClick={() => setCat("All")}
              className="mt-8 border border-neutral-900 px-10 py-4 text-xs font-semibold tracking-[0.15em] transition hover:bg-neutral-900 hover:text-white"
            >
              SHOW ALL PRODUCTS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
            {list.map((p) => (
              <div key={p.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  <Link to={`/product/${p.id}`}>
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {p.tag === "new" && (
                    <span className="absolute left-4 top-4 bg-neutral-900 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-white">
                      NEW
                    </span>
                  )}
                  {p.oldPrice && (
                    <span className="absolute left-4 top-4 bg-neutral-900 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-white">
                      SALE
                    </span>
                  )}

                  <button
                    aria-label="Add to wishlist"
                    className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:scale-110"
                  >
                    <Heart size={16} />
                  </button>

                  <Link
                    to={`/product/${p.id}`}
                    className="absolute bottom-0 left-0 right-0 translate-y-full bg-neutral-900 py-3.5 text-center text-xs font-semibold tracking-[0.15em] text-white transition-transform duration-300 group-hover:translate-y-0"
                  >
                    VIEW PRODUCT
                  </Link>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide">{p.name}</h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      {p.cat} · {p.colors} colors
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold">{rs(p.price)}</p>
                    {p.oldPrice && (
                      <p className="text-xs text-neutral-400 line-through">{rs(p.oldPrice)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Shop;