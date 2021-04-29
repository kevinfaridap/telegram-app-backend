const messageModels = require('../models/messages')
const userModels = require('../models/users')
const helper = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid');

exports.sendMessage = async (req, res) => {
    const { idUser, idReceiver, body} = req.body;
    const data = {
        id: uuidv4(),
        idUser,
        idReceiver,
        body,
    };
    try {
        const user = await messageModels.findUsers(idUser)
        if (user < 1) {
            helper.response(res, null, 200, { message: 'There is no user' })
            return;
        } else {
            const receiver = await messageModels.findReceivers(idReceiver)
            if (receiver < 1) {
                helper.response(res, null, 200, { message: "There is no id receiver" })
                return;
            }
            await messageModels.createMessages(data);
            helper.response( res, data, 200, null);
            
            // const getNewestData = await messageModels.getDataById(data.id)
            // if (getNewestData.length !== 0){
            // }
        }
    } catch (err) {
        console.log(err);
        helper.response(res, null, 200, { message: "erorr"});
    }
};


exports.getMessageById = (req, res) => {
    const idMessage = req.params.id
    messageModels.getMessagesById(idMessage)
      .then((result) => {
        if (result.length > 0) {
          res.json({
            message: `Succes get data message id: ${idMessage}`,
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




