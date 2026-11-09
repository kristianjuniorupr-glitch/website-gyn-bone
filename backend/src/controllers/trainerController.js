const { readData, writeData } = require('../config/db');

function getTrainers(req, res) {
  try {
    const db = readData();
    return res.json({
      success: true,
      data: db.trainers || []
    });
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function bookConsultation(req, res) {
  try {
    const { trainerId, name, email, phone, goal, preferredDate } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const db = readData();
    const trainer = db.trainers.find(t => t.id === trainerId);

    const consultId = `CNS-${Math.floor(100 + Math.random() * 900)}`;
    const newConsultation = {
      id: consultId,
      trainerId: trainer ? trainer.id : 'general',
      trainerName: trainer ? trainer.name : 'Head Coach Ned Chen',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      goal: (goal || 'General strength assessment').trim(),
      date: preferredDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    if (!db.consultations) db.consultations = [];
    db.consultations.unshift(newConsultation);
    writeData(db);

    return res.status(201).json({
      success: true,
      message: `Consultation booked with ${newConsultation.trainerName}! We will reach out via WhatsApp/email within 2 hours.`,
      consultation: newConsultation
    });
  } catch (error) {
    console.error('Error booking consultation:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = {
  getTrainers,
  bookConsultation
};

