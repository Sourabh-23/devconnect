const fs = require('fs');
const path = require('path');

const bucketName = process.env.GCLOUD_BUCKET;

if (!bucketName) {
  console.log('GCLOUD_BUCKET not set — using local uploads folder for file storage');
}

let uploadFromBuffer;

if (bucketName) {
  const { Storage } = require('@google-cloud/storage');
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);

  uploadFromBuffer = (buffer, destName, contentType) => {
    return new Promise((resolve, reject) => {
      const file = bucket.file(destName);
      const stream = file.createWriteStream({ metadata: { contentType }, resumable: false });

      stream.on('error', (err) => reject(err));

      stream.on('finish', async () => {
        try {
          await file.makePublic();
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${destName}`;
          resolve(publicUrl);
        } catch (err) {
          reject(err);
        }
      });

      stream.end(buffer);
    });
  };

} else {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  uploadFromBuffer = async (buffer, destName /*, contentType */) => {
    const filePath = path.join(uploadsDir, destName);
    await fs.promises.writeFile(filePath, buffer);
    const port = process.env.PORT || 3000;
    const publicUrl = `http://localhost:${port}/uploads/${encodeURIComponent(destName)}`;
    return publicUrl;
  };
}

module.exports = { uploadFromBuffer };
