import React, { useState } from 'react';
import { joinMembership } from '../services/api';
import { X, CheckCircle2, AlertCircle, Loader2, CreditCard, Shield } from 'lucide-react';

export default function JoinModal({ initialPlan = 'all-access', initialBilling = 'monthly', onClose, onSuccess }) {
  const [planId, setPlanId] = useState(initialPlan);
  const [billingCycle, setBillingCycle] = useState(initialBilling);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmedMember, setConfirmedMember] = useState(null);

  const plans = [
    { id: 'open-floor', name: 'OPEN FLOOR', monthly: 39, yearly: 390 },
    { id: 'all-access', name: 'ALL ACCESS', monthly: 79, yearly: 790 },
    { id: 'coached', name: 'COACHED', monthly: 189, yearly: 1890 }
  ];

  const currentPlan = plans.find(p => p.id === planId) || plans[1];
  const activePrice = billingCycle === 'yearly' ? currentPlan.yearly : currentPlan.monthly;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }

    try {
      setLoading(true);
      const res = await joinMembership({
        planId: currentPlan.id,
        name,
        email,
        phone,
        billingCycle
      });

      if (res.success) {
        setConfirmedMember(res.member);
        onSuccess(res.message);
      }
    } catch (err) {
      setError(err.message || 'Membership registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-[#141417] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-white text-left">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedMember ? (
          /* Member Card Activated */
          <div className="text-center space-y-6 py-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                MEMBERSHIP ACTIVATED
              </span>
              <h3 className="font-headline text-3xl uppercase tracking-wide text-white mt-1">
                WELCOME TO GYM BONE
              </h3>
            </div>

            {/* Virtual Membership Badge */}
            <div className="bg-gradient-to-br from-[#800f1e] to-[#141417] border border-brand-crimson/50 rounded-2xl p-6 text-left shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-headline text-2xl tracking-wider block text-white">GYM BONE ATHLETE</span>
                  <span className="text-[10px] text-zinc-300 uppercase tracking-widest">{confirmedMember.planName} • {confirmedMember.billingCycle}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase block">ID CODE</span>
                  <span className="font-mono text-xs font-bold text-white bg-black/40 px-2.5 py-1 rounded border border-white/10">
                    {confirmedMember.id}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold text-white">{confirmedMember.name}</p>
                <p className="text-xs text-zinc-300 font-mono">{confirmedMember.email}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-zinc-400">
                <span>STATUS: ACTIVE</span>
                <span>NO LOCK-IN CONTRACT</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Your member profile has been registered in the system. Show this ID at the front desk for your locker key & access fob!
            </p>

            <button
              onClick={onClose}
              className="w-full bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest py-3 rounded-full transition"
            >
              FINISH
            </button>
          </div>
        ) : (
          /* Registration Form */
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-crimson block mb-1">
                MEMBERSHIP ONBOARDING
              </span>
              <h3 className="font-headline text-3xl uppercase text-white tracking-wide">
                JOIN GYM BONE TODAY
              </h3>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-brand-crimson/50 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Plan Selector Radio Cards */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {plans.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPlanId(p.id)}
                  className={`p-3 rounded-xl border text-center transition ${
                    planId === p.id
                      ? 'border-brand-crimson bg-brand-crimson/20 text-white font-bold'
                      : 'border-white/10 bg-[#0e0e11] text-zinc-400 hover:border-white/30'
                  }`}
                >
                  <span className="font-headline text-lg block uppercase leading-tight">{p.name}</span>
                  <span className="text-[11px] font-mono block mt-1 text-zinc-300">
                    ${billingCycle === 'yearly' ? p.yearly : p.monthly}
                  </span>
                </button>
              ))}
            </div>

            {/* Billing Cycle Pill */}
            <div className="flex items-center justify-between bg-[#0e0e11] p-1.5 rounded-xl border border-white/10 mb-5 text-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-1.5 rounded-lg font-bold uppercase tracking-wider transition ${
                  billingCycle === 'monthly' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400'
                }`}
              >
                Monthly (${currentPlan.monthly}/mo)
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`flex-1 py-1.5 rounded-lg font-bold uppercase tracking-wider transition ${
                  billingCycle === 'yearly' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400'
                }`}
              >
                Yearly (${currentPlan.yearly}/yr -20%)
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sameer Hossain"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sameer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Phone (WhatsApp notification)
                </label>
                <input
                  type="tel"
                  placeholder="+880 1700 123 456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-full transition shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'ACTIVATING MEMBERSHIP...' : `CONFIRM ${currentPlan.name} • $${activePrice}`}
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 text-center">
                30-day money back guarantee. Cancel anytime without penalty.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

