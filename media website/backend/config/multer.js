const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadProfileDir = path.join(__dirname, '..', 'uploads', 'profile');
const uploadNewsDir = path.join(__dirname, '..', 'uploads', 'news');
const uploadProofDir = path.join(__dirname, '..', 'uploads', 'proofs');
fs.mkdirSync(uploadProfileDir, { recursive: true });
fs.mkdirSync(uploadNewsDir, { recursive: true });
fs.mkdirSync(uploadProofDir, { recursive: true });

const createStorage = (dest) => multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image files are allowed!'), false);
  } else {
    cb(null, true);
  }
};

const profileUpload = multer({
  storage: createStorage(uploadProfileDir),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const newsUpload = multer({
  storage: createStorage(uploadNewsDir),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const proofUpload = multer({
  storage: createStorage(uploadProofDir),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { profileUpload, newsUpload, proofUpload };
