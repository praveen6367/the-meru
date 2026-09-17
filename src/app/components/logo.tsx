export type LogoData = {
  imgSrc: string;
};
/** A logo. */
export default function Logo({ d }: { d: LogoData }) {
  return (
    <img className="w-[4.0625rem] h-[4.0625rem] block max-w-full overflow-clip" data-component="image" src={d.imgSrc} />
  );
}
