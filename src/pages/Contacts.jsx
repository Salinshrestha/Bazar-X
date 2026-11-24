import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contacts = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      {/* HEADER */}
      <section className="bg-[#EDEBE7]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 text-center lg:px-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-neutral-500">
            WE'RE HERE TO HELP
          </p>
          <h1 className="text-5xl font-extrabold uppercase tracking-tight md:text-6xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-neutral-600">
            Questions about an order, a product, or a return? Reach out.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* INFO */}
          <div>
            <h2 className="text-base font-bold tracking-[0.15em]">CONTACT DETAILS</h2>

            <div className="mt-8 space-y-6">
              {[
                { Icon: MapPin, title: "Visit us", lines: ["Durbar Marg", "Kathmandu, Nepal"] },
                { Icon: Phone, title: "Call us", lines: ["+977 1 4XX XXXX", "Sun–Fri, 10am–6pm"] },
                { Icon: Mail, title: "Email us", lines: ["hello@velonix.com", "support@velonix.com"] },
                { Icon: Clock, title: "Store hours", lines: ["Sun–Fri: 10am – 7pm", "Sat: 11am – 5pm"] },
              ].map(({ Icon, title, lines }) => (
                <div key={title} className="flex gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-300">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide">{title}</p>
                    {lines.map((l) => (
                      <p key={l} className="text-sm text-neutral-600">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="bg-[#EDEBE7] p-8 lg:p-10">
            <h2 className="text-base font-bold tracking-[0.15em]">SEND A MESSAGE</h2>

            {sent && (
              <p className="mt-6 border-l-2 border-neutral-900 bg-white px-4 py-3 text-sm">
                Thanks for reaching out. We'll reply within 24 hours.
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">NAME</label>
                <input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="w-full border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">EMAIL</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="name@email.com"
                  className="w-full border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold tracking-[0.12em]">MESSAGE</label>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-neutral-900 py-4 text-xs font-semibold tracking-[0.15em] text-white transition hover:bg-neutral-700"
              >
                <Send size={15} /> SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacts;