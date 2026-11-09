const { readData, writeData } = require('../config/db');

function getPlans(req, res) {
  try {
    const db = readData();
    return res.json({
      success: true,
      data: db.plans || []
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function joinPlan(req, res) {
  try {
    const { planId, name, email, phone, billingCycle } = req.body;

    if (!planId || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Plan, name, and email are required.'
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
    const plan = db.plans.find(p => p.id === planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Selected membership tier not found.'
      });
    }

    const memberId = `MBR-${Math.floor(100 + Math.random() * 900)}`;
    const newMember = {
      id: memberId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      planId: plan.id,
      planName: plan.name,
      billingCycle: billingCycle === 'yearly' ? 'yearly' : 'monthly',
      price: billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice,
      status: 'active',
      joinedAt: new Date().toISOString()
    };

    if (!db.memberships) db.memberships = [];
    db.memberships.unshift(newMember);

    // Also optionally subscribe to newsletter if not already
    if (!db.subscribers) db.subscribers = [];
    if (!db.subscribers.some(s => s.email === newMember.email)) {
      db.subscribers.push({
        email: newMember.email,
        subscribedAt: new Date().toISOString()
      });
    }

    writeData(db);

    return res.status(201).json({
      success: true,
      message: `Welcome to COREX! Your membership #${memberId} is activated.`,
      member: newMember
    });
  } catch (error) {
    console.error('Error joining membership:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = {
  getPlans,
  joinPlan
};

