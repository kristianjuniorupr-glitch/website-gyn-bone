require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*', // Allow local frontend and production domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/api', apiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'COREX Gym Management Backend API',
    timestamp: new Date().toISOString()
  });
});

// Optional: Serve frontend build in production if present
const frontendDist = path.join(__dirname, '../../frontend/dist');
const fs = require('fs');
app.use(express.static(frontendDist));

// SPA Fallback for any client route
app.get(/^(?!\/api).*/, (req, res) => {
  const indexFile = path.join(frontendDist, 'index.html');
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }
  res.json({ message: 'COREX API Server is active. Frontend build not found.' });
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'An internal server error occurred.'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  COREX BACKEND API RUNNING ON PORT ${PORT} `);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  API Base:     http://localhost:${PORT}/api/schedules`);
    console.log(`===============================================`);
  });
}

module.exports = app;
