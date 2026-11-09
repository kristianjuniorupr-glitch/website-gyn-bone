import React from 'react';
import { ArrowUpRight, Flame } from 'lucide-react';
import heroAthleteTransparent from '../assets/hero-athlete-transparent.png';

export default function Hero({ onOpenJoinModal, onOpenConsultModal }) {
  return (
    <section 
      className="relative w-full min-h-[640px] sm:min-h-[720px] lg:h-[780px] xl:h-[840px] bg-[#3a060d] text-white overflow-hidden flex flex-col justify-between select-none" 
      id="home"
    >
      {/* 1. Dynamic Crimson Gradient Background with Diagonal Streaks */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 56% 42%, #8b1424 0%, #630c18 45%, #38060d 75%, #150204 100%)',
        }}
      />

      {/* Subtle dynamic diagonal speed lines / texture matching reference */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 35px, transparent 35px, transparent 110px)'
        }}
      />

      {/* Radial backlight glow behind athlete */}
      <div className="absolute bottom-16 left-1/2 -translate-x-[40%] w-[550px] h-[550px] bg-red-600/25 blur-[140px] pointer-events-none rounded-full" />

      {/* 2. Athlete Cutout - Lowered to thigh level to cleanly hide uneven bottom crop */}
      <div className="absolute -bottom-16 sm:-bottom-24 md:-bottom-32 lg:-bottom-44 xl:-bottom-52 left-1/2 -translate-x-[42%] lg:left-[51%] lg:-translate-x-[36%] xl:left-[51%] xl:-translate-x-[34%] z-10 flex justify-center pointer-events-none">
        <img 
          src={heroAthleteTransparent} 
          alt="GYM BONE Athlete Performing Heavy Dumbbell Row" 
          className="h-[620px] sm:h-[720px] md:h-[820px] lg:h-[940px] xl:h-[1020px] w-auto max-w-none object-contain select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter contrast-[1.04] brightness-100 transition-transform duration-700 ease-out hover:scale-[1.02]"
        />
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between py-8 sm:py-10 lg:py-14 flex-1">
        
        {/* Top Row: Headline (Left) & 1K+ Members Avatar Stack (Right) */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          {/* Main Headline */}
          <div className="max-w-xl">
            <h1 className="font-headline text-7xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[156px] tracking-tight leading-[0.86] uppercase text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              FUEL BUILD<br />PERFORM
            </h1>
          </div>

          {/* Top Right: 1K+ Members Stack */}
          <div className="flex items-center gap-3 bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl self-start sm:self-auto shrink-0 mt-1">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img 
                alt="Member 1" 
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUb9QxINPuy7oFWJLdAVY9LuQoIKmGyUb0jYd4QNKrKxWvifkRXQI0KyOEEes_vzDKF5uV2PYCKRr1wMvXTMrOcNSnB4CFRj7Sx2jSlYXCihLuUSrcRHnMImoc2qD8j06DxBPYzQ7Z8B6r1ksHFn4IiHtm-xXTCoy6bRWdnwb6pE132nha46nudl-FiSGU7NrxEfrLygJd4sSoa4GI9rvQ69g_T9uzbuQxdhwLsBTc" 
              />
              <img 
                alt="Member 2" 
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB79Sze41nnEl1T41AM5qP_d6I8ZUc5JwBRDQ5ZpV2kM2NRxB9m7kEAu9A7xQahXsCPdG71tzaNnDpgXxJLf-1Rs26M69cz-sC-zyr5HuVIDR9NBCCYOoSGkc-F0ICksFvdpjjWbABrgtjENuT_r9rj8-2QfJ34ux-aH6dhRd0nNtffjOPVw6JcqmIvzF-DcFzKeZ7VIXiTJbY8XcKV_HTVpA7f1R6CTyTgzBWYot_7" 
              />
              <img 
                alt="Member 3" 
                className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt6ycWPW52LCOsDvbJDS454KZNRsQhrohBnja0UAIxcyQnpKMG-EGZvNyp7KQcyHt0Kl68qaxuGv8KhVILk1_LjK7wswjdga0Qidw8Cuiwi26G21hpsURTGjCq5B6jC7SnmL0Z-P66fDf76g_pr7MzeDG8Cmx741E0lX-XR-k-a-LaoEH4fAv_CuAlwoU8LEk6fu7mFZCOJByaRc-1qE9EEY2dFesr8aPmNLEGMLGq" 
              />
            </div>
            <div className="text-left">
              <div className="text-[11px] font-bold tracking-wider leading-none uppercase text-white">1K+ MEMBERS</div>
              <div className="text-[10px] text-zinc-300 font-medium tracking-wide uppercase">TRAIN WITH US</div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Narrative Paragraph & Actions (Left) and Highlight Card & CTA (Right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pt-8 lg:pt-0">
          
          {/* Bottom Left Paragraph & CTAs */}
          <div className="max-w-md sm:max-w-lg space-y-4">
            <p className="text-zinc-200 text-xs sm:text-sm font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Athletes and everyday trainers are being asked to push harder, move smarter, and train with purpose — building strength, confidence, and lasting performance.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onOpenJoinModal('all-access')}
                className="bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 shadow-xl shadow-brand-crimson/30 flex items-center gap-2 group active:scale-95 cursor-pointer"
              >
                JOIN NOW
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenConsultModal}
                className="bg-black/45 hover:bg-black/70 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full transition-all duration-300 backdrop-blur-sm active:scale-95 cursor-pointer"
              >
                FREE INTAKE ASSESSMENT
              </button>
            </div>
          </div>

          {/* Bottom Right Highlight Callout & Button */}
          <div className="max-w-[280px] sm:max-w-xs text-left space-y-3 lg:self-end">
            <p className="font-headline text-lg sm:text-xl md:text-2xl text-white tracking-wide uppercase leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              THE ESSENTIAL INGREDIENT FOR STRONGER BODIES AND LASTING RESULTS
            </p>
            
            <button
              onClick={() => onOpenJoinModal('all-access')}
              className="inline-block bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer"
            >
              BECOME A MEMBER
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
