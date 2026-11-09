import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Dumbbell, Zap, Activity, UserCheck } from 'lucide-react';

export default function Disciplines({ onSelectDiscipline, onOpenConsultModal }) {
  const disciplines = [
    {
      id: 'strength',
      title: 'STRENGTH',
      tagline: 'Barbell fundamentals and progressive overload, coached rep by rep.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq1JyzWi0iXS3XJFUUmYdAqvmyohfbz2tXpkQalUcX4mX_CUY04YXGN7_BsfEuKquj2fVM33ZSzpKRxZNFViGWCFuJ1oDt7LP10bjtMk7ABz9aO4vStlRZn_he3VR-Xdw_eSlX9UohjCgWiWi_5_rcLeGd3r40QAfR9qwPOcjcRcr09qW5wXPuXnbIf2NvknTDBEllh5Ubev3P4fMVDzStOf1gvftcDmMg5F3CiP7O',
      icon: Dumbbell,
      focus: 'Deadlift, Squat, Bench, Strict Press'
    },
    {
      id: 'hiit',
      title: 'HIIT & CONDITIONING',
      tagline: 'Short, brutal, measurable intervals designed to raise your functional aerobic ceiling.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR96_HfTMzYc75vydqf1-uBGZStO8Ck1NasBNFoFyrUGZs_Li_OPak60kFKfZ8zBvW72N9daV8ujqQehat7Oc274P6fH134YQbEalpIDLnIpP45bpQf5SRx1ZezbrzMCrbjUtS9_Hy0RRaR-Hx9SVWI9pQ4hblZxWZdQFeGtndheDXFQZbsZOyoaP6YVIlJGUqBHwZ34loRz3k_g8XpbZobCVFhY7Lx5RS8U_W61eJ',
      icon: Zap,
      focus: 'RowErg, SkiErg, Sleds, Assault Bike'
    },
    {
      id: 'hypertrophy',
      title: 'HYPERTROPHY',
      tagline: 'Split programming for clean size, with calculated volume you can actually recover from.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoObOHejPnnQVytkN4jUI0QyRQ7gUBnYAvwHPDJqJeZXgVQF6Xd2PlhKZIeMs6AfExqiX2A66QbrR43ug49Yg6BxEoENKNO312aaNiJsBU5KE0zll9aumRb8bI2zuu8kAbjAzZ9ZBv-wRw_ty2R47v9sbLnjeGwIs2mLpRyWcPuGUQnhBl1mmaTz3zNuIFhzH4Ne2UY_Mync5Xbf9aXTNBjTadSL8pq5fpI-V1KeTV',
      icon: Activity,
      focus: 'Time-under-tension, Controlled Eccentrics'
    },
    {
      id: 'coaching',
      title: '1-ON-1 COACHING',
      tagline: 'Dedicated biomechanics, habit integration, and tailored athlete programming.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8NSQD7nojm-Js0v7RnS900sYcNjuuZH533Y2nOGd7WbKdqzIIcZlD8f66MA6HOkpOlRSKHRz5FIOqkU2Fb1WUTMe9waDIOi2Ca-qJSVxspunL4PUzYAOhI9hHDcp-2Xdv32MiB6SkQuHkmB3FLNHLfY1RmBolXhByc1DCy_R1WkFzBTLUv-PRLILps9yhN0Ro7iFKGE7LvpoZBfM0OiZl4EUqNxc6-uRRHdMEC1cN',
      icon: UserCheck,
      focus: 'Movement screens, Custom weekly microcycles'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % disciplines.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + disciplines.length) % disciplines.length);
  };

  return (
    <section className="bg-[#f7f7f8] py-24 border-t border-zinc-200" id="disciplines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-widest text-brand-crimson mb-2">
              ATHLETIC DOMAINS
            </span>
            <h2 className="font-headline text-5xl sm:text-7xl uppercase text-zinc-950 tracking-tight leading-none">
              PICK YOUR DISCIPLINE
            </h2>
          </div>

          {/* Carousel Nav Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={prevSlide}
              aria-label="Previous slide" 
              className="w-10 h-10 rounded-full border border-zinc-300 hover:border-zinc-900 flex items-center justify-center text-zinc-700 hover:text-zinc-900 transition active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next slide" 
              className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Discipline Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {disciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="relative group rounded-xl overflow-hidden aspect-[3/4] bg-zinc-900 shadow-md hover:shadow-2xl transition duration-300 flex flex-col justify-end cursor-pointer"
                onClick={() => {
                  if (item.id === 'coaching') {
                    onOpenConsultModal();
                  } else {
                    const categoryMap = {
                      strength: 'Strength',
                      hiit: 'Conditioning',
                      hypertrophy: 'Hypertrophy'
                    };
                    if (onSelectDiscipline) {
                      onSelectDiscipline(categoryMap[item.id] || 'ALL');
                    } else {
                      const el = document.getElementById('schedule');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                <img 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition duration-700 opacity-80" 
                  src={item.image} 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent"></div>
                
                {/* Discipline Tag */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
                  <Icon className="w-4 h-4 text-brand-crimson" />
                </div>

                <div className="relative z-10 p-6 text-white">
                  <h3 className="font-headline text-3xl tracking-wide uppercase mb-2 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-snug mb-3">
                    {item.tagline}
                  </p>
                  <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-white/70 group-hover:text-white">
                    {item.id === 'coaching' ? 'BOOK COACH →' : 'VIEW SCHEDULE →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

