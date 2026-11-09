import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onOpenJoinModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'PROGRAMS', href: '#disciplines' },
    { label: 'SCHEDULE', href: '#schedule' },
    { label: 'TRAINERS', href: '#trainers' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-[#0d0d10]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="flex items-center gap-2 group text-white"
        >
          <span className="w-8 h-8 rounded-full border-2 border-brand-crimson flex items-center justify-center font-headline text-lg font-bold group-hover:scale-110 group-hover:bg-brand-crimson transition-all duration-300">
            C
          </span>
          <span className="font-headline text-3xl tracking-wider text-white">
            COREX
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-widest text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="hover:text-white hover:text-brand-crimson transition-colors py-2 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-crimson group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Header Actions - Pure Public Member Focus */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenJoinModal('all-access')}
            className="bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg shadow-brand-crimson/20 active:scale-95"
          >
            JOIN NOW
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d10] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-xs font-semibold tracking-widest text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="hover:text-white py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenJoinModal('all-access'); }}
              className="w-full bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-semibold uppercase tracking-widest py-3 rounded-full text-center transition"
            >
              JOIN NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
