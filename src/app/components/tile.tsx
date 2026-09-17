import type { TileStyles } from "../_styles";
import { cn } from "../../lib/utils";

export type TileData = {
  href: string;
  label: string;
  imgSrc?: string;
};

/** A category collection tile. */
export default function Tile({ d, styles }: { d: TileData; styles?: TileStyles }) {
  return (
    <div className="block max-w-full align-top group">
      <div className="h-full block relative rounded-[8px] overflow-hidden shadow-subtle hover:shadow-hover transition-all duration-300">
        <a className="h-full block relative cursor-pointer" data-component="link" href={d.href}>
          <div className="relative aspect-square w-full overflow-hidden bg-surface-2">
            {d.imgSrc ? (
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                alt={d.label}
                src={d.imgSrc}
              />
            ) : (
              <div className="w-full h-full bg-warm-sand/40" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal/80 via-deep-charcoal/20 to-transparent" />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-3 text-center">
            <span className="block w-full py-2 px-3 text-sacred-ivory text-xs sm:text-sm font-sans font-semibold uppercase tracking-widest bg-deep-charcoal/70 backdrop-blur-xs rounded-[6px] group-hover:bg-meru-gold group-hover:text-deep-charcoal transition-all duration-300">
              {d.label}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}
