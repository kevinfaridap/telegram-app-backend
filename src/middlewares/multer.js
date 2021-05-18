const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  // validasi hanya boleh jpeg atau png
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
    cb(null, true)
  } else {
    cb(new Error('Your type file is not valid, .jpeg, .png, .jpg only!'))
  }
}

const maxSize = 2 * 1024 * 1024
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize }
})

module.exports = {
  uploadMulter: upload
}
