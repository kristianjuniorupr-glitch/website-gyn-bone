import React, { useState } from 'react';
import { subscribeNewsletter } from '../services/api';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

export default function Newsletter({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setSubscribed(true);
        setEmail('');
        onShowToast({
          type: 'success',
          message: res.message || 'Subscribed to the Weekly Training Note!'
        });
      }
    } catch (err) {
      onShowToast({
        type: 'error',
        message: err.message || 'Subscription failed. Please check your email.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-white/5 border border-white/10">
              <Mail className="w-5 h-5 text-brand-crimson" />
            </div>
            <div>
              <h3 className="font-headline text-2xl sm:text-3xl uppercase tracking-wider text-white">
                GET THE WEEKLY TRAINING NOTE
              </h3>
              <p className="text-[11px] text-zinc-400">
                Lifting biomechanics, recovery protocols, and floor updates every Sunday.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto max-w-md items-center gap-2 border-b border-white/30 pb-1">
            <input 
              className="bg-transparent text-white placeholder-zinc-500 text-xs py-2 px-1 focus:outline-none w-full border-0 focus:ring-0" 
              placeholder="your@email.com" 
              required 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button 
              className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-[11px] uppercase tracking-widest px-5 py-2 rounded-full transition flex items-center gap-1.5 shrink-0 active:scale-95 disabled:opacity-50" 
              type="submit"
              disabled={loading}
            >
              {loading && <Loader2 className="w-3 h-3 animate-spin" />}
              {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

