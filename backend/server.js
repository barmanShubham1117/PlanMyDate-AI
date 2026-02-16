// Server Entry Point
// Initialize database and start Express server

const app = require('./app');
const env = require('./config/env');
const { connectDatabase } = require('./config/database');

// ============ START SERVER ============

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Start Express server
    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════╗
║     🎯 PlanMyDate AI - Backend Server      ║
╚════════════════════════════════════════════╝
✅ Server running on http://localhost:${PORT}
📊 Environment: ${env.NODE_ENV}
📍 MongoDB: ${env.MONGODB_URI}
🤖 AI Model: Gemini (Google)

📚 Available Endpoints:
  • POST   /api/date-planner       (Generate couple date plan)
  • POST   /api/solo-mode          (Generate solo plan + vibe match)
  • POST   /api/vibe-match/profile (Create vibe profile)
  • POST   /api/vibe-match/find    (Find vibe match)
  • GET    /api/vibe-match/stats/:city (City statistics)
  • GET    /api/health             (Health check)

      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle uncaught errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Start the server
startServer();
