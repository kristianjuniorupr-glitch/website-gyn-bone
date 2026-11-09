import React, { useState, useEffect } from 'react';

export default function QuoteBanner() {
  const quotes = [
    {
      text: '“I STOPPED GUESSING AND STARTED GETTING STRONGER EVERY SINGLE WEEK.”',
      author: 'ALI K.',
      detail: 'Member for 18 months',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANWr4-wPj5ls0G734dsVTfHM9KcX09JiRMojnKUqNgpLMBc48oCw2gCGpQVpT4WgkXhl6RIm1QepN6pLAIj18zWNHZUMnUxC_9_yqCHBBas0Vth0SlwpvXPzalmiQ2SbiwiC7XpWVlcFVCGQ59skWAC2xvX03ojDDySO-uCF8xNe3xDae322TaFpO3kjvwKrXJnKKtzBidhyO5TuBkxV-Ha7j2fxqmfejXtluEl-kQ'
    },
    {
      text: '“THE COACHING CUES HERE FIXED MY HIP IMPINGEMENT IN 3 WEEKS FLAT.”',
      author: 'SARAH T.',
      detail: 'Member for 9 months',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUb9QxINPuy7oFWJLdAVY9LuQoIKmGyUb0jYd4QNKrKxWvifkRXQI0KyOEEes_vzDKF5uV2PYCKRr1wMvXTMrOcNSnB4CFRj7Sx2jSlYXCihLuUSrcRHnMImoc2qD8j06DxBPYzQ7Z8B6r1ksHFn4IiHtm-xXTCoy6bRWdnwb6pE132nha46nudl-FiSGU7NrxEfrLygJd4sSoa4GI9rvQ69g_T9uzbuQxdhwLsBTc'
    },
    {
      text: '“NO FLUFF, NO INFLUENCERS POSING. JUST REAL WORK AND SERIOUS RESULTS.”',
      author: 'MICHAEL B.',
      detail: 'Member for 2 years',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB79Sze41nnEl1T41AM5qP_d6I8ZUc5JwBRDQ5ZpV2kM2NRxB9m7kEAu9A7xQahXsCPdG71tzaNnDpgXxJLf-1Rs26M69cz-sC-zyr5HuVIDR9NBCCYOoSGkc-F0ICksFvdpjjWbABrgtjENuT_r9rj8-2QfJ34ux-aH6dhRd0nNtffjOPVw6JcqmIvzF-DcFzKeZ7VIXiTJbY8XcKV_HTVpA7f1R6CTyTgzBWYot_7'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  const activeQuote = quotes[currentIndex];

  return (
    <section className="bg-gradient-to-r from-brand-crimson to-brand-crimsonHover text-white py-20 px-4 text-center select-none relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6 relative z-10 transition-all duration-500">
        <p className="font-headline text-3xl sm:text-5xl md:text-6xl tracking-wide uppercase leading-tight">
          {activeQuote.text}
        </p>

        <div className="flex items-center justify-center gap-3 pt-2">
          <img 
            alt={activeQuote.author} 
            className="h-10 w-10 rounded-full border-2 border-white/50 object-cover" 
            src={activeQuote.image} 
          />
          <div className="text-left">
            <div className="text-xs font-bold uppercase tracking-wider leading-tight">
              {activeQuote.author}
            </div>
            <div className="text-[10px] text-white/80 font-medium">
              {activeQuote.detail}
            </div>
          </div>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

