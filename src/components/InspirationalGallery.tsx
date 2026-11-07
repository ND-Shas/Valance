import React, { useState } from 'react';

const galleryItems = [
  { id: '01', src: '/gallery/01.jpg', caption: 'Anchored Stillness', subtitle: 'Mounting awareness through breath' },
  { id: '02', src: '/gallery/02.jpg', caption: 'The Mountain Silence', subtitle: 'Retreat in the Dolomites' },
  { id: '03', src: '/gallery/03.jpg', caption: 'Fluid Somatics', subtitle: 'Dynamic intentional movement' },
  { id: '04', src: '/gallery/04.jpg', caption: 'Inner Horizon', subtitle: 'Morning mindfulness at sunrise' },
  { id: '05', src: '/gallery/05.jpg', caption: 'Conscious Touch', subtitle: 'Embodied presence and care' },
  { id: '06', src: '/gallery/06.jpg', caption: 'The Pause', subtitle: 'Creating space between thought and action' },
  { id: '07', src: '/gallery/07.jpg', caption: 'Resonant Community', subtitle: 'Shared practice in Padua' }
];

export const InspirationalGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section
      id="moments"
      className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex flex-col justify-between px-6 md:px-16 lg:px-24 py-16 bg-[#edece8] select-none border-l border-[#1d150c]/8 overflow-hidden"
    >
      {/* Header Bar */}
      <header className="w-full flex items-center justify-between pb-6 border-b border-[#1d150c]/10 text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-[#1d150c]/60">
        <span className="font-semibold text-[#a54d25]">Body</span>
        <span className="text-[#1d150c] font-editorial-sans tracking-wide text-sm md:text-base normal-case font-medium">
          Presence takes many forms
        </span>
        <span className="font-semibold text-[#a54d25]">Breath</span>
      </header>

      {/* Gallery Strip */}
      <div className="w-full my-auto py-8">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4 px-2">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg border border-[#1d150c]/10 bg-white/40">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-mono tracking-widest text-[#fa712a]">
                    0{idx + 1}
                  </span>
                  <p className="text-sm font-editorial-serif font-semibold">{item.caption}</p>
                  <p className="text-xs text-white/80">{item.subtitle}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#1d150c]/70 px-1">
                <span className="font-editorial-serif font-medium group-hover:text-[#a54d25] transition-colors">
                  {item.caption}
                </span>
                <span className="font-mono text-[10px]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-[#1d150c]/10 text-xs text-[#1d150c]/50 font-mono">
        <span>Click any frame to expand</span>
        <span>Scroll to continue →</span>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-[#1a1109]/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[85vh] bg-[#edece8] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="relative w-full aspect-[4/3] bg-black">
              <img
                src={activePhoto.src}
                alt={activePhoto.caption}
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close photo"
              >
                ✕
              </button>
            </div>
            <div className="p-6 flex items-center justify-between bg-[#edece8]">
              <div>
                <h4 className="text-xl font-editorial-serif text-[#1d150c] font-semibold">
                  {activePhoto.caption}
                </h4>
                <p className="text-sm text-[#1d150c]/70 mt-1">
                  {activePhoto.subtitle}
                </p>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#a54d25]">
                Moment {activePhoto.id}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
