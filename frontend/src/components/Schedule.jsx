import React, { useState, useEffect } from 'react';
import { fetchSchedules } from '../services/api';
import { Clock, Users, User, RefreshCw, AlertCircle, CheckCircle2, Search } from 'lucide-react';

export default function Schedule({ onBookClass, refreshTrigger, activeCategory = 'ALL', onCategoryChange }) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const [activeDay, setActiveDay] = useState('MON');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(activeCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync with external category if updated
  useEffect(() => {
    if (activeCategory) {
      setCategoryFilter(activeCategory);
    }
  }, [activeCategory]);

  const handleCategorySelect = (cat) => {
    setCategoryFilter(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  const loadDaySchedule = async (day) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchSchedules(day);
      if (res.success) {
        setSchedules(res.data || []);
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to live schedule server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDaySchedule(activeDay);
  }, [activeDay, refreshTrigger]);

  const categories = ['ALL', 'Strength', 'Conditioning', 'Hypertrophy', 'Cardio', 'Olympic', 'Recovery'];

  const filteredSchedules = schedules.filter(item => {
    const matchesCategory = categoryFilter === 'ALL' || (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) || 
      item.coach.toLowerCase().includes(query) || 
      item.time.includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-brand-charcoal text-white pt-4 sm:pt-6 pb-8 sm:pb-10 border-t border-brand-borderDark scroll-mt-20" id="schedule">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 gap-3">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-brand-crimson mb-0.5">
              CLASS SCHEDULE
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-none">
              THIS WEEK ON THE FLOOR.
            </h2>
          </div>
          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Real-time live floor availability
          </div>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 text-xs font-semibold tracking-wider uppercase border-b border-brand-borderDark scrollbar-none">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap font-bold text-xs ${
                activeDay === day
                  ? 'bg-brand-crimson text-white shadow-md shadow-brand-crimson/30'
                  : 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Category Filters & Quick Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-brand-borderDark/40">
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-medium tracking-wider uppercase scrollbar-none">
            <span className="text-zinc-500 font-bold mr-1">FILTER:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-2.5 py-0.5 sm:py-1 rounded-full border transition whitespace-nowrap text-[11px] ${
                  categoryFilter === cat
                    ? 'border-brand-crimson bg-brand-crimson/20 text-white font-bold'
                    : 'border-white/10 hover:border-white/30 text-zinc-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Real-time Search Input */}
          <div className="relative w-full sm:w-60 shrink-0">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search class or coach..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-full pl-8 pr-4 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Schedule Table Container */}
        <div className="bg-[#0e0e11]/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-zinc-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-brand-crimson" />
              <p className="text-xs tracking-widest uppercase font-semibold">Updating floor status...</p>
            </div>
          ) : error ? (
            <div className="py-16 px-6 text-center text-zinc-400">
              <AlertCircle className="w-8 h-8 text-brand-crimson mx-auto mb-3" />
              <p className="text-sm font-semibold text-white mb-2">{error}</p>
              <button
                onClick={() => loadDaySchedule(activeDay)}
                className="mt-3 text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full uppercase tracking-wider"
              >
                Try Again
              </button>
            </div>
          ) : filteredSchedules.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 text-xs uppercase tracking-wider">
              No sessions scheduled for this category on {activeDay}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-white/10 bg-white/[0.02]">
                    <th className="py-2.5 px-4 font-medium">TIME</th>
                    <th className="py-2.5 px-4 font-medium">CLASS</th>
                    <th className="py-2.5 px-4 font-medium">COACH</th>
                    <th className="py-2.5 px-4 font-medium">AVAILABILITY</th>
                    <th className="py-2.5 px-4 text-right font-medium">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredSchedules.map((item) => {
                    const spotsLeft = item.spotsLeft !== undefined ? item.spotsLeft : (item.totalSpots - item.bookedSpots);
                    const isFull = spotsLeft <= 0;
                    const isFew = spotsLeft > 0 && spotsLeft <= 3;

                    return (
                      <tr key={item.id} className="hover:bg-white/[0.03] transition duration-150">
                        <td className="py-3 px-4 font-mono text-xs text-zinc-300 font-bold whitespace-nowrap">
                          {item.time}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-white tracking-wide text-xs sm:text-sm">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-[10px] text-zinc-400 hidden sm:block max-w-sm mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-zinc-300 whitespace-nowrap text-xs">
                          {item.coach}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {isFull ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-red-950/60 text-red-400 border border-red-800/40">
                              Class Full
                            </span>
                          ) : isFew ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                              {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                            </span>
                          ) : (
                            <span className="text-xs text-zinc-400">
                              {spotsLeft} spots available
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            disabled={isFull}
                            onClick={() => onBookClass(item)}
                            className={`text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full transition-all duration-200 active:scale-95 ${
                              isFull
                                ? 'bg-zinc-800/40 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                                : 'border border-white/20 hover:border-white hover:bg-white hover:text-zinc-950 text-white'
                            }`}
                          >
                            {isFull ? 'WAITLIST' : 'BOOK'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Schedule Helper Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
          <p>
            * All morning sessions start promptly. Arrive 10 minutes prior for joint warm-ups.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Limited spots
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Open spots
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

