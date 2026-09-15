const { S3Client } = require('@aws-sdk/client-s3');

const buildAwsCredentials = () => {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.AWS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_KEY;

  if (accessKeyId && secretAccessKey) {
    return { accessKeyId, secretAccessKey };
  }

  return undefined;
};

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: buildAwsCredentials(),
});

const buildPublicUrl = (key) => {
  if (!key) {
    return null;
  }

  if (/^https?:\/\//i.test(key)) {
    return key;
  }

  const base = process.env.STREAMING_PUBLIC_URL?.replace(/\/$/, '') || '';

  const normalizedKey = key
    .replace(/^\/+/, '')
    .replace(/^thumbnails\//i, '');

  return `${base}/api/streaming/thumbnails/${encodeURI(normalizedKey)}`;
};

const buildStreamUrl = (videoId) => {
  const base = process.env.STREAMING_PUBLIC_URL?.replace(/\/$/, '');
  const path = `/api/streaming/stream/${videoId}`;
  if (!base) {
    return path;
  }
  return `${base}${path}`;
};

module.exports = {
  s3Client,
  buildPublicUrl,
  buildStreamUrl,
};
