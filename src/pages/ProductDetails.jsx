import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck, ChevronLeft } from "lucide-react";
import { products, rs } from "../data/product";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-12">
        <h1 className="text-3xl font-extrabold uppercase">Product not found</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-neutral-900 px-12 py-4 text-xs font-semibold tracking-[0.15em] text-white"
        >
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = cart.find((item) => item.id === product.id);

    if (found) {
      found.qty += qty;
    } else {
      cart.push({ ...product, qty, size });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-12">
      <Link
        to="/shop"
        className="mb-10 inline-flex items-center gap-1 text-xs font-semibold tracking-[0.12em] text-neutral-500 transition hover:text-neutral-900"
      >
        <ChevronLeft size={14} /> BACK TO SHOP
      </Link>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* IMAGE */}
        <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
          <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* DETAILS */}
        <div className="lg:py-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500">
            {product.cat.toUpperCase()}
          </p>

          <h1 className="mt-4 text-4xl font-extrabold uppercase leading-tight tracking-tight md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-2xl font-semibold">{rs(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-neutral-400 line-through">{rs(product.oldPrice)}</span>
                <span className="bg-neutral-900 px-3 py-1 text-[10px] font-semibold tracking-widest text-white">
                  SALE
                </span>
              </>
            )}
          </div>

          <p className="mt-8 leading-relaxed text-neutral-600">
            Crafted from premium fabric with a relaxed, modern fit. Designed to last
            through seasons and pair easily with everything in your wardrobe.
            Available in {product.colors} colors.
          </p>

          {/* SIZE */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.15em]">SELECT SIZE</p>
            <div className="flex gap-3">
              {["XS", "S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-12 w-12 text-sm font-medium transition ${
                    size === s
                      ? "bg-neutral-900 text-white"
                      : "border border-neutral-300 hover:border-neutral-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.15em]">QUANTITY</p>
            <div className="flex w-fit items-center border border-neutral-300">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
                className="px-4 py-3 transition hover:bg-neutral-100"
              >
                <Minus size={16} />
              </button>
              <span className="w-14 text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                aria-label="Increase quantity"
                className="px-4 py-3 transition hover:bg-neutral-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* TOTAL */}
          <div className="mt-10 flex items-center justify-between border-y border-neutral-200 py-5">
            <span className="text-sm text-neutral-600">Total</span>
            <span className="text-xl font-semibold">{rs(product.price * qty)}</span>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-neutral-900 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
            >
              ADD TO CART
            </button>
            <button
              aria-label="Add to wishlist"
              className="flex h-[52px] w-[52px] items-center justify-center border border-neutral-300 transition hover:border-neutral-900"
            >
              <Heart size={18} />
            </button>
          </div>

          {/* INFO */}
          <div className="mt-12 space-y-4 border-t border-neutral-200 pt-8 text-sm">
            <div className="flex items-center gap-4">
              <Truck size={20} strokeWidth={1.5} />
              <span className="text-neutral-600">Free delivery on orders over Rs. 5,000</span>
            </div>
            <div className="flex items-center gap-4">
              <RotateCcw size={20} strokeWidth={1.5} />
              <span className="text-neutral-600">30-day easy returns</span>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheck size={20} strokeWidth={1.5} />
              <span className="text-neutral-600">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="mb-10 text-2xl font-extrabold uppercase">You may also like</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-8">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
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
        </section>
      )}
    </div>
  );
};

export default ProductDetails;