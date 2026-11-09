import React, { useState } from 'react';

export default function Transformation() {
  const stories = [
    {
      id: 'sameer',
      quote: '“I CAME IN WANTING LESS PAIN. I STAYED BECAUSE I LEARNED WHAT STRONG ACTUALLY FEELS LIKE.”',
      author: 'SAMEER HOSSAIN',
      meta: 'TRAINING AT COREX FOR 22 WEEKS',
      stat1: '-14kg Body Fat',
      stat2: '+50kg Deadlift',
      beforeImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuKQNHq5ws15fkzTSO0cxcFXfWY975RJW6Geg-_RcE3Vmenky8tPY-mv2BrR7617bow53XMsQ9pISqEKGPO6wzPXmb-TyElgTmoF8BiU5bd1ZU8XowioFc2Mhj130JYpIQofS_kASsaG5UOR9RUyBV5VMYo6Zf0GhzFR5i_Fn2KhfV8DMA1SXL2T5DRCV8Jr0sL2OMrS8aPzJvsK82tgh0N1XjXiHbKyEf83K4DJZg',
      afterImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL4suQ9YkRP1wrhrnKlx0UGj0TvMqbn0213cdysm2I8Gy8iAo-N38CR9zYv_kByN4cqKoSbsXUGDVVB9ePvhczR0UEG3GD_xgxVOx-hFpYMhnoCKzpeJJQMQM5uTa3qyDgGrZEp9gDx3ewng_2mAIGfWVJMpX5g02RH8YhlR5_mx6uWXNCjviMFph0m3QlyaJot65HnWYNswHHlfF2zl3h7lUBLNJYvs7HQopfRy75'
    }
  ];

  const current = stories[0];

  return (
    <section className="bg-[#f2f2f4] py-24 border-t border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Big Decorative Quote Icon */}
        <div className="flex justify-center mb-4">
          <span className="font-headline text-8xl text-zinc-300 leading-none select-none">“</span>
        </div>

        <blockquote className="font-headline text-3xl sm:text-5xl text-zinc-950 uppercase tracking-wide leading-tight max-w-3xl mx-auto mb-4 select-none">
          {current.quote}
        </blockquote>

        <cite className="block not-italic text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-12">
          {current.author} — <span className="text-zinc-700">{current.meta}</span>
        </cite>

        {/* Side-by-Side Transformation Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto bg-zinc-900 p-4 rounded-2xl shadow-2xl border border-zinc-800">
          {/* Before Frame */}
          <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-zinc-950">
            <img 
              alt={`${current.author} before training`} 
              className="w-full h-full object-cover filter contrast-90" 
              src={current.beforeImg} 
            />
            <div className="absolute top-4 left-4">
              <span className="bg-brand-crimson text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                BEFORE
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-2 rounded-lg text-left text-white text-[11px] font-medium border border-white/10">
              Chronic back stiffness • Sedentary desk hours
            </div>
          </div>

          {/* After Frame */}
          <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-zinc-950">
            <img 
              alt={`${current.author} after training`} 
              className="w-full h-full object-cover" 
              src={current.afterImg} 
            />
            <div className="absolute top-4 right-4">
              <span className="bg-zinc-800/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                AFTER (WEEK 22)
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-2 rounded-lg text-left text-white text-[11px] font-medium border border-white/10 flex justify-between">
              <span>{current.stat1}</span>
              <span className="text-brand-crimson font-bold">{current.stat2}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

