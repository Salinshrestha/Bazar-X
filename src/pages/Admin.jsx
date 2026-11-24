import { useNavigate } from "react-router";
import { LogOut, Package, Users, TrendingUp, ShoppingBag } from "lucide-react";
import { products, rs } from "../data/product";

const Admin = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const stats = [
    { Icon: ShoppingBag, label: "Total products", value: products.length },
    { Icon: Package, label: "Orders today", value: 12 },
    { Icon: Users, label: "Customers", value: 248 },
    { Icon: TrendingUp, label: "Revenue", value: rs(184500) },
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
      <div className="flex items-end justify-between border-b border-neutral-200 pb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500">ADMIN PANEL</p>
          <h1 className="mt-3 text-4xl font-extrabold uppercase">Dashboard</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 border border-neutral-900 px-6 py-3 text-xs font-semibold tracking-[0.12em] transition hover:bg-neutral-900 hover:text-white"
        >
          <LogOut size={15} /> SIGN OUT
        </button>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ Icon, label, value }) => (
          <div key={label} className="bg-[#EDEBE7] p-8">
            <Icon size={22} strokeWidth={1.5} />
            <p className="mt-6 text-3xl font-extrabold">{value}</p>
            <p className="mt-1 text-xs tracking-[0.1em] text-neutral-600 uppercase">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 mb-6 text-xl font-extrabold uppercase">All products</h2>
      <div className="overflow-x-auto border border-neutral-200">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-200 bg-[#EDEBE7]">
            <tr className="text-left text-xs tracking-[0.1em] uppercase">
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Colors</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-neutral-100 last:border-0">
                <td className="flex items-center gap-4 px-6 py-4">
                  <img src={p.img} alt={p.name} className="h-14 w-11 object-cover" />
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="px-6 py-4 text-neutral-600">{p.cat}</td>
                <td className="px-6 py-4 font-semibold">{rs(p.price)}</td>
                <td className="px-6 py-4 text-neutral-600">{p.colors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;