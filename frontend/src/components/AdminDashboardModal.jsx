import React, { useState, useEffect } from 'react';
import {
  fetchAdminStats,
  fetchAdminBookings,
  fetchAdminMembers,
  fetchAdminSubscribers,
  cancelBooking,
  resetDatabase
} from '../services/api';
import {
  X,
  Shield,
  Users,
  Calendar,
  Mail,
  Activity,
  Trash2,
  RefreshCw,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboardModal({ onClose, onDataChanged }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState(null);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [statsRes, bookingsRes, membersRes, subsRes] = await Promise.all([
        fetchAdminStats(),
        fetchAdminBookings(),
        fetchAdminMembers(),
        fetchAdminSubscribers()
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (bookingsRes.success) setBookings(bookingsRes.data);
      if (membersRes.success) setMembers(membersRes.data);
      if (subsRes.success) setSubscribers(subsRes.data);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm(`Cancel booking ${id} and restore the class spot?`)) return;

    try {
      const res = await cancelBooking(id);
      if (res.success) {
        setActionMessage({ type: 'success', text: res.message });
        await loadAll();
        onDataChanged();
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message });
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all demo data back to default initial seed?')) return;

    try {
      const res = await resetDatabase();
      if (res.success) {
        setActionMessage({ type: 'success', text: res.message });
        await loadAll();
        onDataChanged();
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative max-w-5xl w-full max-h-[92vh] bg-[#141417] border border-white/20 rounded-2xl shadow-2xl text-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0e0e11]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-crimson/20 border border-brand-crimson/40">
              <Shield className="w-5 h-5 text-brand-crimson" />
            </div>
            <div>
              <h2 className="font-headline text-2xl uppercase tracking-wider text-white leading-none">
                COREX STAFF ADMIN PORTAL
              </h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Live Gym Operations, Class Rosters & Membership Directory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadAll}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-crimson' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action feedback */}
        {actionMessage && (
          <div className={`px-6 py-2.5 text-xs flex items-center justify-between border-b ${
            actionMessage.type === 'success' 
              ? 'bg-emerald-950/60 border-emerald-800/40 text-emerald-300' 
              : 'bg-red-950/60 border-brand-crimson/40 text-red-300'
          }`}>
            <span>{actionMessage.text}</span>
            <button onClick={() => setActionMessage(null)} className="text-zinc-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-black/30 border-b border-white/10">
          <div className="bg-[#0e0e11] p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">Booked Spots</span>
              <Calendar className="w-4 h-4 text-brand-crimson" />
            </div>
            <div className="font-headline text-3xl text-white">
              {stats ? stats.totalBookings : '...'}
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">Live in database</span>
          </div>

          <div className="bg-[#0e0e11] p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">Total Athletes</span>
              <Users className="w-4 h-4 text-brand-crimson" />
            </div>
            <div className="font-headline text-3xl text-white">
              {stats ? stats.totalActiveMembers : '750+'}
            </div>
            <span className="text-[10px] text-zinc-400 font-semibold">Active Members</span>
          </div>

          <div className="bg-[#0e0e11] p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">Floor Capacity</span>
              <Activity className="w-4 h-4 text-brand-crimson" />
            </div>
            <div className="font-headline text-3xl text-white">
              {stats ? stats.capacityUtilization : '...'}
            </div>
            <span className="text-[10px] text-amber-400 font-semibold">Weekly utilization</span>
          </div>

          <div className="bg-[#0e0e11] p-4 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">Subscribers</span>
              <Mail className="w-4 h-4 text-brand-crimson" />
            </div>
            <div className="font-headline text-3xl text-white">
              {stats ? stats.totalSubscribers : '...'}
            </div>
            <span className="text-[10px] text-zinc-400 font-semibold">Weekly Training Note</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 border-b border-white/10 flex items-center justify-between bg-[#111114]">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === 'bookings'
                  ? 'border-brand-crimson text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Live Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === 'members'
                  ? 'border-brand-crimson text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Registered Members ({members.length})
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                activeTab === 'subscribers'
                  ? 'border-brand-crimson text-white'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              Newsletter ({subscribers.length})
            </button>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-red-400 hover:bg-red-950/30 px-3 py-1.5 rounded-lg border border-white/10 transition"
            title="Reset to initial test data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            RESET DEMO DATA
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'bookings' && (
            <div>
              {bookings.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs uppercase tracking-wider">
                  No active bookings found. Book a class on the schedule to test!
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0e0e11]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">TICKET ID</th>
                        <th className="py-3 px-4">ATHLETE</th>
                        <th className="py-3 px-4">CLASS</th>
                        <th className="py-3 px-4">DAY & TIME</th>
                        <th className="py-3 px-4">COACH</th>
                        <th className="py-3 px-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/[0.02] transition">
                          <td className="py-3 px-4 font-mono font-bold text-brand-crimson">
                            {b.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{b.userName}</div>
                            <div className="text-[10px] text-zinc-400 font-mono">{b.userEmail}</div>
                          </td>
                          <td className="py-3 px-4 font-medium text-white">{b.className}</td>
                          <td className="py-3 px-4 font-mono text-zinc-300">{b.day} • {b.time}</td>
                          <td className="py-3 px-4 text-zinc-300">{b.coach}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-950/40 p-1.5 rounded-lg border border-red-900/40 transition"
                              title="Cancel & restore spot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              {members.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs uppercase tracking-wider">
                  No members registered yet.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0e0e11]">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">MEMBER ID</th>
                        <th className="py-3 px-4">NAME</th>
                        <th className="py-3 px-4">PLAN</th>
                        <th className="py-3 px-4">BILLING</th>
                        <th className="py-3 px-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {members.map((m) => (
                        <tr key={m.id} className="hover:bg-white/[0.02] transition">
                          <td className="py-3 px-4 font-mono font-bold text-white">{m.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{m.name}</div>
                            <div className="text-[10px] text-zinc-400 font-mono">{m.email}</div>
                          </td>
                          <td className="py-3 px-4 font-bold text-brand-crimson">{m.planName}</td>
                          <td className="py-3 px-4 uppercase text-zinc-300">{m.billingCycle}</td>
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'subscribers' && (
            <div>
              {subscribers.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 text-xs uppercase tracking-wider">
                  No subscribers yet.
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-[#0e0e11] divide-y divide-white/5 text-xs">
                  {subscribers.map((sub, i) => (
                    <div key={i} className="py-3 px-4 flex items-center justify-between hover:bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-brand-crimson" />
                        <span className="font-mono text-zinc-200">{sub.email}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(sub.subscribedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

