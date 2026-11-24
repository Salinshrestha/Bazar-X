import { Link, useNavigate } from "react-router";
import { LogOut, Package, Heart, MapPin, ArrowRight } from "lucide-react";
import { rs } from "../data/product";

const Account = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // only this user's orders
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const orders = allOrders.filter((o) => o.userEmail === user.email);
  const recent = [...orders].reverse().slice(0, 3);

  const cards = [
    { Icon: Package, title: "My orders", text: `${orders.length} orders placed`, to: "/orders" },
    { Icon: Heart, title: "Wishlist", text: "Items you've saved", to: "/wishlist" },
    { Icon: MapPin, title: "Addresses", text: "Manage delivery addresses", to: "/account" },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
      {/* HEADER */}
      <div className="flex items-end justify-between border-b border-neutral-200 pb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500">MY ACCOUNT</p>
          <h1 className="mt-3 text-4xl font-extrabold uppercase">Hello, {user.name}</h1>
          <p className="mt-2 text-sm text-neutral-500">{user.email}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 border border-neutral-900 px-6 py-3 text-xs font-semibold tracking-[0.12em] transition hover:bg-neutral-900 hover:text-white"
        >
          <LogOut size={15} /> SIGN OUT
        </button>
      </div>

      {/* QUICK LINK CARDS */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cards.map(({ Icon, title, text, to }) => (
          <Link
            key={title}
            to={to}
            className="group border border-neutral-200 p-8 transition hover:border-neutral-900"
          >
            <Icon size={26} strokeWidth={1.5} />
            <h2 className="mt-5 text-sm font-bold tracking-[0.1em] uppercase">{title}</h2>
            <p className="mt-2 text-sm text-neutral-500">{text}</p>
          </Link>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <div className="mt-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold uppercase">Recent orders</h2>
          {orders.length > 0 && (
            <Link
              to="/orders"
              className="flex items-center gap-1 text-xs font-semibold tracking-[0.12em] hover:gap-2 transition-all"
            >
              VIEW ALL <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {recent.length === 0 ? (
          <div className="border border-neutral-200 p-12 text-center">
            <Package size={40} strokeWidth={1} className="mx-auto text-neutral-400" />
            <p className="mt-6 text-sm text-neutral-500">You haven't placed any orders yet.</p>
            <Link
              to="/shop"
              className="mt-8 inline-block bg-neutral-900 px-10 py-3.5 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
            >
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {recent.map((order) => (
              <div key={order.id} className="border border-neutral-200">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 bg-[#EDEBE7] px-6 py-4 text-sm">
                  <div>
                    <span className="text-xs text-neutral-500">Order</span>
                    <span className="ml-2 font-semibold">{order.id}</span>
                  </div>
                  <span className="text-neutral-600">{order.date}</span>
                  <span className="font-semibold">{rs(order.total)}</span>
                </div>

                <div className="flex gap-3 overflow-x-auto px-6 py-4">
                  {order.items.map((item) => (
                    <img
                      key={item.id}
                      src={item.img}
                      alt={item.name}
                      title={item.name}
                      className="h-20 w-16 shrink-0 object-cover"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;