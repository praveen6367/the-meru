/** Video New Tw section - Brand Purpose & Mission. */
export default function VideoNewTwSection() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-clr-5" id="shopify-section-video_new_tw_t7jqiC">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <h2 className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-deep-charcoal tracking-tight max-w-2xl mb-8 leading-snug">
          Good For You, Good For The Planet & Good For The People Who Make It
        </h2>

        <div className="w-full max-w-4xl relative rounded-2xl overflow-hidden shadow-card aspect-video bg-black/10 border border-deep-charcoal/10">
          <video
            className="w-full h-full object-cover object-center rounded-2xl"
            id="tw-customizerVideo"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
          >
            <source src="/assets/products/the-meru/videobannner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
