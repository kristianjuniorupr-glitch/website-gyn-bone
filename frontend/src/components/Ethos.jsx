import React from 'react';

export default function Ethos({ onOpenConsultModal }) {
  return (
    <section className="bg-white text-zinc-900 py-24 sm:py-32" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Image with Tag */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-lg shadow-xl aspect-[4/5] bg-zinc-900">
              <img 
                alt="Athlete performing heavy dumbbell curl" 
                className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2LOnayl_lD-jbum7uKNc3Ss8BDjlsUuWYYuit_vztiAwlSJ7H4ay9YKnGdGzuw6ZD6MgUi3siFdGA78A-JKaZcrRGFT8rH5IiEUHNhxyDMTq4sP_MLAgeiKzDkM9hKnog2QcxxXgsyy4KoVJCxo3mg97lkQu-hTK5m5posSKjHmV3iQyGD_9KfMnXfIuedDB84rHsOXo_vJ7ikqIOf84kcVMlNWmY3maMxFRPuGWr" 
              />
              <div className="absolute bottom-6 left-6 bg-black/85 backdrop-blur-sm text-white px-5 py-3 border-l-2 border-brand-crimson">
                <span className="block font-headline text-2xl uppercase tracking-wider">COACHED</span>
                <span className="block text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">SINCE 2014</span>
              </div>
            </div>
          </div>

          {/* Right Content Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-headline text-6xl sm:text-7xl lg:text-8xl leading-[0.9] uppercase text-zinc-950 mb-8 select-none">
              BUILT FOR THE WORK, NOT THE MIRROR
            </h2>
            <div className="space-y-5 text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl">
              <p>
                We pair coached programming with honest progression. Every session has a reason, every lift is logged, and every member gets the attention to move well before they move heavy.
              </p>
              <p>
                The floor opens at 5am and stays useful all day: enough racks, clear lanes, and coaches who know when to cue—and when to let you work.
              </p>
            </div>

            {/* Metadata Tags */}
            <div className="pt-10 mt-8 border-t border-zinc-200 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div className="cursor-pointer hover:bg-zinc-50 p-2 rounded transition" onClick={onOpenConsultModal}>
                <span className="block text-[11px] font-bold tracking-widest uppercase text-zinc-900">COACH-LED</span>
                <span className="text-[11px] text-zinc-500 font-medium">PROGRAMMING</span>
              </div>
              <div className="p-2">
                <span className="block text-[11px] font-bold tracking-widest uppercase text-zinc-900">OPEN FLOOR</span>
                <span className="text-[11px] text-zinc-500 font-medium">5AM - 11PM DAILY</span>
              </div>
              <div className="cursor-pointer hover:bg-zinc-50 p-2 rounded transition" onClick={onOpenConsultModal}>
                <span className="block text-[11px] font-bold tracking-widest uppercase text-brand-crimson">FREE INTAKE</span>
                <span className="text-[11px] text-zinc-500 font-medium underline">ASSESSMENT &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

