import React from 'react';

export default function Ticker() {
  const items = [
    'STRENGTH',
    'CONDITIONING',
    'HYPERTROPHY',
    'MOBILITY',
    'OLYMPIC LIFTING',
    'BOXING',
    'RECOVERY'
  ];

  // Repeat for continuous seamless animation
  const loopList = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-black border-y border-white/10 py-3.5 overflow-hidden select-none" data-purpose="infinite-running-ticker">
      <div className="ticker-track text-xs font-headline tracking-widest text-zinc-300 uppercase space-x-8">
        {loopList.map((item, index) => (
          <React.Fragment key={index}>
            <span className="hover:text-brand-crimson transition-colors cursor-default">{item}</span>
            <span className="text-brand-crimson select-none">•</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

