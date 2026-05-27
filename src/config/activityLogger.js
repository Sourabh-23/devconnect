const ActivityLog = require('../models/activityLog.model');

const logActivity = async (userId, type, description, metadata = {}) => {
  try {
    const log = new ActivityLog({ userId, type, description, metadata });
    await log.save();
    return log;
  } catch (err) {
    console.error('Activity logger error:', err.message);
  }
};

module.exports = logActivity;
