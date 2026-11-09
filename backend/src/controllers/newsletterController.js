const { readData, writeData } = require('../config/db');

function subscribeNewsletter(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const db = readData();
    if (!db.subscribers) db.subscribers = [];

    const exists = db.subscribers.some(s => s.email.toLowerCase() === cleanEmail);
    if (exists) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to the Weekly Training Note!'
      });
    }

    db.subscribers.unshift({
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    });

    writeData(db);

    return res.status(201).json({
      success: true,
      message: 'Subscribed successfully! Welcome to the weekly training intel.'
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = {
  subscribeNewsletter
};

