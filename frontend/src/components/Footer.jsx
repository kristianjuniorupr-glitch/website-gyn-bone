import React from 'react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-headline text-6xl tracking-wider text-white block select-none">
              COREX
            </span>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Strength and conditioning for people who show up. Built for real progress, zero compromise.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                DHAKA • BANGLADESH
              </span>
            </div>
          </div>

          {/* Links: EXPLORE */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              EXPLORE
            </h5>
            <ul className="space-y-2 text-xs text-zinc-300">
              <li>
                <button onClick={() => scrollTo('#about')} className="hover:text-white transition cursor-pointer">
                  About us
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#disciplines')} className="hover:text-white transition cursor-pointer">
                  Programs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#schedule')} className="hover:text-white transition cursor-pointer">
                  Schedule
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#trainers')} className="hover:text-white transition cursor-pointer">
                  Trainers
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#pricing')} className="hover:text-white transition cursor-pointer">
                  Membership
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#faq')} className="hover:text-white transition cursor-pointer">
                  FAQ & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Links: OPENING HOURS */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              OPENING HOURS
            </h5>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex justify-between">
                <span>Mon-Fri</span> <span className="text-zinc-400 font-mono">5am-11pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span> <span className="text-zinc-400 font-mono">6am-9pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span> <span className="text-zinc-400 font-mono">7am-7pm</span>
              </li>
            </ul>
          </div>

          {/* Links: VISIT US */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
              VISIT US
            </h5>
            <address className="not-italic text-xs text-zinc-300 space-y-1 leading-relaxed">
              <p className="font-semibold text-white">16 Foundry Lane</p>
              <p>Dhaka 1205</p>
              <p className="pt-2 text-zinc-400 font-mono">+880 1700 123 456</p>
              <p className="text-zinc-400">hello@corex.fit</p>
            </address>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} COREX STRENGTH CO. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6 uppercase tracking-wider font-semibold text-zinc-400">
            <a className="hover:text-white transition" href="#home">INSTAGRAM</a>
            <a className="hover:text-white transition" href="#home">YOUTUBE</a>
            <a className="hover:text-white transition" href="#home">LINKEDIN</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

