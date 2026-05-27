require('dotenv').config();
const mongoose = require('mongoose');
const Activity = require('../src/models/activityLog.model');

const USER_ID = 1; // token showed id=1 — change if needed

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB at', process.env.MONGO_URI);

    const logs = await Activity.find({ userId: USER_ID }).sort({ createdAt: -1 }).limit(50).lean();
    console.log(`Found ${logs.length} activity logs for userId=${USER_ID}`);
    logs.forEach((l) => console.log(JSON.stringify(l, null, 2)));

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error reading activity logs:', err.message);
    process.exit(1);
  }
})();
