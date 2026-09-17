import type { ProductCardStyles } from "../_styles";
import { cn } from "../../lib/utils";

export type ProductCardData = {
  href: string;
  alt: string;
  imgSrc: string;
  title: string;
};

/** A featured collection card. */
export default function ProductCard({ d, styles }: { d: ProductCardData; styles?: ProductCardStyles }) {
  return (
    <div className="block max-w-full align-top group">
      <div className="h-full block relative rounded-[8px] overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-300">
        <a className="h-full block relative cursor-pointer" data-component="link" href={d.href}>
          <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-[8px]"
              data-component="image"
              alt={d.alt}
              src={d.imgSrc}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-deep-charcoal/20 to-transparent rounded-[8px]" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-3 text-center">
            <span className="block w-full py-2 px-3 text-sacred-ivory text-xs sm:text-sm font-sans font-semibold uppercase tracking-widest bg-deep-charcoal/70 backdrop-blur-xs rounded-[6px] group-hover:bg-meru-gold group-hover:text-deep-charcoal transition-all duration-300">
              {d.title}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
