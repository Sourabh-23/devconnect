const ActivityLog = require('../../models/activityLog.model');

exports.getActivityLogs = async (userId) => {
  return await ActivityLog.find({ userId }).sort({ createdAt: -1 });
};
