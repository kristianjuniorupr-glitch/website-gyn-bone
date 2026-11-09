import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  adminLogin,
  adminLogout,
  verifyAdminSession,
  getAdminToken,
  getAdminUser,
  fetchAdminStats,
  fetchAdminBookings,
  cancelBookingAdmin,
  fetchAdminMembers,
  fetchAdminSubscribers,
  resetDatabase
} from '../services/api';
import {
  Shield,
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut,
  Calendar,
  Users,
  Mail,
  Activity,
  Trash2,
  RefreshCw,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Flame,
  Search,
  Filter
} from 'lucide-react';

export default function AdminPage() {
  const navigate = useNavigate();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'bookings' | 'members' | 'subscribers'
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [dayFilter, setDayFilter] = useState('ALL');

  // Verify existing session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = getAdminToken();
        if (token) {
          const res = await verifyAdminSession();
          if (res && res.valid) {
            setIsAuthenticated(true);
            setCurrentUser(res.user || getAdminUser());
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecking(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch Dashboard data when authenticated
  const loadDashboardData = async () => {
    try {
      setLoadingData(true);
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
      console.error('Error fetching admin data:', err);
      if (err.message && err.message.toLowerCase().includes('unauthorized')) {
        handleLogout();
      }
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await adminLogin(username, password);
      if (res.success) {
        setIsAuthenticated(true);
        setCurrentUser(res.user);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
  };

  // Quick autofill demo credentials
  const autofillDemo = () => {
    setUsername('admin');
    setPassword('corex2026');
  };

  // Cancel Booking Action
  const handleCancelBooking = async (id) => {
    if (!window.confirm(`Are you sure you want to cancel booking ${id}? The spot will be returned to the class schedule.`)) {
      return;
    }

    try {
      const res = await cancelBookingAdmin(id);
      if (res.success) {
        setActionMessage({ type: 'success', text: res.message });
        await loadDashboardData();
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message || 'Failed to cancel booking.' });
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  // Reset Demo Data
  const handleResetData = async () => {
    if (!window.confirm('Reset all demo bookings and registrations back to seed state? This cannot be undone.')) {
      return;
    }

    try {
      const res = await resetDatabase();
      if (res.success) {
        setActionMessage({ type: 'success', text: res.message });
        await loadDashboardData();
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch (err) {
      setActionMessage({ type: 'error', text: err.message || 'Failed to reset data.' });
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesDay = dayFilter === 'ALL' || b.day?.toUpperCase() === dayFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      b.userName?.toLowerCase().includes(q) ||
      b.className?.toLowerCase().includes(q) ||
      b.userEmail?.toLowerCase().includes(q) ||
      b.id?.toLowerCase().includes(q);
    return matchesDay && matchesSearch;
  });

  // Filtered Members
  const filteredMembers = members.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      !q ||
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.planName?.toLowerCase().includes(q)
    );
  });

  // Loading Screen while verifying session
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#0e0e11] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-brand-crimson animate-spin" />
          <span className="text-xs uppercase tracking-widest text-zinc-400">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  // ==================== 1. RESTRICTED LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0d] text-white flex flex-col justify-between selection:bg-brand-crimson selection:text-white">
        {/* Top Minimal Bar */}
        <header className="w-full border-b border-white/5 py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full border-2 border-brand-crimson flex items-center justify-center font-headline text-sm font-bold text-white">
              C
            </span>
            <span className="font-headline text-2xl tracking-wider text-white">COREX</span>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/10">
              STAFF PORTAL
            </span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-zinc-400 hover:text-white transition flex items-center gap-1.5"
          >
            &larr; Back to Public Website
          </button>
        </header>

        {/* Login Card Center */}
        <div className="flex items-center justify-center px-4 py-12 flex-1">
          <div className="w-full max-w-md bg-[#121217] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle Crimson Backlight Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-brand-crimson/20 blur-[90px] pointer-events-none" />

            {/* Header Badge & Title */}
            <div className="text-center space-y-2 mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-crimson/20 border border-brand-crimson/40 text-brand-crimson mb-2 shadow-lg">
                <Lock className="w-6 h-6 text-brand-crimson" />
              </div>
              <h1 className="font-headline text-3xl sm:text-4xl uppercase tracking-wider text-white">
                OPERATIONS LOGIN
              </h1>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Authorized gym management and staff credential verification only.
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Staff Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter staff username"
                    className="w-full bg-[#181820] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#181820] border border-white/10 rounded-xl pl-10 pr-11 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 bg-brand-crimson hover:bg-brand-crimsonHover disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition shadow-lg shadow-brand-crimson/25 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Access Operations Console</span>
                )}
              </button>
            </form>

            {/* Autofill Demo Pill */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <span className="text-[11px] text-zinc-500 block mb-2">Development Demo Access:</span>
              <button
                type="button"
                onClick={autofillDemo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-300 transition"
                title="Click to autofill test credentials"
              >
                <span>Autofill Demo (admin / corex2026)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="w-full border-t border-white/5 py-4 text-center text-[11px] text-zinc-600">
          COREX Strength & Conditioning Facilities &copy; {new Date().getFullYear()}. All Rights Reserved.
        </footer>
      </div>
    );
  }

  // ==================== 2. DEDICATED FULL-PAGE ADMIN DASHBOARD ====================
  return (
    <div className="min-h-screen bg-[#09090c] text-zinc-100 flex flex-col selection:bg-brand-crimson selection:text-white">
      {/* Top Admin App Header */}
      <header className="sticky top-0 z-40 bg-[#0e0e13]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full border-2 border-brand-crimson flex items-center justify-center font-headline text-lg font-bold text-white bg-brand-crimson/20">
            C
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline text-2xl tracking-wider text-white">COREX</span>
              <span className="text-[10px] font-bold tracking-widest text-brand-crimson uppercase px-2 py-0.5 rounded bg-brand-crimson/15 border border-brand-crimson/30">
                OPERATIONS CONSOLE
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block -mt-0.5">
              Logged in as: <strong className="text-zinc-200">{currentUser?.username || 'admin'}</strong> ({currentUser?.role || 'Super Admin'})
            </span>
          </div>
        </div>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadDashboardData()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 transition"
            title="Refresh All Metrics"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 transition"
            title="Open Public Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-500/30 text-xs text-red-200 transition"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Banner Action Message */}
        {actionMessage && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
              actionMessage.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/80 border-red-500/40 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{actionMessage.text}</span>
            </div>
            <button onClick={() => setActionMessage(null)} className="text-xs opacity-70 hover:opacity-100">
              Dismiss
            </button>
          </div>
        )}

        {/* 6 Metric KPI Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-[#131318] p-4 rounded-2xl border border-white/10 shadow-lg">
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block mb-1">
                Total Bookings
              </span>
              <span className="font-headline text-3xl sm:text-4xl text-white block">
                {stats.totalBookings}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                Active Reservations
              </span>
            </div>

            <div className="bg-[#131318] p-4 rounded-2xl border border-white/10 shadow-lg">
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block mb-1">
                Active Members
              </span>
              <span className="font-headline text-3xl sm:text-4xl text-white block">
                {stats.totalActiveMembers}
              </span>
              <span className="text-[10px] text-brand-crimson font-semibold mt-1 block">
                +750 Base + New
              </span>
            </div>

            <div className="bg-[#131318] p-4 rounded-2xl border border-white/10 shadow-lg">
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block mb-1">
                Capacity Load
              </span>
              <span className="font-headline text-3xl sm:text-4xl text-white block">
                {stats.capacityUtilization}
              </span>
              <span className="text-[10px] text-amber-400 font-semibold mt-1 block">
                Facility Utilization
              </span>
            </div>

            <div className="bg-[#131318] p-4 rounded-2xl border border-white/10 shadow-lg">
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block mb-1">
                Weekly Classes
              </span>
              <span className="font-headline text-3xl sm:text-4xl text-white block">
                {stats.totalWeeklyClasses}
              </span>
              <span className="text-[10px] text-zinc-400 font-semibold mt-1 block">
                Across 7 Days
              </span>
            </div>

            <div className="bg-[#131318] p-4 rounded-2xl border border-white/10 shadow-lg">
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block mb-1">
                Newsletter Leads
              </span>
              <span className="font-headline text-3xl sm:text-4xl text-white block">
                {stats.totalSubscribers}
              </span>
              <span className="text-[10px] text-zinc-400 font-semibold mt-1 block">
                Email Subscribers
              </span>
            </div>

            <div className="bg-[#131318] p-4 rounded-2xl border border-white/10 shadow-lg">
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block mb-1">
                Consultations
              </span>
              <span className="font-headline text-3xl sm:text-4xl text-white block">
                {stats.totalConsultations}
              </span>
              <span className="text-[10px] text-indigo-400 font-semibold mt-1 block">
                1-on-1 Intakes
              </span>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#121217] p-2 rounded-2xl border border-white/10">
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'overview'
                  ? 'bg-brand-crimson text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'bookings'
                  ? 'bg-brand-crimson text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Class Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'members'
                  ? 'bg-brand-crimson text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Members ({members.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('subscribers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'subscribers'
                  ? 'bg-brand-crimson text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Newsletter ({subscribers.length})</span>
            </button>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={handleResetData}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-wider border border-white/10 transition"
            title="Reset database to seed state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings Feed */}
            <div className="bg-[#121217] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-headline text-xl uppercase tracking-wider text-white">
                  Recent Class Bookings
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-brand-crimson hover:underline font-bold"
                >
                  View All &rarr;
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-xs">No active bookings recorded.</div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((b) => (
                    <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{b.userName}</span>
                          <span className="text-[10px] bg-brand-crimson/30 text-brand-crimson font-bold px-2 py-0.5 rounded">
                            {b.id}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 block mt-0.5">
                          {b.className} &bull; {b.day} {b.time} &bull; Coach: {b.coach}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                        CONFIRMED
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Members Feed */}
            <div className="bg-[#121217] p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-headline text-xl uppercase tracking-wider text-white">
                  Recent Membership Signups
                </h3>
                <button
                  onClick={() => setActiveTab('members')}
                  className="text-xs text-brand-crimson hover:underline font-bold"
                >
                  View All &rarr;
                </button>
              </div>

              {members.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-xs">No new members registered yet.</div>
              ) : (
                <div className="space-y-3">
                  {members.slice(0, 5).map((m) => (
                    <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{m.name}</span>
                          <span className="text-[10px] bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded">
                            {m.id}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 block mt-0.5">
                          {m.email} &bull; {m.phone}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-brand-crimson font-bold uppercase block">
                          {m.planName}
                        </span>
                        <span className="text-[9px] text-zinc-500 uppercase">
                          {m.billingCycle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="bg-[#121217] rounded-2xl border border-white/10 p-6 space-y-4">
            {/* Search & Day Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, class, ticket..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#181820] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson"
                />
              </div>

              {/* Day Pills */}
              <div className="flex flex-wrap items-center gap-1">
                {['ALL', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                  <button
                    key={day}
                    onClick={() => setDayFilter(day)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                      dayFilter === day
                        ? 'bg-brand-crimson text-white'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Ticket ID</th>
                    <th className="py-3 px-3">Member Name</th>
                    <th className="py-3 px-3">Class & Time</th>
                    <th className="py-3 px-3">Trainer</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-zinc-500">
                        No bookings found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/5 transition">
                        <td className="py-3 px-3 font-mono font-bold text-brand-crimson">
                          {b.id}
                        </td>
                        <td className="py-3 px-3 font-bold text-white">
                          {b.userName}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-zinc-200 block">{b.className}</span>
                          <span className="text-[10px] text-zinc-500 uppercase">{b.day} at {b.time}</span>
                        </td>
                        <td className="py-3 px-3 text-zinc-300">
                          {b.coach}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-zinc-300 block">{b.userEmail}</span>
                          <span className="text-[10px] text-zinc-500">{b.userPhone || '-'}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-500/30">
                            {b.status || 'CONFIRMED'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition"
                            title="Cancel booking and restore slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: MEMBERS TABLE */}
        {activeTab === 'members' && (
          <div className="bg-[#121217] rounded-2xl border border-white/10 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline text-xl uppercase tracking-wider text-white">
                Registered Members Directory
              </h3>
              <div className="relative w-72">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#181820] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-brand-crimson"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Member ID</th>
                    <th className="py-3 px-3">Full Name</th>
                    <th className="py-3 px-3">Email & Phone</th>
                    <th className="py-3 px-3">Plan Tier</th>
                    <th className="py-3 px-3">Billing</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Join Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-zinc-500">
                        No members found.
                      </td>
                    </tr>
                  ) : (
                    filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-white/5 transition">
                        <td className="py-3 px-3 font-mono font-bold text-zinc-400">
                          {m.id}
                        </td>
                        <td className="py-3 px-3 font-bold text-white">
                          {m.name}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-zinc-300 block">{m.email}</span>
                          <span className="text-[10px] text-zinc-500">{m.phone || '-'}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/30">
                            {m.planName}
                          </span>
                        </td>
                        <td className="py-3 px-3 uppercase text-[10px] font-semibold text-zinc-400">
                          {m.billingCycle}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-500/30">
                            {m.status || 'ACTIVE'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right text-zinc-500 text-[11px]">
                          {m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : 'Recent'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="bg-[#121217] rounded-2xl border border-white/10 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div>
                <h3 className="font-headline text-xl uppercase tracking-wider text-white">
                  Newsletter & Protocol Leads
                </h3>
                <p className="text-xs text-zinc-400">
                  Subscribed to weekly COREX training protocols and workout insights.
                </p>
              </div>
              <span className="text-xs font-bold text-brand-crimson bg-brand-crimson/15 px-3 py-1 rounded-full border border-brand-crimson/30">
                {subscribers.length} Leads Total
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {subscribers.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs">No email subscribers recorded.</div>
              ) : (
                subscribers.map((s, idx) => (
                  <div key={idx} className="py-3 px-2 flex items-center justify-between text-xs hover:bg-white/5 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-zinc-500" />
                      <span className="font-medium text-zinc-200">{s.email}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500">
                      {s.subscribedAt ? new Date(s.subscribedAt).toLocaleString() : 'Active'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
