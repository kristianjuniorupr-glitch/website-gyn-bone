const crypto = require('crypto');
const { readData, writeData, resetData } = require('../config/db');

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'corex_super_secret_jwt_key_2026_strength_conditioning';

// Stateless signed token generator (serverless-friendly, persists across all Vercel lambda instances)
function generateSignedToken(payload) {
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payloadStr).digest('base64url');
  return `${payloadStr}.${signature}`;
}

// Verify stateless signed token
function verifySignedToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadStr, signature] = parts;
  const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(payloadStr).digest('base64url');
  if (signature !== expectedSignature) return null;
  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
    if (!payload.expiresAt || Date.now() > payload.expiresAt) return null;
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Custom Admin Login
 * POST /api/admin/login
 * Body: { username, password }
 */
function adminLogin(req, res) {
  try {
    const { username, password } = req.body;

    const validUsername = process.env.ADMIN_USERNAME || 'admin_gym';
    const validPassword = process.env.ADMIN_PASSWORD || 'Gymbone2026';

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    if (username.trim() !== validUsername || password !== validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.'
      });
    }

    // Generate session token (valid for 24 hours)
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const sessionData = {
      username: validUsername,
      role: 'Super Admin',
      name: 'GYM BONE Head Operations',
      expiresAt
    };

    const token = generateSignedToken(sessionData);

    return res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      user: {
        username: sessionData.username,
        role: sessionData.role,
        name: sessionData.name
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

/**
 * Admin Logout
 * POST /api/admin/logout
 */
function adminLogout(req, res) {
  try {
    return res.json({
      success: true,
      message: 'Successfully logged out.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

/**
 * Verify Active Admin Session
 * GET /api/admin/verify
 */
function verifySession(req, res) {
  return res.json({
    success: true,
    valid: true,
    user: req.admin
  });
}

/**
 * Middleware: Verify Admin Token
 */
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : req.headers['x-admin-token'];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Administrator token required.'
    });
  }

  const session = verifySignedToken(token);
  if (!session) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please log in again.'
    });
  }

  req.admin = {
    username: session.username,
    role: session.role,
    name: session.name
  };
  next();
}

/**
 * Get Live Stats
 * GET /api/admin/stats
 */
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

/**
 * Get All Bookings
 * GET /api/admin/bookings
 */
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

/**
 * Cancel a booking from Admin
 * DELETE /api/admin/bookings/:id
 */
function cancelBookingAdmin(req, res) {
  try {
    const { id } = req.params;
    const db = readData();

    const bookingIndex = (db.bookings || []).findIndex(b => b.id === id);
    if (bookingIndex === -1) {
      return res.status(404).json({ success: false, message: 'Booking reservation not found.' });
    }

    const booking = db.bookings[bookingIndex];

    // Restore spot in schedule
    const scheduleIndex = (db.schedules || []).findIndex(s => s.id === booking.classId);
    if (scheduleIndex !== -1 && db.schedules[scheduleIndex].bookedSpots > 0) {
      db.schedules[scheduleIndex].bookedSpots -= 1;
    }

    // Mark as cancelled or remove
    db.bookings.splice(bookingIndex, 1);
    writeData(db);

    return res.json({
      success: true,
      message: `Booking ${id} (${booking.userName} - ${booking.className}) has been cancelled and the slot has been restored.`,
      cancelledId: id
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

/**
 * Get All Members
 * GET /api/admin/members
 */
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

/**
 * Get All Subscribers
 * GET /api/admin/subscribers
 */
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

/**
 * Reset Demo Database
 * POST /api/admin/reset
 */
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
};
