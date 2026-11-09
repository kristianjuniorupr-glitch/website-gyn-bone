import React, { useState, useEffect } from 'react';
import { fetchFAQs } from '../services/api';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(1); // Default item 1 open

  useEffect(() => {
    fetchFAQs()
      .then((res) => {
        if (res.success && res.data) setFaqs(res.data);
      })
      .catch((err) => console.error('Error fetching FAQs:', err));
  }, []);

  const defaultFaqs = [
    {
      id: 1,
      question: 'Can I join without experience?',
      answer: 'Yes. Every new member starts with a free intake assessment so we can meet you where you are and establish solid baseline movement mechanics.'
    },
    {
      id: 2,
      question: 'Can I cancel any time?',
      answer: 'Yes! We stand firmly behind "No Contracts, No Excuses". All our monthly memberships can be paused or cancelled at any time through our member portal or front desk with just 7 days notice prior to your next billing cycle.'
    },
    {
      id: 3,
      question: 'How do I book a class?',
      answer: 'You can book classes directly on this website or through the member dashboard up to 7 days in advance. Live spot availability updates automatically.'
    },
    {
      id: 4,
      question: 'Do you offer day passes?',
      answer: 'Yes, single day passes are available for $20 (includes full open floor access) or $30 for a drop-in coached class. If you join on the same day, your day pass fee is credited toward your first month!'
    },
    {
      id: 5,
      question: 'Is there parking and are there showers?',
      answer: 'Yes! We have 40 dedicated on-site parking spaces directly in front of the facility. Inside, we provide private rain showers, luxury changing rooms, hairdryers, and complimentary lockers.'
    },
    {
      id: 6,
      question: 'What should I bring on day one?',
      answer: 'Just bring comfortable training clothes, flat-soled athletic shoes (or lifting shoes), a water bottle, and a small sweat towel. We provide all lifting chalk, belts, bands, and equipment on the floor.'
    }
  ];

  const items = faqs.length > 0 ? faqs : defaultFaqs;

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white pt-4 sm:pt-6 pb-8 sm:pb-10 border-t border-zinc-200 scroll-mt-20" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left Title */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-3">
              <span className="block text-[11px] font-bold uppercase tracking-widest text-brand-crimson">
                FAQ & ASSISTANCE
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-zinc-950 tracking-tight leading-none select-none">
                QUESTIONS<br />BEFORE YOU<br />START?
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm max-w-sm leading-relaxed">
                Have a question that is not covered here? Feel free to reach out to our coaches directly or visit our facility.
              </p>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-7 divide-y divide-zinc-200">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-3.5 sm:py-4" data-purpose="faq-item">
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wide group-hover:text-brand-crimson transition-colors">
                      {item.question}
                    </h4>
                    <span className="text-xl font-light text-zinc-400 group-hover:text-zinc-900 transition ml-4 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4 text-brand-crimson" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl animate-in fade-in duration-200">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

