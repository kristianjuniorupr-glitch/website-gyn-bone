import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function Pricing({ onOpenJoinModal }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const [hoveredId, setHoveredId] = useState(null);

  const plans = [
    {
      id: 'open-floor',
      name: 'OPEN FLOOR',
      monthlyPrice: 39,
      yearlyPrice: 390,
      description: 'Ideal for independent lifters seeking top-grade equipment.',
      features: [
        'Full gym access during all open hours',
        'Open hours 5am - 11pm daily + private lockers',
        'One free intake assessment & movement screen',
        'Recovery lounge and high-speed WiFi access'
      ],
      highlight: false
    },
    {
      id: 'all-access',
      name: 'ALL ACCESS',
      monthlyPrice: 79,
      yearlyPrice: 790,
      description: 'Our flagship plan for athletes who thrive in coached group intensity.',
      badge: 'MOST POPULAR',
      features: [
        'Everything in Open Floor',
        'Unlimited group coached classes daily',
        'COREX Training App access with logged lift history',
        'Monthly physical progress & body composition check-in',
        'Priority 7-day advance booking window'
      ],
      highlight: true
    },
    {
      id: 'coached',
      name: 'COACHED',
      monthlyPrice: 189,
      yearlyPrice: 1890,
      description: 'Full personal coaching integration with custom programming and nutrition.',
      features: [
        'Everything in All Access',
        'Weekly 1-on-1 private coaching sessions',
        'Custom biomechanical athlete programming',
        'Tailored nutrition & macro plan with adjustments',
        'Direct 24/7 coach messaging support'
      ],
      highlight: false
    }
  ];

  return (
    <section className="bg-white py-24 sm:py-32 border-t border-zinc-200" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline & Billing Toggle */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-xs font-semibold uppercase tracking-widest text-brand-crimson mb-2">
            TRANSPARENT MEMBERSHIPS
          </span>
          <h2 className="font-headline text-6xl sm:text-7xl uppercase text-zinc-950 tracking-tight mb-6 select-none">
            NO CONTRACTS NO EXCUSES
          </h2>

          {/* Billing Pill */}
          <div className="inline-flex items-center bg-zinc-100 p-1.5 rounded-full border border-zinc-300">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-full transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              MONTHLY
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              YEARLY
              <span className="bg-brand-crimson text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards 3-tier */}
        <div 
          onMouseLeave={() => setHoveredId(null)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4"
        >
          {plans.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const period = billingCycle === 'yearly' ? '/yr' : '/mo';
            // Jika ada card yang dihover/sentuh, card tersebut yang aktif merah;
            // dan card ALL ACCESS ikut berubah putih ketika card lain yang disentuh/hover.
            const activeId = hoveredId !== null ? hoveredId : 'all-access';
            const isRed = plan.id === activeId;

            return (
              <div 
                key={plan.id}
                onMouseEnter={() => setHoveredId(plan.id)}
                onTouchStart={() => setHoveredId(plan.id)}
                onClick={() => setHoveredId(plan.id)}
                className={`group rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 transform relative cursor-pointer ${
                  isRed
                    ? 'bg-brand-crimson text-white border-2 border-brand-crimsonHover shadow-2xl -translate-y-2 scale-[1.02]'
                    : 'bg-white text-zinc-900 border border-zinc-200 shadow-sm hover:border-zinc-300 scale-100'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.badge && (
                  <div className={`absolute -top-3.5 right-6 text-[10px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full shadow-lg border transition-colors duration-300 ${
                    isRed
                      ? 'bg-black text-white border-white/20'
                      : 'bg-brand-crimson text-white border-brand-crimsonHover'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className={`font-headline text-3xl uppercase mb-2 transition-colors duration-300 ${
                    isRed ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {plan.name}
                  </h3>
                  
                  <p className={`text-xs mb-6 transition-colors duration-300 ${
                    isRed ? 'text-white/80' : 'text-zinc-500'
                  }`}>
                    {plan.description}
                  </p>

                  <div className="flex items-baseline mb-6">
                    <span className={`font-headline text-6xl transition-colors duration-300 ${
                      isRed ? 'text-white' : 'text-zinc-950'
                    }`}>
                      ${price}
                    </span>
                    <span className={`text-xs font-semibold uppercase tracking-wider ml-1 transition-colors duration-300 ${
                      isRed ? 'text-white/70' : 'text-zinc-500'
                    }`}>
                      {period}
                    </span>
                  </div>

                  <ul className={`space-y-4 text-xs font-medium border-t pt-6 transition-colors duration-300 ${
                    isRed 
                      ? 'text-zinc-100 border-white/20' 
                      : 'text-zinc-600 border-zinc-100'
                  }`}>
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isRed 
                            ? 'bg-white/20 text-white' 
                            : 'bg-brand-crimson/10 text-brand-crimson'
                        }`}>
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenJoinModal(plan.id, billingCycle);
                    }}
                    className={`w-full text-xs font-bold uppercase tracking-widest py-3.5 rounded-full transition-all duration-300 active:scale-95 shadow-lg ${
                      isRed
                        ? 'bg-white hover:bg-zinc-100 text-zinc-950 shadow-xl'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                    }`}
                  >
                    CHOOSE {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
