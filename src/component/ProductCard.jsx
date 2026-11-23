import { Heart } from "lucide-react";
import { rs } from "../data/product";

const ProductCard = ({ product, badge }) => {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {badge && (
          <span className="absolute left-4 top-4 bg-neutral-900 px-3 py-1.5 text-[10px] font-semibold tracking-widest text-white">
            {badge}
          </span>
        )}

        <button
          aria-label="Add to wishlist"
          className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:scale-110"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">{product.name}</h3>
          <p className="mt-1 text-xs text-neutral-500">
            {product.cat} · {product.colors} colors
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold">{rs(product.price)}</p>
          {product.oldPrice && (
            <p className="text-xs text-neutral-400 line-through">{rs(product.oldPrice)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;