import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, CreditCard, Banknote, Smartphone, Check } from "lucide-react";
import { rs } from "../data/product";

const Checkout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "Kathmandu",
    note: "",
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  if (!user) {
    navigate("/login", { state: { from: "/checkout" } });
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-12">
        <h1 className="text-3xl font-extrabold uppercase">Your cart is empty</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-neutral-900 px-12 py-4 text-xs font-semibold tracking-[0.15em] text-white"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  const goToPayment = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      setError("Fill in your name, phone, and address.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    setStep(2);
  };

  const placeOrder = () => {
    const order = {
      id: "VLX" + Date.now().toString().slice(-6),
      userEmail: user.email,
      date: new Date().toLocaleDateString("en-GB"),
      items: cart,
      shipping: form,
      payment,
      subtotal,
      shippingCost: shipping,
      total,
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("cart");

    navigate("/order-success");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-12">
      <Link
        to="/cart"
        className="mb-8 inline-flex items-center gap-1 text-xs font-semibold tracking-[0.12em] text-neutral-500 transition hover:text-neutral-900"
      >
        <ChevronLeft size={14} /> BACK TO CART
      </Link>

      <h1 className="text-4xl font-extrabold uppercase md:text-5xl">Checkout</h1>

      {/* STEPS */}
      <div className="mt-8 flex items-center gap-4 text-xs font-semibold tracking-[0.12em]">
        {["SHIPPING", "PAYMENT"].map((label, i) => (
          <div key={label} className="flex items-center gap-4">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step > i ? "bg-neutral-900 text-white" : "border border-neutral-300 text-neutral-400"
              }`}
            >
              {step > i + 1 ? <Check size={14} /> : i + 1}
            </span>
            <span className={step > i ? "" : "text-neutral-400"}>{label}</span>
            {i === 0 && <span className="h-px w-12 bg-neutral-300" />}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        {/* LEFT */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <form onSubmit={goToPayment} className="space-y-5">
              <h2 className="text-base font-bold tracking-[0.15em]">SHIPPING DETAILS</h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="FULL NAME" value={form.name} onChange={update("name")} placeholder="Salin Shrestha" />
                <Field label="PHONE" value={form.phone} onChange={update("phone")} placeholder="98XXXXXXXX" />
              </div>

              <Field label="EMAIL" type="email" value={form.email} onChange={update("email")} placeholder="name@email.com" />
              <Field label="ADDRESS" value={form.address} onChange={update("address")} placeholder="Street, tole, ward no." />

              <div>
                <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">CITY</label>
                <select
                  value={form.city}
                  onChange={update("city")}
                  className="w-full border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                >
                  {["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Butwal", "Biratnagar"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">
                  DELIVERY NOTE (OPTIONAL)
                </label>
                <textarea
                  value={form.note}
                  onChange={update("note")}
                  rows={3}
                  placeholder="Landmark, delivery instructions..."
                  className="w-full border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                />
              </div>

              {error && (
                <p className="border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-neutral-900 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700 sm:w-auto sm:px-16"
              >
                CONTINUE TO PAYMENT
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-base font-bold tracking-[0.15em]">PAYMENT METHOD</h2>

              {[
                { id: "cod", Icon: Banknote, title: "Cash on delivery", text: "Pay when your order arrives" },
                { id: "esewa", Icon: Smartphone, title: "eSewa", text: "Pay with your eSewa wallet" },
                { id: "khalti", Icon: Smartphone, title: "Khalti", text: "Pay with your Khalti wallet" },
                { id: "card", Icon: CreditCard, title: "Card", text: "Visa, Mastercard" },
              ].map(({ id, Icon, title, text }) => (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-4 border p-5 transition ${
                    payment === id ? "border-neutral-900 bg-[#EDEBE7]" : "border-neutral-300 hover:border-neutral-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === id}
                    onChange={() => setPayment(id)}
                    className="h-4 w-4 accent-neutral-900"
                  />
                  <Icon size={22} strokeWidth={1.5} />
                  <span>
                    <span className="block text-sm font-semibold">{title}</span>
                    <span className="block text-xs text-neutral-500">{text}</span>
                  </span>
                </label>
              ))}

              <div className="mt-8 border border-neutral-200 p-5 text-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.12em]">DELIVERING TO</span>
                  <button onClick={() => setStep(1)} className="text-xs underline">
                    Edit
                  </button>
                </div>
                <p className="font-medium">{form.name}</p>
                <p className="text-neutral-600">{form.phone}</p>
                <p className="text-neutral-600">{form.address}, {form.city}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="border border-neutral-900 px-8 py-4 text-xs font-semibold tracking-[0.15em] transition hover:bg-neutral-900 hover:text-white"
                >
                  BACK
                </button>
                <button
                  onClick={placeOrder}
                  className="flex-1 bg-neutral-900 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
                >
                  PLACE ORDER · {rs(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — SUMMARY */}
        <div className="h-fit bg-[#EDEBE7] p-8">
          <h2 className="mb-6 text-base font-bold tracking-[0.15em]">ORDER SUMMARY</h2>

          <div className="space-y-4 border-b border-neutral-300 pb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img src={item.img} alt={item.name} className="h-20 w-16 shrink-0 object-cover" />
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <p className="text-xs font-semibold uppercase">{item.name}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Qty {item.qty}{item.size && ` · Size ${item.size}`}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">{rs(item.price * item.qty)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-b border-neutral-300 py-6 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Subtotal</span>
              <span>{rs(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Shipping</span>
              <span>{shipping === 0 ? "Free" : rs(shipping)}</span>
            </div>
          </div>

          <div className="flex justify-between pt-6 text-base font-semibold">
            <span>Total</span>
            <span>{rs(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, type = "text", value, onChange, placeholder }) => (
  <div>
    <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
    />
  </div>
);

export default Checkout;