const express = require('express');
const router = express.Router();

const { getSchedules, bookClass, cancelBooking } = require('../controllers/scheduleController');
const { getPlans, joinPlan } = require('../controllers/membershipController');
const { getTrainers, bookConsultation } = require('../controllers/trainerController');
const { subscribeNewsletter } = require('../controllers/newsletterController');
const {
  adminLogin,
  adminLogout,
  verifySession,
  requireAdminAuth,
  getStats,
  getAllBookings,
  cancelBookingAdmin,
  getAllMembers,
  getAllSubscribers,
  resetDatabase
} = require('../controllers/adminController');
const { readData } = require('../config/db');

// Schedules (Public)
router.get('/schedules', getSchedules);
router.post('/schedules/book', bookClass);
router.delete('/schedules/booking/:id', cancelBooking);

// Memberships (Public)
router.get('/memberships', getPlans);
router.get('/memberships/plans', getPlans);
router.post('/memberships/join', joinPlan);

// Trainers (Public)
router.get('/trainers', getTrainers);
router.post('/trainers/consult', bookConsultation);

// Newsletter (Public)
router.post('/newsletter/subscribe', subscribeNewsletter);

// FAQs (Public)
router.get('/faqs', (req, res) => {
  try {
    const db = readData();
    return res.json({ success: true, data: db.faqs || [] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Admin Authentication (Custom Endpoint)
router.post('/admin/login', adminLogin);
router.post('/admin/logout', adminLogout);
router.get('/admin/verify', requireAdminAuth, verifySession);

// Protected Admin Operations
router.get('/admin/stats', requireAdminAuth, getStats);
router.get('/admin/bookings', requireAdminAuth, getAllBookings);
router.delete('/admin/bookings/:id', requireAdminAuth, cancelBookingAdmin);
router.get('/admin/members', requireAdminAuth, getAllMembers);
router.get('/admin/subscribers', requireAdminAuth, getAllSubscribers);
router.post('/admin/reset', requireAdminAuth, resetDatabase);

module.exports = router;
