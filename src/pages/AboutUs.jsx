import { Link } from "react-router";
import { Leaf, Scissors, Globe, Heart } from "lucide-react";

const values = [
  { Icon: Scissors, title: "Crafted well", text: "Every piece is made to last, not to be replaced each season." },
  { Icon: Leaf, title: "Responsible", text: "We use better fabrics and work with small, fair workshops." },
  { Icon: Globe, title: "Made locally", text: "Designed and produced close to home, supporting local makers." },
  { Icon: Heart, title: "For everyone", text: "Timeless design at a price that stays honest." },
];

const AboutUs = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
          alt="Our store"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <p className="text-xs font-semibold tracking-[0.3em]">SINCE 2026</p>
          <h1 className="mt-6 text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
            Our Story
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-12">
        <h2 className="text-3xl font-extrabold uppercase leading-tight md:text-4xl">
          Simple things,<br />beautifully made
        </h2>
        <p className="mt-8 leading-relaxed text-neutral-600">
          Velonix began with a simple idea: that good clothing shouldn't be complicated.
          We were tired of fast fashion that fell apart and trends that didn't last.
          So we set out to make a small, considered collection of pieces designed for
          everyday life, built from quality fabrics, and priced fairly.
        </p>
        <p className="mt-6 leading-relaxed text-neutral-600">
          Today we work with a handful of small workshops to bring you clothing you'll
          reach for again and again. No noise, no waste, just well-made essentials.
        </p>
      </section>

      {/* VALUES */}
      <section className="bg-[#EDEBE7]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-900">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-sm font-bold tracking-[0.12em] uppercase">{title}</h3>
                <p className="mt-3 text-sm text-neutral-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT IMAGE + TEXT */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&q=80"
              alt="Craftsmanship"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500">THE DIFFERENCE</p>
            <h2 className="mt-4 text-4xl font-extrabold uppercase">Quality over quantity</h2>
            <p className="mt-6 leading-relaxed text-neutral-600">
              We release small collections a few times a year instead of chasing every
              trend. That means more care in every piece, less waste, and clothing that
              earns its place in your wardrobe.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-block bg-neutral-900 px-10 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
            >
              EXPLORE THE SHOP
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-neutral-200">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 text-center sm:grid-cols-3 lg:px-12">
          {[
            { num: "12k+", label: "Happy customers" },
            { num: "40+", label: "Pieces per collection" },
            { num: "4.8★", label: "Average rating" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold">{s.num}</p>
              <p className="mt-2 text-xs tracking-[0.12em] text-neutral-500 uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutUs;