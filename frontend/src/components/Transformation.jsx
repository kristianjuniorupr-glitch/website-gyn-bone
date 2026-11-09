import React, { useState } from 'react';
import { Columns, ArrowLeftRight, Sparkles, TrendingDown, Dumbbell, Award } from 'lucide-react';
import beforeImg from '../assets/transformation-before.jpg';
import afterImg from '../assets/transformation-after.jpg';

export default function Transformation() {
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' | 'slider'
  const [sliderPos, setSliderPos] = useState(50);

  const current = {
    id: 'sameer',
    quote: '“I CAME IN WANTING LESS PAIN. I STAYED BECAUSE I LEARNED WHAT STRONG ACTUALLY FEELS LIKE.”',
    author: 'SAMEER HOSSAIN',
    meta: 'TRAINED AT COREX • 22 WEEKS RECOMPOSITION',
    stat1: '-18kg Body Fat',
    stat2: '+65kg Deadlift',
    stat3: '11.8% Body Fat',
    beforeNotes: 'Sedentary baseline • Chronic fatigue • Low stamina',
    afterNotes: 'Visible abs • Athletic conditioning • Peak strength'
  };

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  return (
    <section className="bg-[#0e0e11] py-24 sm:py-32 border-t border-white/10 text-white relative overflow-hidden select-none" id="transformation">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-crimson/15 blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-brand-crimson uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          REAL ATHLETE TRANSFORMATION
        </div>

        {/* Big Decorative Quote Icon */}
        <div className="flex justify-center mb-1">
          <span className="font-headline text-8xl text-brand-crimson/40 leading-none select-none">“</span>
        </div>

        {/* Quote */}
        <blockquote className="font-headline text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-wide leading-tight max-w-4xl mx-auto mb-4 drop-shadow-md">
          {current.quote}
        </blockquote>

        {/* Author & Meta */}
        <cite className="block not-italic text-xs sm:text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-8">
          <span className="text-white font-bold">{current.author}</span> — <span className="text-brand-crimson">{current.meta}</span>
        </cite>

        {/* Key Stats Bar */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-10 text-xs sm:text-sm font-bold tracking-wider uppercase">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300">Fat Loss:</span>
            <span className="text-emerald-400 font-extrabold">{current.stat1}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Dumbbell className="w-4 h-4 text-brand-crimson" />
            <span className="text-zinc-300">Strength Gain:</span>
            <span className="text-brand-crimson font-extrabold">{current.stat2}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-zinc-300">Final Physique:</span>
            <span className="text-amber-400 font-extrabold">{current.stat3}</span>
          </div>
        </div>

        {/* View Switcher: Side-by-Side vs Interactive Slider */}
        <div className="inline-flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10 mb-10 backdrop-blur-md">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-brand-crimson text-white shadow-lg shadow-brand-crimson/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            Side by Side
          </button>
          <button
            onClick={() => setViewMode('slider')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              viewMode === 'slider'
                ? 'bg-brand-crimson text-white shadow-lg shadow-brand-crimson/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Interactive Slider
          </button>
        </div>

        {/* Transformation Display - Clean Grid without black shape box */}
        {viewMode === 'side-by-side' ? (
          /* Side-by-Side Clean Grid: Completely static on cursor, no crop */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              
              {/* Before Frame: Static, Uncropped, Full Height */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  alt="Before Transformation" 
                  className="w-full h-auto object-contain block select-none pointer-events-none transform-none" 
                  src={beforeImg} 
                />
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="bg-brand-crimson text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg border border-white/20">
                    BEFORE
                  </span>
                </div>
              </div>

              {/* After Frame: Static, Uncropped, Full Height */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  alt="After Transformation" 
                  className="w-full h-auto object-contain block select-none pointer-events-none transform-none" 
                  src={afterImg} 
                />
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                  <span className="bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg border border-emerald-400/40">
                    AFTER (WEEK 22)
                  </span>
                </div>
              </div>

            </div>

            {/* Clean Notes Below Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-5 text-xs font-medium text-zinc-400">
              <div className="text-center sm:text-left px-2">
                <span className="text-brand-crimson font-bold uppercase tracking-wider block mb-1">Baseline Phase</span>
                {current.beforeNotes}
              </div>
              <div className="text-center sm:text-right px-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block mb-1">Results (Week 22)</span>
                {current.afterNotes}
              </div>
            </div>
          </div>
        ) : (
          /* Interactive Comparison Slider: Clean, Uncropped, Static */
          <div className="max-w-md mx-auto">
            <div 
              className="relative aspect-[511/1024] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-2xl"
              onMouseMove={handleSliderMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Full background) */}
              <img 
                src={afterImg} 
                alt="After Transformation" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />

              {/* Before Image (Clipped overlay) */}
              <div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img 
                  src={beforeImg} 
                  alt="Before Transformation" 
                  className="absolute inset-0 w-full h-full object-contain max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              {/* Slider Divider Line */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Center Handle Button */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand-crimson border-2 border-white flex items-center justify-center shadow-2xl">
                  <ArrowLeftRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="bg-brand-crimson/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  BEFORE
                </span>
              </div>
              <div className="absolute top-4 right-4 pointer-events-none">
                <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  AFTER
                </span>
              </div>

              {/* Drag instruction overlay hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-[10px] font-bold tracking-widest uppercase text-zinc-300 pointer-events-none">
                &larr; Drag or hover to compare &rarr;
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
