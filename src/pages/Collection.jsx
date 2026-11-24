import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { products, rs } from "../data/product";

const collections = [
  {
    name: "Winter Essentials",
    tag: "SEASONAL",
    desc: "Layer up with coats, knits, and outerwear built for the cold.",
    img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1000&q=80",
    filter: (p) =>
      p.cat === "Outerwear" ||
      p.name.toLowerCase().includes("wool") ||
      p.name.toLowerCase().includes("knit"),
  },
  {
    name: "The Minimal Edit",
    tag: "CURATED",
    desc: "Clean, timeless pieces that pair with everything you own.",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80",
    filter: (p) => p.price < 5000,
  },
  {
    name: "Accessories",
    tag: "FINISHING TOUCHES",
    desc: "Bags, watches, and small details that complete the look.",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=80",
    filter: (p) => p.cat === "Accessories",
  },
];

const Collection = () => {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="Collection"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <p className="text-xs font-semibold tracking-[0.3em]">AUTUMN / WINTER 2026</p>
          <h1 className="mt-6 text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl">
            The Collection
          </h1>
          <p className="mt-6 max-w-md text-sm text-white/80">
            Thoughtfully designed pieces, made to be worn season after season.
          </p>
        </div>
      </section>

      {/* COLLECTION BLOCKS */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="space-y-20">
          {collections.map((c, i) => {
            const items = products.filter(c.filter).slice(0, 3);
            return (
              <div
                key={c.name}
                className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                </div>

                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500">{c.tag}</p>
                  <h2 className="mt-4 text-4xl font-extrabold uppercase">{c.name}</h2>
                  <p className="mt-4 max-w-sm text-neutral-600">{c.desc}</p>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {items.map((p) => (
                      <Link key={p.id} to={`/product/${p.id}`} className="group">
                        <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-2 text-xs font-medium">{rs(p.price)}</p>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to="/shop"
                    className="mt-8 inline-flex items-center gap-2 border-b border-neutral-900 pb-1 text-xs font-semibold tracking-[0.15em] transition hover:gap-3"
                  >
                    SHOP THIS EDIT <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED STRIP */}
      <section className="bg-[#EDEBE7]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold uppercase md:text-4xl">Featured pieces</h2>
            <p className="mt-3 text-neutral-500">Handpicked from the new collection</p>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
            {featured.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-white">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide">{p.name}</h3>
                <p className="mt-1 text-sm">{rs(p.price)}</p>
              </Link>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-block bg-neutral-900 px-12 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collection;