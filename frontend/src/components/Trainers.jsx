import React, { useState, useEffect } from 'react';
import { fetchTrainers } from '../services/api';
import { ArrowRight } from 'lucide-react';

export default function Trainers({ onOpenConsultModal }) {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers()
      .then(res => {
        if (res.success && res.data) setTrainers(res.data);
      })
      .catch(err => console.error('Error fetching trainers:', err));
  }, []);

  // Fallback trainers if API is initializing
  const displayTrainers = trainers.length > 0 ? trainers : [
    {
      id: 'ned-chen',
      name: 'NED CHEN',
      role: 'HEAD OF PROGRAMMING',
      specialty: 'Barbell Fundamentals & Periodization',
      experience: '10+ Yrs Exp',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS9RsVqIAUuJhUra4t7xxD5LIVE8hdRGDjuP2ZdWDsd38eJJdSF0pDjft4s_AGe5YUIl2Pc2I_vK70IK_yrYdWqHs-8hqLS7qb9cS0KLPj39MnJpgpE-el34fuS-5adhgwttYw6cnigqnzVl9A7xOAuGpv77fxN-8AixM5x_myKEcrW6rlSfhTdmtCnCMemC0apH4hvsmPVjAy_on2O9luzDhKXZGNMQC61WB1UPll'
    },
    {
      id: 'marcus-vance',
      name: 'MARCUS VANCE',
      role: 'CONDITIONING LEAD',
      specialty: 'Aerobic Capacity & Engine Building',
      experience: '8 Yrs Exp',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2cRYhZdiqHjl179AMjsigS2zqsxcZIB6o0-BLAKCdS1MuoZcRuT33fWFPYAiDNMs7xWUf0ldsgIK1PNb69TXzgv00aKst2hQ8EwnhaMKZJ7fOzKLpZILD2W81uqBntmYHUYU35nx0jA3A_L0OdOA7HbuB2KtUgZOAF53qCncMCQcz116uIsPZVMy7vDyTE8W4lhFBQzsX7hYGKdpOtqP9-zwyjwOqf72CBDwRRle'
    },
    {
      id: 'diego-ortiz',
      name: 'DIEGO ORTIZ',
      role: 'OLYMPIC WEIGHTLIFTING',
      specialty: 'Snatch, Clean & Jerk Precision',
      experience: 'Olympic Coach',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8eQNvZPO4RkddihkfPruAh6Hf3hfOtx3wlpDdAzZuE-falApKrwl5aKas3a0DSLkssE0Y1TWQhWnMGPegyJH4k8736kPWdm6JSRlk-zgSQeqWkn2xH3LQcrXtelQoMazcPTIbUermPCCpwgEML21Wb7H2fCPjJ-d9V-WuLMjBLmCOwPC4TPASm8ADxFqQN-JDX1EVmjR-jREI_S4gDoVDKk6EwtH_gHHDhgon6mFa'
    },
    {
      id: 'frank-reyes',
      name: 'FRANK REYES',
      role: 'MOBILITY & RECOVERY',
      specialty: 'Prehab, Movement Screen & Joint Care',
      experience: 'DPT Specialist',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-zT0EfctECeVS2i3yyhURmjsQJ03MCmjkj9lG4cmiTsOeRRT4P8yiemPmklj8L8jWF3Lj5pM9Hp0kUhoAT7tmis-dp2D1r3GPUWKorwnWn2DOJ2pHWsKUOT_AaiUTgFY5d89jZSRbirqPBIY36WO9U8TPZtC3UNmL_AoEIsYmTcMPStAImy9-5IvyvjEbTu4yFa_f1MHfmpeHOQJw7K5UDpntzZyVtwX1KDOiqZlL'
    }
  ];

  return (
    <section className="bg-white pt-4 sm:pt-6 pb-8 sm:pb-10 border-t border-zinc-200 scroll-mt-20" id="trainers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 gap-2 sm:gap-4">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-brand-crimson mb-0.5">
              COACHING STAFF
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl uppercase text-zinc-950 tracking-tight leading-none">
              THE PEOPLE WHO PROGRAM YOU
            </h2>
          </div>
          <button
            onClick={() => onOpenConsultModal()}
            className="text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-brand-crimson border-b-2 border-zinc-900 hover:border-brand-crimson pb-0.5 inline-flex items-center gap-1 self-start sm:self-end transition shrink-0"
          >
            REQUEST 1-ON-1 COACHING
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Coach Gallery 4 Columns - Proportional & Fully In-View Without Scrolling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayTrainers.map((coach) => (
            <div 
              key={coach.id} 
              className="overflow-hidden rounded-xl bg-zinc-50 group border border-zinc-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container: Proportional height so card and text are 100% visible on screen */}
              <div className="h-36 sm:h-40 lg:h-44 overflow-hidden relative bg-zinc-900 shrink-0">
                <img 
                  alt={coach.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0" 
                  src={coach.image} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              {/* Compact Information Box */}
              <div className="p-3 sm:p-3.5 bg-white flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-headline text-lg sm:text-xl text-zinc-900 tracking-wide uppercase leading-tight">
                    {coach.name}
                  </h4>
                  <p className="text-[10px] font-bold text-brand-crimson tracking-wider uppercase mt-0.5 mb-1">
                    {coach.role}
                  </p>
                  {coach.specialty && (
                    <p className="text-[11px] text-zinc-600 line-clamp-1 leading-snug">
                      {coach.specialty}
                    </p>
                  )}
                </div>

                <div className="pt-2 mt-2 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase">
                    {coach.experience || 'Senior Coach'}
                  </span>
                  <button
                    onClick={() => onOpenConsultModal(coach)}
                    className="text-[11px] font-bold uppercase tracking-wider text-brand-crimson hover:underline cursor-pointer"
                  >
                    CONSULT &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
