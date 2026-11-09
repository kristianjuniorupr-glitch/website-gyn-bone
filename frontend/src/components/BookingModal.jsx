import React, { useState } from 'react';
import { bookClass } from '../services/api';
import { X, Calendar, Clock, User, CheckCircle2, AlertCircle, Loader2, Ticket } from 'lucide-react';

export default function BookingModal({ session, onClose, onSuccess }) {
  if (!session) return null;

  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.userName || !formData.userEmail) {
      setError('Please provide your name and email address.');
      return;
    }

    try {
      setLoading(true);
      const res = await bookClass({
        classId: session.id,
        userName: formData.userName,
        userEmail: formData.userEmail,
        userPhone: formData.userPhone
      });

      if (res.success) {
        setConfirmedBooking(res.booking);
        onSuccess(res.message);
      }
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
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

        {confirmedBooking ? (
          /* Confirmation Ticket View */
          <div className="text-center space-y-5 py-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                SPOT CONFIRMED
              </span>
              <h3 className="font-headline text-3xl uppercase tracking-wide text-white mt-1">
                YOU'RE ON THE ROSTER!
              </h3>
            </div>

            <div className="bg-[#0e0e11] border border-white/10 rounded-xl p-5 text-left space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-crimson text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                TICKET: {confirmedBooking.id}
              </div>

              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">SESSION</p>
                <p className="font-bold text-white text-base">{confirmedBooking.className}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-1 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">DAY & TIME</p>
                  <p className="text-zinc-200 font-mono">{confirmedBooking.day} • {confirmedBooking.time}</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">COACH</p>
                  <p className="text-zinc-200">{confirmedBooking.coach}</p>
                </div>
              </div>

              <div className="pt-1 border-t border-white/5 text-xs">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">ATHLETE</p>
                <p className="text-zinc-200 font-medium">{confirmedBooking.userName} ({confirmedBooking.userEmail})</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400">
              A calendar invite and preparation note have been recorded for your email.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest py-3 rounded-full transition"
            >
              DONE
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-crimson block mb-1">
                SESSION RESERVATION
              </span>
              <h3 className="font-headline text-3xl uppercase text-white tracking-wide">
                BOOK {session.name}
              </h3>
              <div className="flex items-center gap-4 text-xs text-zinc-400 mt-2">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-brand-crimson" />
                  {session.day} {session.time}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-zinc-500" />
                  Coach: {session.coach}
                </span>
              </div>
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
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Hunter"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
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
                  placeholder="alex@example.com"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                  className="w-full bg-[#0e0e11] border border-white/15 focus:border-brand-crimson rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Phone Number (WhatsApp)
                </label>
                <input
                  type="tel"
                  placeholder="+880 1700 000 000"
                  value={formData.userPhone}
                  onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
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
                  {loading ? 'CONFIRMING SPOT...' : 'CONFIRM SPOT'}
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 text-center">
                Free cancellation up to 2 hours before session start.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

