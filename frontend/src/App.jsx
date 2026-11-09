import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Ethos from './components/Ethos';
import Disciplines from './components/Disciplines';
import Schedule from './components/Schedule';
import Trainers from './components/Trainers';
import Transformation from './components/Transformation';
import Pricing from './components/Pricing';
import FacilityGallery from './components/FacilityGallery';
import QuoteBanner from './components/QuoteBanner';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import JoinModal from './components/JoinModal';
import ConsultationModal from './components/ConsultationModal';
import Toast from './components/Toast';
import AdminPage from './pages/AdminPage';

function PublicLandingPage() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinPlanConfig, setJoinPlanConfig] = useState({ planId: 'all-access', billing: 'monthly' });
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultTrainer, setConsultTrainer] = useState(null);
  const [scheduleRefreshKey, setScheduleRefreshKey] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = ({ type = 'success', message }) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleOpenJoin = (planId = 'all-access', billing = 'monthly') => {
    setJoinPlanConfig({ planId, billing });
    setJoinModalOpen(true);
  };

  const handleOpenConsult = (trainer = null) => {
    setConsultTrainer(trainer);
    setConsultModalOpen(true);
  };

  const handleBookingSuccess = (msg) => {
    setScheduleRefreshKey((prev) => prev + 1);
    showToast({ type: 'success', message: msg || 'Class spot booked successfully!' });
  };

  const handleJoinSuccess = (msg) => {
    showToast({ type: 'success', message: msg || 'Membership confirmed! Welcome to COREX.' });
  };

  const handleConsultSuccess = (msg) => {
    showToast({ type: 'success', message: msg || 'Assessment request received!' });
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] text-zinc-100 selection:bg-brand-crimson selection:text-white">
      {/* Public Navbar - Zero Admin buttons, purely professional */}
      <Navbar onOpenJoinModal={() => handleOpenJoin('all-access')} />

      {/* Main Public Page Content */}
      <main>
        <Hero 
          onOpenJoinModal={handleOpenJoin} 
          onOpenConsultModal={() => handleOpenConsult(null)} 
        />
        
        <Ticker />
        
        <Ethos 
          onOpenConsultModal={() => handleOpenConsult(null)} 
        />
        
        <Disciplines 
          onOpenConsultModal={() => handleOpenConsult(null)} 
        />
        
        <Schedule 
          onBookClass={(session) => setSelectedSession(session)} 
          refreshTrigger={scheduleRefreshKey} 
        />
        
        <Trainers 
          onOpenConsultModal={handleOpenConsult} 
        />
        
        <Transformation />
        
        <Pricing 
          onOpenJoinModal={handleOpenJoin} 
        />
        
        <FacilityGallery />
        
        <QuoteBanner />
        
        <FAQ />
        
        <Newsletter 
          onShowToast={showToast} 
        />
      </main>

      {/* Public Footer */}
      <Footer />

      {/* User Modals */}
      {selectedSession && (
        <BookingModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {joinModalOpen && (
        <JoinModal
          initialPlan={joinPlanConfig.planId}
          initialBilling={joinPlanConfig.billing}
          onClose={() => setJoinModalOpen(false)}
          onSuccess={handleJoinSuccess}
        />
      )}

      {consultModalOpen && (
        <ConsultationModal
          trainer={consultTrainer}
          onClose={() => setConsultModalOpen(false)}
          onSuccess={handleConsultSuccess}
        />
      )}

      {/* Toast notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Visitor Landing Page */}
        <Route path="/" element={<PublicLandingPage />} />

        {/* Dedicated Admin Portal with Custom Login Endpoint */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/login" element={<AdminPage />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
