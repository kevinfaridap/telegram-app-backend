const express = require('express')
const route = express.Router()

const routeUsers = require('./users');
const routeMessages = require('./messages');

route.use('/users', routeUsers)
route.use('/message', routeMessages)


module.exports = route
