import { useState } from "react";
import { Link } from "react-router";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { rs } from "../data/product";

const Cart = () => {
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  const save = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id) => {
    save(cart.filter((item) => item.id !== id));
  };

  const changeQty = (id, amount) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, qty: item.qty + amount } : item
      )
      .filter((item) => item.qty > 0);
    save(updated);
  };

  const clearCart = () => save([]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-12">
        <ShoppingBag size={48} strokeWidth={1} className="mx-auto text-neutral-400" />
        <h1 className="mt-8 text-3xl font-extrabold uppercase">Your cart is empty</h1>
        <p className="mt-3 text-neutral-500">Looks like you haven't added anything yet.</p>
        <Link
          to="/shop"
          className="mt-10 inline-block bg-neutral-900 px-12 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold uppercase md:text-5xl">Shopping Cart</h1>
          <p className="mt-2 text-neutral-500">{totalItems} items</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold tracking-[0.12em] text-neutral-500 underline transition hover:text-neutral-900"
        >
          CLEAR CART
        </button>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* ITEMS */}
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-neutral-200 py-6 first:pt-0">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-36 w-28 bg-neutral-100 object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-sm font-semibold uppercase tracking-wide hover:underline">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-xs text-neutral-500">
                      {item.cat}{item.size && ` · Size ${item.size}`}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{rs(item.price)} each</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="text-neutral-400 transition hover:text-neutral-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex items-center border border-neutral-300">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      aria-label="Decrease quantity"
                      className="px-3 py-2 transition hover:bg-neutral-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      aria-label="Increase quantity"
                      className="px-3 py-2 transition hover:bg-neutral-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <p className="text-sm font-semibold">{rs(item.price * item.qty)}</p>
                </div>
              </div>
            </div>
          ))}

          <Link to="/shop" className="mt-8 inline-block text-xs font-semibold tracking-[0.12em] underline">
            ← CONTINUE SHOPPING
          </Link>
        </div>

        {/* SUMMARY */}
        <div className="h-fit bg-[#EDEBE7] p-8">
          <h2 className="mb-6 text-base font-bold tracking-[0.15em]">ORDER SUMMARY</h2>

          <div className="space-y-4 border-b border-neutral-300 pb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span>{rs(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Shipping</span>
              <span>{shipping === 0 ? "Free" : rs(shipping)}</span>
            </div>
          </div>

          <div className="flex justify-between py-6 text-base font-semibold">
            <span>Total</span>
            <span>{rs(total)}</span>
          </div>

          {shipping > 0 && (
            <p className="mb-6 text-xs text-neutral-500">
              Add {rs(5000 - subtotal)} more for free delivery.
            </p>
          )}


          

          <Link
            to="/checkout"
            className="block p-3.5 w-full bg-neutral-900 py-4 text-center text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;