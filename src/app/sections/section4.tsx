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
          <picture className="block w-full">
            {/* Mobile portrait banner (941x1672) - full size, uncropped, unstretched */}
            <source
              media="(max-width: 767px)"
              srcSet="/assets/products/the-meru/mobilebanners1.png"
              width={941}
              height={1672}
            />
            {/* Desktop landscape banner (1920x819) */}
            <source
              media="(min-width: 768px)"
              srcSet="/assets/cloned/Banner1.png"
              width={1920}
              height={819}
            />
            {/* Fallback image preserving natural aspect ratio */}
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
          </picture>
        </a>
      </div>
    </section>
  );
}
