import { Link } from "react-router";
import { Check, Package, Truck } from "lucide-react";
import { rs } from "../data/product";

const OrderSuccess = () => {
  const order = JSON.parse(localStorage.getItem("lastOrder"));

  if (!order) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center lg:px-12">
        <h1 className="text-3xl font-extrabold uppercase">No recent order</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-neutral-900 px-12 py-4 text-xs font-semibold tracking-[0.15em] text-white"
        >
          GO TO SHOP
        </Link>
      </div>
    );
  }

  const paymentLabels = {
    cod: "Cash on delivery",
    esewa: "eSewa",
    khalti: "Khalti",
    card: "Card",
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-12">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
          <Check size={30} className="text-white" />
        </div>
        <h1 className="mt-8 text-4xl font-extrabold uppercase">Order placed</h1>
        <p className="mt-3 text-neutral-600">
          Thank you, {order.shipping.name.split(" ")[0]}. We've emailed your confirmation.
        </p>
        <p className="mt-6 inline-block bg-[#EDEBE7] px-6 py-3 text-sm">
          Order ID <span className="font-semibold">{order.id}</span>
        </p>
      </div>

      {/* ITEMS */}
      <div className="mt-14 border border-neutral-200">
        <div className="border-b border-neutral-200 bg-[#EDEBE7] px-6 py-4">
          <span className="text-xs font-semibold tracking-[0.12em]">ORDER DETAILS</span>
        </div>

        <div className="divide-y divide-neutral-100">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4 px-6 py-5">
              <img src={item.img} alt={item.name} className="h-20 w-16 shrink-0 object-cover" />
              <div className="flex flex-1 items-start justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase">{item.name}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Qty {item.qty}{item.size && ` · Size ${item.size}`}
                  </p>
                </div>
                <p className="text-sm font-semibold">{rs(item.price * item.qty)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-neutral-200 px-6 py-5 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span>{rs(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Shipping</span>
            <span>{order.shippingCost === 0 ? "Free" : rs(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{rs(order.total)}</span>
          </div>
        </div>
      </div>

      {/* DELIVERY INFO */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="border border-neutral-200 p-6">
          <Truck size={20} strokeWidth={1.5} />
          <p className="mt-4 text-xs font-semibold tracking-[0.12em]">DELIVERING TO</p>
          <p className="mt-2 text-sm font-medium">{order.shipping.name}</p>
          <p className="text-sm text-neutral-600">{order.shipping.phone}</p>
          <p className="text-sm text-neutral-600">
            {order.shipping.address}, {order.shipping.city}
          </p>
        </div>

        <div className="border border-neutral-200 p-6">
          <Package size={20} strokeWidth={1.5} />
          <p className="mt-4 text-xs font-semibold tracking-[0.12em]">PAYMENT</p>
          <p className="mt-2 text-sm font-medium">{paymentLabels[order.payment]}</p>
          <p className="text-sm text-neutral-600">Ordered on {order.date}</p>
          <p className="mt-2 text-sm text-neutral-600">Arrives in 2–5 days</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/shop"
          className="flex-1 bg-neutral-900 py-4 text-center text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
        >
          CONTINUE SHOPPING
        </Link>
        <Link
          to="/account"
          className="flex-1 border border-neutral-900 py-4 text-center text-xs font-semibold tracking-[0.15em] transition hover:bg-neutral-900 hover:text-white"
        >
          VIEW MY ORDERS
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;