const express = require('express');
const router = express.Router();

const { getSchedules, bookClass, cancelBooking } = require('../controllers/scheduleController');
const { getPlans, joinPlan } = require('../controllers/membershipController');
const { getTrainers, bookConsultation } = require('../controllers/trainerController');
const { subscribeNewsletter } = require('../controllers/newsletterController');
const {
  getStats,
  getAllBookings,
  getAllMembers,
  getAllSubscribers,
  resetDatabase
} = require('../controllers/adminController');
const { readData } = require('../config/db');

// Schedules
router.get('/schedules', getSchedules);
router.post('/schedules/book', bookClass);
router.delete('/schedules/booking/:id', cancelBooking);

// Memberships
router.get('/memberships', getPlans);
router.get('/memberships/plans', getPlans);
router.post('/memberships/join', joinPlan);

// Trainers
router.get('/trainers', getTrainers);
router.post('/trainers/consult', bookConsultation);

// Newsletter
router.post('/newsletter/subscribe', subscribeNewsletter);

// FAQs
router.get('/faqs', (req, res) => {
  try {
    const db = readData();
    return res.json({ success: true, data: db.faqs || [] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Admin & Overview
router.get('/admin/stats', getStats);
router.get('/admin/bookings', getAllBookings);
router.get('/admin/members', getAllMembers);
router.get('/admin/subscribers', getAllSubscribers);
router.post('/admin/reset', resetDatabase);

module.exports = router;

