const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messages')


router

//   .get('/', messageController.getmessage)
//   .get('/:id', messageController.getmessageById)
//   .post('/', messageController.insertmessage)
//   .put('/:id', messageController.updatemessage)
//   .delete('/:id', messageController.deletemessage)

    // .get("/")
    .get("/:iduser/:idreceiver", messageController.getMessageHistory)
    .post("/sendmessage", messageController.sendMessage)
    // .get("/:id", messageController.getMessageById)
    // .get("/receiver/:idreceiver", messageController.getReceiver)
module.exports = router