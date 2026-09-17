// Per-instance class overrides, merged onto each component's shared base classes with cn().

export type MediaTileStyles = {
  className: string;
};
export type MediaTile2Styles = {
  className: string;
  className2: string;
};
export type ProductCardStyles = {
  className2: string;
  className?: string;
};
export type TileStyles = {
  className: string;
};

export const MediaTile_styles: MediaTileStyles[] = [
    { className: "" },
    { className: "" },
    { className: "" }
];
export const MediaTile2_styles: MediaTile2Styles[] = [
    { className: "max-md:mx-[6.3px] md:max-lg:mx-0", className2: "left-[187.7px] max-md:left-[10.6875rem] max-md:text-[0.625rem] md:max-lg:left-[131.7px] 2xl:left-[331.7px]" },
    { className: "h-10.5 max-md:mx-2.5 md:max-lg:mx-[6.3px]", className2: "w-[5.1375rem]" },
    { className: "max-md:mx-[0.4125rem] md:max-lg:mx-0", className2: "w-[5.125rem]" }
];
export const ProductCard_styles: ProductCardStyles[] = [
    { className2: "max-md:rounded-lg" },
    { className2: "max-md:rounded-lg" },
    { className: "max-md:bg-surface-2", className2: "max-md:opacity-0" },
    { className: "max-lg:bg-surface-2", className2: "opacity-[0.860973] max-lg:opacity-0 2xl:opacity-[initial]" },
    { className: "max-lg:bg-surface-2", className2: "opacity-[0.860973] max-lg:opacity-0 2xl:opacity-[initial]" },
    { className: "max-lg:bg-surface-2", className2: "opacity-[0.860973] max-lg:opacity-0 2xl:opacity-[initial]" }
];
export const Tile_styles: TileStyles[] = [
    { className: "max-w-512" },
    { className: "max-w-512" },
    { className: "max-w-480" },
    { className: "max-w-512" },
    { className: "max-w-512" },
    { className: "max-w-562.5" }
];
