import React from 'react';
import { ArrowUpRight, Flame, ShieldCheck, Dumbbell, Award } from 'lucide-react';
import heroAthleteTransparent from '../assets/hero-athlete-transparent.png';

export default function Hero({ onOpenJoinModal, onOpenConsultModal }) {
  return (
    <section className="relative bg-gradient-to-b from-[#800f1e] via-[#4d0711] to-[#0d0d10] text-white pt-10 pb-20 overflow-hidden" id="home">
      {/* Background athlete silhouette/texture */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7To7uxMRT0LDjGmSvoHj5aIozLcdfBQc9uF8urGT61DHc8DylMEgmYWWsIGqlTZGKmoG3AL0jUpZOEYJzzEdCnZGzs6_cS5vUiTwyukNADWn7_0nBYkd_Q6yaskzBBcM6mZDbMeWa598dbIhLPrp-EmCFVaCZ_Oq0s7y50fPrnUJCm0AYcHDCIoYCLd_vK-Z9_AGRrX607afZ6KSxy1HbFHH1L2jwGLohcnM3b7Od')"
        }}
      />
      
      {/* Decorative gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-crimson/30 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 lg:pt-14">
          {/* Left Hero Text Column with Large Transparent Athlete Cutout */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[11px] font-bold tracking-widest uppercase text-zinc-200">
              <Flame className="w-3.5 h-3.5 text-brand-crimson" />
              STRENGTH & CONDITIONING FACILITY
            </div>

            {/* Headline and 50% Larger Transparent Athlete Side-by-Side */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 lg:gap-8">
              <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl xl:text-9xl tracking-tight leading-[0.88] uppercase text-white drop-shadow-sm select-none shrink-0">
                FUEL BUILD<br />PERFORM
              </h1>

              {/* Transparent Athlete (No Background, 50% Larger, Blended directly with Website) */}
              <div className="relative shrink-0 flex items-center justify-center -my-4 sm:-my-6 lg:-my-8 group">
                {/* Subtle crimson aura behind athlete */}
                <div className="absolute inset-0 bg-brand-crimson/25 blur-3xl rounded-full scale-90 pointer-events-none transition-opacity duration-700 group-hover:bg-brand-crimson/40"></div>

                <img 
                  src={heroAthleteTransparent} 
                  alt="COREX Athlete Performing Heavy Single-Arm Row" 
                  className="relative z-10 w-72 sm:w-80 md:w-96 lg:w-[410px] xl:w-[460px] h-auto object-contain select-none pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_30px_rgba(139,20,36,0.35)] hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Athlete Stat Pill */}
                <div className="absolute -bottom-2 sm:bottom-2 right-0 sm:right-4 z-20 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-crimson/50 text-[10px] font-bold tracking-wider uppercase text-zinc-200 shadow-2xl flex items-center gap-1.5 select-none pointer-events-none">
                  <Flame className="w-3.5 h-3.5 text-brand-crimson shrink-0" />
                  <span>DUMBBELL ROW &bull; 45KG</span>
                </div>
              </div>
            </div>

            <p className="max-w-xl text-zinc-200 text-sm sm:text-base font-normal leading-relaxed">
              Athletes and everyday trainers are being asked to push harder, move smarter, and train with purpose — building strength, confidence, and lasting performance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenJoinModal('all-access')}
                className="bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-brand-crimson/30 flex items-center gap-2 group active:scale-95"
              >
                JOIN THE TRIBE
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenConsultModal}
                className="bg-black/40 hover:bg-black/60 border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                FREE INTAKE ASSESSMENT
              </button>
            </div>
          </div>

          {/* Right Hero Cards & Badge Column */}
          <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end gap-10">
            {/* Avatar Stack Proof */}
            <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 self-start lg:self-end">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  alt="Member avatar 1" 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d0d10] object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUb9QxINPuy7oFWJLdAVY9LuQoIKmGyUb0jYd4QNKrKxWvifkRXQI0KyOEEes_vzDKF5uV2PYCKRr1wMvXTMrOcNSnB4CFRj7Sx2jSlYXCihLuUSrcRHnMImoc2qD8j06DxBPYzQ7Z8B6r1ksHFn4IiHtm-xXTCoy6bRWdnwb6pE132nha46nudl-FiSGU7NrxEfrLygJd4sSoa4GI9rvQ69g_T9uzbuQxdhwLsBTc" 
                />
                <img 
                  alt="Member avatar 2" 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d0d10] object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB79Sze41nnEl1T41AM5qP_d6I8ZUc5JwBRDQ5ZpV2kM2NRxB9m7kEAu9A7xQahXsCPdG71tzaNnDpgXxJLf-1Rs26M69cz-sC-zyr5HuVIDR9NBCCYOoSGkc-F0ICksFvdpjjWbABrgtjENuT_r9rj8-2QfJ34ux-aH6dhRd0nNtffjOPVw6JcqmIvzF-DcFzKeZ7VIXiTJbY8XcKV_HTVpA7f1R6CTyTgzBWYot_7" 
                />
                <img 
                  alt="Member avatar 3" 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0d0d10] object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt6ycWPW52LCOsDvbJDS454KZNRsQhrohBnja0UAIxcyQnpKMG-EGZvNyp7KQcyHt0Kl68qaxuGv8KhVILk1_LjK7wswjdga0Qidw8Cuiwi26G21hpsURTGjCq5B6jC7SnmL0Z-P66fDf76g_pr7MzeDG8Cmx741E0lX-XR-k-a-LaoEH4fAv_CuAlwoU8LEk6fu7mFZCOJByaRc-1qE9EEY2dFesr8aPmNLEGMLGq" 
                />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold tracking-wider leading-none uppercase">750+ MEMBERS</div>
                <div className="text-[10px] text-zinc-400 font-medium tracking-wide">TRAIN WITH US</div>
              </div>
            </div>

            {/* Hero Highlight Card */}
            <div className="bg-black/55 backdrop-blur-md border border-white/15 p-6 rounded-2xl max-w-xs self-start lg:self-end text-left shadow-2xl">
              <p className="font-headline text-lg sm:text-xl text-zinc-100 tracking-wide uppercase leading-tight mb-4">
                THE ESSENTIAL INGREDIENT FOR STRONGER BODIES AND LASTING RESULTS
              </p>
              <button
                onClick={() => onOpenJoinModal('all-access')}
                className="inline-block bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-zinc-200 transition active:scale-95 cursor-pointer"
              >
                BECOME A MEMBER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

