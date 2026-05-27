const { uploadFromBuffer } = require('../../config/gcs');

exports.uploadFile = async (file, userId) => {
  if (!file) throw new Error('No file provided');
  const destName = `${userId || 'anon'}-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
  const url = await uploadFromBuffer(file.buffer, destName, file.mimetype);
  return { url, name: destName };
};
