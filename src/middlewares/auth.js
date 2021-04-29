const jwt = require('jsonwebtoken')
const helpers = require('../helpers/helper')

const verifyAccess = (req, res, next) => {
  const authorization = req.headers.authorization
  // console.log(authorization);
  if (!authorization) {
    return helpers.response(res, null, 401, {
      message: 'Server needs token!'
    })
  }
  let token = authorization.split(' ')
  token = token[1]

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return helpers.response(res, null, 401, {
          message: 'Invalid Signature!'
        })
      } else if (err.name === 'TokenExpiredError') {
        return helpers.response(res, null, 401, {
          message: 'Jwt expired'
        })
      }
    }
    
    // U/ kirim email ke controller
    req.email = decoded.email
    next()
    // console.log(decoded);
  })
}

module.exports = {
  verifyAccess
}
