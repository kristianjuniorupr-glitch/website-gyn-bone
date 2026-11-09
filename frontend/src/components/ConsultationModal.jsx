import React, { useState } from 'react';
import { bookConsultation } from '../services/api';
import { X, CheckCircle2, AlertCircle, Loader2, UserCheck } from 'lucide-react';

export default function ConsultationModal({ trainer = null, onClose, onSuccess }) {
  const [trainerId, setTrainerId] = useState(trainer ? trainer.id : 'ned-chen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Squat depth & barbell strength foundation');
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const coaches = [
    { id: 'ned-chen', name: 'Ned Chen — Head of Programming' },
    { id: 'marcus-vance', name: 'Marcus Vance — Conditioning Lead' },
    { id: 'diego-ortiz', name: 'Diego Ortiz — Olympic Weightlifting' },
    { id: 'frank-reyes', name: 'Frank Reyes — Mobility & Recovery' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email) {
      setError('Please provide your name and email address.');
      return;
    }

    try {
      setLoading(true);
      const res = await bookConsultation({
        trainerId,
        name,
        email,
        phone,
        goal,
        preferredDate
      });

      if (res.success) {
        setSubmitted(true);
        onSuccess(res.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to submit consultation request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative max-w-lg w-full bg-[#141417] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-white text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center space-y-5 py-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                REQUEST RECORDED
              </span>
              <h3 className="font-headline text-3xl uppercase tracking-wide text-white mt-1">
                COACH HAS BEEN NOTIFIED
              </h3>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed max-w-md mx-auto">
              Coach will review your background and reach out via WhatsApp/email with a 45-minute intake time slot on {preferredDate}.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest py-3 rounded-full transition"
            >
              DONE
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-crimson block mb-1">
                INTAKE & 1-ON-1
              </span>
              <h3 className="font-headline text-3xl uppercase text-white tracking-wide">
                BOOK COACH CONSULTATION
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Complimentary intake movement assessment for new and existing athletes.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-brand-crimson/50 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Select Preferred Coach
                </label>
                <select
                  value={trainerId}
                  onChange={(e) => setTrainerId(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none transition"
                >
                  {coaches.map((c) => (
                    <option key={c.id} value={c.id} className="bg-zinc-900 text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Walker"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="liam@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Phone (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    placeholder="+880 1711 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Primary Athletic Goal or Injury Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Build heavy deadlift, fix shoulder mobility"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Preferred Intake Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-full transition shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? 'REQUESTING INTAKE...' : 'SUBMIT INTAKE REQUEST'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

