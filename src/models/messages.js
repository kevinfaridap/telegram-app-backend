const { query } = require('express')
const connection = require('../configs/db')

exports.createMessages = (data) => {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO message SET ?",
            [data],
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error("Internal server error"));
                }
            }
        )
    })
}

exports.findUsers= (idUser) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from users WHERE id = ?', idUser, (err, result) => {
        if (!err) {
            resolve(result)
        } else {
            reject(err)
        }
        })
    })
}
 

exports.findReceivers= (idReceiver) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from users WHERE id = ?', idReceiver, (err, result) => {
        if (!err) {
            resolve(result)
        } else {
            reject(err)
        }
        })
    })
}


exports.getMessagesById = (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM message WHERE id= ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

   // SELECT * FROM message WHERE idUser=16 && idReceiver=18 || idUser=18 && idReceiver=16
      // connection.query(`SELECT * FROM message WHERE idUser=? && idReceiver=? LIMIT 0, 25`, [idUser , idReceiver] ,(err, result) => {
  exports.getMessagesHistory = (idUser , idReceiver ) => {
    return new Promise((resolve, reject) => {
     
      connection.query(`SELECT * FROM message WHERE idUser=${idUser} && idReceiver=${idReceiver} || idUser=${idReceiver} && idReceiver=${idUser} ORDER BY dateTime ASC LIMIT 0, 50`, [idUser , idReceiver] ,(err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }