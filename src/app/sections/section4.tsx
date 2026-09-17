/** Main Hero Banner section - completely uncropped, full width, original proportions. */
export default function Section4() {
  return (
    <section className="w-full relative bg-sacred-ivory overflow-hidden" id="the-meru-hero-banner">
      <div className="w-full">
        <a
          className="block w-full cursor-pointer hover:opacity-98 transition-opacity"
          data-component="link"
          href="/collections/all"
        >
          <img
            className="w-full h-auto block"
            data-component="image"
            alt="THE MERU Sacred Rituals"
            src="/assets/cloned/Banner1.png"
            width={1920}
            height={819}
            loading="eager"
            fetchPriority="high"
          />
        </a>
      </div>
    </section>
  );
}
