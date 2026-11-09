const { readData, writeData, resetData } = require('../config/db');

function getStats(req, res) {
  try {
    const db = readData();

    const schedules = db.schedules || [];
    const totalCapacity = schedules.reduce((acc, s) => acc + (s.totalSpots || 0), 0);
    const totalBooked = schedules.reduce((acc, s) => acc + (s.bookedSpots || 0), 0);
    const capacityPercent = totalCapacity > 0 ? Math.round((totalBooked / totalCapacity) * 100) : 0;

    const stats = {
      totalBookings: (db.bookings || []).length,
      totalActiveMembers: (db.memberships || []).length + 750, // Base members + new
      newMembersRegistered: (db.memberships || []).length,
      totalSubscribers: (db.subscribers || []).length,
      totalConsultations: (db.consultations || []).length,
      capacityUtilization: `${capacityPercent}%`,
      totalWeeklyClasses: schedules.length,
      recentBookings: (db.bookings || []).slice(0, 5),
      recentMembers: (db.memberships || []).slice(0, 5)
    };

    return res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function getAllBookings(req, res) {
  try {
    const db = readData();
    return res.json({
      success: true,
      total: (db.bookings || []).length,
      data: db.bookings || []
    });
  } catch (error) {
    console.error('Error getting bookings:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function getAllMembers(req, res) {
  try {
    const db = readData();
    return res.json({
      success: true,
      total: (db.memberships || []).length,
      data: db.memberships || []
    });
  } catch (error) {
    console.error('Error getting members:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function getAllSubscribers(req, res) {
  try {
    const db = readData();
    return res.json({
      success: true,
      total: (db.subscribers || []).length,
      data: db.subscribers || []
    });
  } catch (error) {
    console.error('Error getting subscribers:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function resetDatabase(req, res) {
  try {
    const fresh = resetData();
    return res.json({
      success: true,
      message: 'Demo database has been successfully reset to initial seed state.',
      data: fresh
    });
  } catch (error) {
    console.error('Error resetting database:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = {
  getStats,
  getAllBookings,
  getAllMembers,
  getAllSubscribers,
  resetDatabase
};

