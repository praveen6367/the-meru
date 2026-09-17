import ProductCard from "../components/product-card";
import Tile from "../components/tile";
import { ProductCard_styles, Tile_styles } from "../_styles";
import { products as productsContent, tileData as tileDataContent } from "../content";

/** Product Grid section - Our Collections. */
export default function ProductGridSection({
  products = productsContent,
  tileData = tileDataContent,
} = {}) {
  return (
    <section className="w-full py-12 bg-surface-3" id="shopify-section-165874256496fb2364">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="font-sans text-xs font-semibold tracking-widest uppercase text-meru-gold block mb-2">
            SACRED RITUALS
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-deep-charcoal font-semibold tracking-tight">
            Our Collections
          </h2>
          <div className="w-12 h-[1.5px] bg-meru-gold/60 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((d, i) => (
            <ProductCard key={`prod-${i}`} d={d} styles={ProductCard_styles[i]} />
          ))}
          {tileData.map((d, i) => (
            <Tile key={`tile-${i}`} d={d} styles={Tile_styles[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
