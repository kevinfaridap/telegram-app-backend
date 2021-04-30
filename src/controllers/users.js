const userModels = require('../models/users')
const helpers = require('../helpers/helper')
const hashPassword = require('../helpers/hashPassword')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/users')
const mail = require('../helpers/sendEmail')

// test kirim email
exports.email = async (req, res)=>{
  const resEmail = await mail.send()
  console.log(resEmail);
}



exports.getUser = async (req, res) => {
  const by = req.query.by || 'id'
  const order = req.query.order || 'ASC'
  const searchUser = req.query.firstname || ''
  const limit = parseInt(req.query.limit) || 5
  const page = parseInt(req.query.page) || 1
  
  const countUsers = await userModels.countUsers()
  // console.log(req.query.limit);
  // console.log(req.query.firstName);
  const totalData = countUsers[0].totalData
  const totalPage = Math.ceil(totalData / limit)
  const offset = (page - 1) * limit

  
  userModels.getUsers(searchUser, offset, limit, by, order)

    .then((result) => {
      if (result.length > 0) {
        // const dataUser = result
        // console.log(dataUser);

        res.json({
          message: 'Success',
          status: 200,
          currentPage: page,
          totalPage: totalPage,
          totalUsers: totalData,
          MaxperPage: limit,
          data: result
        })
      } else {
        res.json({
          err: 'Data not found',
          status: 400
        })
      }
    })
    .catch((err) => {
      res.json({
        err: err + 'Error Cant Get Data',
        status: 400
      })
    })
}


// exports.getUser = (req, res) => {
//   userModels.getUsers()
//     .then((result) => {
//       res.json({
//         data: result
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

exports.getUserById = (req, res) => {
  const idUser = req.params.idUser
  userModels.getUserById(idUser)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data id: ${idUser}`,
          status: 200,
          data: result
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
}

exports.getProfile = (req, res) => {
  // email disini req.email dari decode token
  const email = req.email
  userModels.getUserByEmail(email)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data id: ${email} `,
          status: 200,
          data: result
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
}



exports.insertUser = (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    idUser,
    firstName,
    lastName,
    email,
    phoneNumber
  }
  userModels.insertUser(data)
    .then((result) => {
      res.json({
        data: result
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

// hash passowrd
exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName } = req.body
    const result = await userModels.findUser(email)

    if (result.length !== 0) {
      return helpers.response(res, null, 200, { email: 'Email already exists' })
    }
    const data = {
      email,
      password: await hashPassword.hashPassword(password),
      firstName,
      lastName: '',
      phoneNumber: '',
      bio: '',
      username: '',
      role: 2,
      active: false,
      image: '',
    }
    const resultInsert = await userModels.insertUser(data)
    // console.log(data.password);
    await mail.send(data.email, "verify");

    return helpers.response(res, {data, message: 'Registered, check your email!'}, 401, null)
  } catch (error) {
    return helpers.response(res, null, 500, { message: 'Internal Server Error' })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await userModels.findUser(email)
    if (result.length === 0) {
      return helpers.response(res, null, 200, { message: 'Email or Password is not registered' })
    }
    const user = result[0];
    
    // Jika mau pake verify email
    const isVerify = user.active
    if(isVerify == false){
      return helpers.response(res, null, 200, { message: 'Verify Your Email First' })
    } 
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return helpers.response(res, null, 200, { message: 'Email or Password is incorrect' })
    }
    delete user.password

    // JWT Payload
    const payload = { email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, saldo: user.saldo }
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, function (err, token) {
      user.token = token
      return helpers.response(res, user, 200, null)
    })
  } catch (error) {
   
    return helpers.response(res, null, 500, { message: 'Internal Server Error' })
  }
}

exports.verifyUser = async (req, res) => {
  // console.log(email);
  try {
    const {email} = req.body

    const result = await userModels.findUser(email)
    if (result.length === 0) {
      return helpers.response(res, null, 200, { message: 'Email is not registered' })
    }
    const user = result[0];
    // console.log(user);
    if (user.active === 1) {
      return helpers.response(res, null, 500, { message: 'Email is activated' })
    } else {
      
      await userModels.verifyUsers(user.email)
      .then((result) => {
        if (result.changedRows !== 0) {
          res.json({
            message: 'Succes Verify Email',
            status: 200,
          })
        } else {
          res.json({
            message: 'Email not found !',
            status: 500
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }

  } catch (err) {
    console.log(err);
    helper.printError(res, 500, err.message);
  }
  
  
}



exports.updateUser = (req, res) => {
  const idUser = req.params.idUser
  const { firstName, lastName, email, phoneNumber } = req.body

  const data = {
    firstName,
    lastName,
    email,
    phoneNumber
  }
  userModels.updateUser(idUser, data)
    .then((result) => {
      if (result.changedRows !== 0) {
        res.json({
          message: 'Succes update data',
          status: 200,
          data: data
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.updatePin = async (req, res) => {
  // const id = req.params.idUser
  const {idUser, pin, newpin } = req.body

  const data = {
    idUser,
    pin,
    newpin
  };
  try {
    const checkPin = await userModels.checkPins(idUser, pin)
    if (checkPin < 1) {
      helpers.response(res, null, 200, { message: "Incorect pin" })
      return;
    } 
    await userModels.updatePins(newpin, idUser);
    helpers.response( res, data, 200, null);
    } catch (err) {
    console.log(err);
    helpers.response(res, null, 200, { message: "erorr"});
  }
}

exports.updatePassword = async (req, res) => {
  // const id = req.params.idUser
  const {idUser, password, newpassword } = req.body

  const data = await hashPassword.hashPassword(newpassword);
  
  try {
    const checkPassword = await userModels.checkPasswords(idUser)
    // console.log(checkPassword);
    if (checkPassword < 1) {
      helpers.response(res, null, 200, { message: "Check Id User" })
      return;
  } 
    // console.log(checkPassword[0].password);
    const passHash = checkPassword[0].password;
    const isValid = await bcrypt.compare(password, passHash)
    // console.log(password);
    if (!isValid) {
      return helpers.response(res, null, 200, { message: 'Check Your Password' })
    }
    // console.log(data.newpassword);
    await userModels.updatePasswords(data, idUser);
    helpers.response( res, data, 200, null);
    } catch (err) {
    console.log(err);
    helpers.response(res, null, 200, { message: "erorr"});
  }
}





exports.deleteUser = (req, res) => {
  const idUser = req.params.idUser
  userModels.deleteUser(idUser)
    .then((result) => {
      if (result.affectedRows !== 0) {
        res.json({
          message: `Succes delete id: ${idUser}`,
          status: 200
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
