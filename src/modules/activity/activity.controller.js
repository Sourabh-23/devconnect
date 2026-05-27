const { getActivityLogs } = require('./activity.service');

exports.fetchLogs = async (req, res) => {
  try {
    const logs = await getActivityLogs(req.user.id);
    res.status(200).json({ message: 'Activity logs fetched', data: logs });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
