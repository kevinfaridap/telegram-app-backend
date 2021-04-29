const jwt = require('jsonwebtoken')
const helper = require('../helpers/helper')

function verify () {
  return function (req, res, next) {
    // const role = req.body.role;

    const tokenWithBearer = req.headers.authorization
    if (tokenWithBearer) {
      let token = tokenWithBearer.split(' ')
      token = token[1]
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          return helper.response(res, null, 401, {
            message: 'Token not registered!'
          })
        } else {
          const role = decoded.role
          // console.log(role);
          if (role == 1) {
            req.auth = decoded

            next()
          } else {
            return helper.response(res, null, 200, {
              message: 'You dont have permission!'
            })
          }
        }
      })
    } else {
      return helper.response(res, null, 401, {
        message: 'Token tidak tersedia!'
      })
    }
  }
}

module.exports = {
  verify
}
