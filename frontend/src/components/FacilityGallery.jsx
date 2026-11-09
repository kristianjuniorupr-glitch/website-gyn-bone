import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function FacilityGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      title: 'Cardio & Sprint Track Bay',
      caption: 'Turf lanes with custom pushing sleds and speed markers.',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ00T1iP_oUuTgzTr7XDHe5JQzT29hUgWZ9PPBqA9q043kvMLlcZReH_W0vz50Nk2Vz-Y_Rc44cR0NaYcJOLH1wNOy1YHIn3ld2BnCF1HpPM8fHrHzfSXXwCK2U5xE5Ce7qeojh1zzS2YUia0V5T78NNpfZ0QHWT4SfPPpB-HrG8K3NYMFdJ5pv-BwGL7AJE_4Kqyuf2XcTPXpqL_T1RAa6HuBh8XPV7iwlfRVoqLa'
    },
    {
      title: 'Power Rack Array & Platforms',
      caption: '12 Eleiko commercial racks, calibrated bumper plates, and competition bars.',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArKvkqe6cmX0Hy4kKunkKDVRpffO3Rm9cUuqm7Z8KhNZwo3EBn5-oPmbX1y7QUBrajpU4MroKFM4tgvKYsrAJPd_8PUBbnC7BS1an5X8rQpd9YP_K6FaGYPKL_Jh57-cIMHDBjs2mnzj4Zqf-pvE6vMRkKNWgiP9D37jO_dSHymWBQ9skcGstqaVV9q6rBvY5uacRl7-Uj61e5d_owt8hXJvB8ykmjL30IAzmAUWvX'
    },
    {
      title: 'Heavy Dumbbell Station',
      caption: 'Urethane dumbbells from 2.5kg to 65kg with zero rack crowding.',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgYyEb0bM_LJUov_WF7-m0EISuP_nx08WmpH_yd7eG7ud1YGzRyftndEFNqCiqOEGQp5fo9e1dv2YfEHqi8K-FUL43fZpIb3PGf2Hb8jkk9CEcgA830fiwavdP2ySuZI7S4G1txGIL_ic-LmHjKx1dNmrtotPyaXps93Woz2-pqGv3DSTE-b76FiBnwnGCGKQoNBXgcphC232o1zikq2No2CbG_n0GAA2XrgpwMX1n'
    },
    {
      title: 'Ergometers & Engine Line',
      caption: 'Concept2 RowErgs, SkiErgs, and Echo Bikes built for maximum output.',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLoyCvP1dXFBJ9uad10NKKxk6YuvrcOmvHgsEVaQwfgAjE1ah9g6SDqJ3hZItUZ4oypk81OJ8I_YFhfRuJITuJkc1cf31TQnjhw32_JzfUXNzWEdUROjQGTHfdx_cifBaAUerbooNrZyYZ9PyfrEGhBqqhhdGou6XdZmDGkJs1maGAhBWmwqY9ifAbBwU10ptog_z0P4rTE1LMrsduIPyvDlKbWrRFEmge9irX9a2z'
    }
  ];

  return (
    <section className="bg-brand-dark text-white py-24 border-t border-brand-borderDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-12">
          <span className="block text-xs font-semibold uppercase tracking-widest text-brand-crimson mb-1">
            THE SPACE
          </span>
          <h2 className="font-headline text-5xl sm:text-7xl uppercase tracking-tight text-white leading-none">
            BUILT TO TAKE A BEATING
          </h2>
        </div>

        {/* Bento Grid Facility Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large Left Bay Image */}
          <div 
            onClick={() => setSelectedImage(images[0])}
            className="md:col-span-4 rounded-xl overflow-hidden h-[420px] bg-zinc-900 relative group cursor-pointer border border-white/5"
          >
            <img 
              alt={images[0].title} 
              className="w-full h-full object-cover group-hover:scale-108 transition duration-700" 
              src={images[0].src} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                {images[0].title}
              </span>
              <span className="text-[11px] text-zinc-400">
                {images[0].caption}
              </span>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition p-2 bg-black/60 rounded-full">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Right Grid Column */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Top Wide Image */}
            <div 
              onClick={() => setSelectedImage(images[1])}
              className="sm:col-span-2 rounded-xl overflow-hidden h-[200px] bg-zinc-900 relative group cursor-pointer border border-white/5"
            >
              <img 
                alt={images[1].title} 
                className="w-full h-full object-cover group-hover:scale-108 transition duration-700" 
                src={images[1].src} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  {images[1].title}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {images[1].caption}
                </span>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition p-2 bg-black/60 rounded-full">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Bottom Left Dumbbell Image */}
            <div 
              onClick={() => setSelectedImage(images[2])}
              className="rounded-xl overflow-hidden h-[204px] bg-zinc-900 relative group cursor-pointer border border-white/5"
            >
              <img 
                alt={images[2].title} 
                className="w-full h-full object-cover group-hover:scale-108 transition duration-700" 
                src={images[2].src} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  {images[2].title}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {images[2].caption}
                </span>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition p-2 bg-black/60 rounded-full">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Bottom Right Conditioning Rowers */}
            <div 
              onClick={() => setSelectedImage(images[3])}
              className="rounded-xl overflow-hidden h-[204px] bg-zinc-900 relative group cursor-pointer border border-white/5"
            >
              <img 
                alt={images[3].title} 
                className="w-full h-full object-cover group-hover:scale-108 transition duration-700" 
                src={images[3].src} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  {images[3].title}
                </span>
                <span className="text-[11px] text-zinc-400">
                  {images[3].caption}
                </span>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition p-2 bg-black/60 rounded-full">
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full bg-zinc-950 rounded-2xl overflow-hidden border border-white/20 p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/80 text-white rounded-full hover:bg-brand-crimson transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="p-4 text-left">
              <h3 className="font-headline text-2xl uppercase tracking-wider text-white">{selectedImage.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

