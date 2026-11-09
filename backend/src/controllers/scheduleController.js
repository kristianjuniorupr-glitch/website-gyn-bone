const { readData, writeData } = require('../config/db');

function getSchedules(req, res) {
  try {
    const { day } = req.query;
    const db = readData();
    let schedules = db.schedules || [];

    if (day) {
      schedules = schedules.filter(s => s.day.toUpperCase() === day.toUpperCase());
    }

    // Include calculated available spots
    const result = schedules.map(s => ({
      ...s,
      spotsLeft: Math.max(0, s.totalSpots - s.bookedSpots),
      isFull: s.bookedSpots >= s.totalSpots
    }));

    return res.json({
      success: true,
      day: day ? day.toUpperCase() : 'ALL',
      total: result.length,
      data: result
    });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function bookClass(req, res) {
  try {
    const { classId, userName, userEmail, userPhone } = req.body;

    if (!classId || !userName || !userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and classId are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const db = readData();
    const classIndex = db.schedules.findIndex(s => s.id === classId);

    if (classIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Class not found.'
      });
    }

    const targetClass = db.schedules[classIndex];
    if (targetClass.bookedSpots >= targetClass.totalSpots) {
      return res.status(409).json({
        success: false,
        message: 'This class is currently fully booked.'
      });
    }

    // Check if user already booked this class
    const alreadyBooked = db.bookings.some(
      b => b.classId === classId && b.userEmail.toLowerCase() === userEmail.toLowerCase() && b.status === 'confirmed'
    );
    if (alreadyBooked) {
      return res.status(409).json({
        success: false,
        message: 'You have already booked a spot for this session.'
      });
    }

    // Increment spot
    targetClass.bookedSpots += 1;
    db.schedules[classIndex] = targetClass;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `CRX-${randomSuffix}`;

    const newBooking = {
      id: bookingId,
      classId: targetClass.id,
      className: targetClass.name,
      coach: targetClass.coach,
      day: targetClass.day,
      time: targetClass.time,
      userName: userName.trim(),
      userEmail: userEmail.trim().toLowerCase(),
      userPhone: (userPhone || '').trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    db.bookings.unshift(newBooking);
    writeData(db);

    return res.status(201).json({
      success: true,
      message: `Booking confirmed! Your ticket code is ${bookingId}`,
      booking: newBooking,
      spotsLeft: targetClass.totalSpots - targetClass.bookedSpots
    });
  } catch (error) {
    console.error('Error booking class:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

function cancelBooking(req, res) {
  try {
    const { id } = req.params;
    const db = readData();

    const bookingIndex = db.bookings.findIndex(b => b.id.toUpperCase() === id.toUpperCase());
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking record not found.'
      });
    }

    const booking = db.bookings[bookingIndex];

    // Restore spot in schedule
    const classIndex = db.schedules.findIndex(s => s.id === booking.classId);
    if (classIndex !== -1 && db.schedules[classIndex].bookedSpots > 0) {
      db.schedules[classIndex].bookedSpots -= 1;
    }

    // Remove booking or set cancelled
    db.bookings.splice(bookingIndex, 1);
    writeData(db);

    return res.json({
      success: true,
      message: `Booking ${id} has been cancelled successfully.`
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = {
  getSchedules,
  bookClass,
  cancelBooking
};

