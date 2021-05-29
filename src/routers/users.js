const express = require('express')
const route = express.Router()
const userController = require('../controllers/users')
const verifyrole = require('../middlewares/verifyrole')
const auth = require('../middlewares/auth')
const { uploadMulter } = require('../middlewares/multer')

route
  .post('/signup', userController.registerUser)
  .post('/signin', userController.loginUser)
  .put('/verify', userController.verifyUser)
  .get('/profile', auth.verifyAccess, userController.getProfile)
  .get('/getalluser/:iduser', auth.verifyAccess, userController.getUser)
  .get('/:idUser',  userController.getUserById)
  .put('/removebio', userController.removeBio)
  .put('/:idUser', uploadMulter.single('image'), userController.updateProfile)

  // Not edited
  .post('/', auth.verifyAccess, verifyrole.verify(), userController.insertUser)
  
  .post('/tryemail', userController.email)

  .put('/updatepin', userController.updatePin)
  .put('/changepassword', userController.updatePassword)
 
  .delete('/:idUser', auth.verifyAccess, verifyrole.verify(), userController.deleteUser)
module.exports = route