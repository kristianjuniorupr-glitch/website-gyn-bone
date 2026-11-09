import React from 'react';

export default function Ethos({ onOpenConsultModal }) {
  return (
    <section className="bg-white text-zinc-900 pt-4 sm:pt-6 pb-8 sm:pb-10 scroll-mt-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Image with Tag */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-xl shadow-lg max-h-[260px] sm:max-h-[300px] aspect-[16/10] bg-zinc-900">
              <img 
                alt="Athlete performing heavy dumbbell curl" 
                className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2LOnayl_lD-jbum7uKNc3Ss8BDjlsUuWYYuit_vztiAwlSJ7H4ay9YKnGdGzuw6ZD6MgUi3siFdGA78A-JKaZcrRGFT8rH5IiEUHNhxyDMTq4sP_MLAgeiKzDkM9hKnog2QcxxXgsyy4KoVJCxo3mg97lkQu-hTK5m5posSKjHmV3iQyGD_9KfMnXfIuedDB84rHsOXo_vJ7ikqIOf84kcVMlNWmY3maMxFRPuGWr" 
              />
              <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-sm text-white px-3 py-1.5 border-l-2 border-brand-crimson rounded-r-lg">
                <span className="block font-headline text-lg uppercase tracking-wider">COACHED</span>
                <span className="block text-[9px] font-semibold tracking-widest text-zinc-400 uppercase">SINCE 2014</span>
              </div>
            </div>
          </div>

          {/* Right Content Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="block text-[11px] font-bold uppercase tracking-widest text-brand-crimson mb-1">
              OUR CORE ETHOS
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl leading-[0.95] uppercase text-zinc-950 mb-3 select-none">
              BUILT FOR THE WORK, NOT THE MIRROR
            </h2>
            <div className="space-y-2 text-zinc-600 text-xs sm:text-sm leading-relaxed max-w-xl">
              <p>
                We pair coached programming with honest progression. Every session has a reason, every lift is logged, and every member gets the attention to move well before they move heavy.
              </p>
              <p>
                The floor opens at 5am and stays useful all day: enough racks, clear lanes, and coaches who know when to cue—and when to let you work.
              </p>
            </div>

            {/* Metadata Tags */}
            <div className="pt-4 mt-4 border-t border-zinc-200 grid grid-cols-3 gap-2.5 text-center sm:text-left">
              <div className="cursor-pointer hover:bg-zinc-50 p-1.5 rounded-lg transition" onClick={onOpenConsultModal}>
                <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-zinc-900">COACH-LED</span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">PROGRAMMING</span>
              </div>
              <div className="p-1.5">
                <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-zinc-900">OPEN FLOOR</span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">5AM - 11PM DAILY</span>
              </div>
              <div className="cursor-pointer hover:bg-zinc-50 p-1.5 rounded-lg transition" onClick={onOpenConsultModal}>
                <span className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-brand-crimson">FREE INTAKE</span>
                <span className="text-[9px] sm:text-[10px] text-zinc-500 font-medium underline">ASSESSMENT &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
