const { uploadFile } = require('./files.service');

exports.upload = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user?.id;
    const result = await uploadFile(file, userId);
    res.status(201).json({ message: 'File uploaded', data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
