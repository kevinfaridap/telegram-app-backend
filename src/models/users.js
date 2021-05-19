const connection = require('../configs/db')

const user = {

  countUsers: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS totalData FROM users ', (err, result) => {
        if (err) {
          reject(new Error('Internal server error'))
        } else {
          resolve(result)
        }
      })
    })
  },


  getUsers: (firstname, offset, limit, by, order) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE firstName LIKE '%${firstname}%' ORDER BY ${by} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (!err) {
          // console.log(result);
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  // Tambah pagi+sort diatas
  // getUsers: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('SELECT * FROM users', (err, result) => {
  //       if (!err) {
  //         resolve(result)
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  // },

  getUserById: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id= ?', idUser, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE email= ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  insertUser: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  // Ganti dengan finduser
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(email) as countEmail FROM users WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  findUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from users WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  findUserTransaction: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * from users WHERE id = ?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  checkPins: (idUser, pin) => {
      return new Promise((resolve, reject) => {
          connection.query(
              `SELECT pin from users WHERE id=${idUser} and pin=${pin}`,
              (err, result) => {
                  if (!err) {
                      resolve(result);
                  } else {
                      reject(new Error(err));
                  }
              }
          );
      });
  },


  updateProfiles: (idUser, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id=?', [data, idUser], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  removeBios: (idUser, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET bio='${data.bio}' WHERE id = ${idUser}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  updatePins: (newpin, idUser) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET pin=${newpin} WHERE id = ${idUser}`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  checkPasswords: (idUser) => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT password from users WHERE id=${idUser}`,
            (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            }
        );
    });
},


updatePasswords: (data, idUser) => {
  return new Promise((resolve, reject) => {
    // connection.query(`UPDATE users SET password=${data} WHERE id = ${idUser}`, (err, result) => {
      connection.query(`UPDATE users SET password = ? WHERE id = ?`,[data, idUser], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
},


  updateUser: (idUser, data) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE users SET ? WHERE id=?', [data, idUser], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },


  verifyUsers: (email) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE users SET active = true WHERE email = ?", email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },



  deleteUser: (idUser) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE id=?', idUser, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }

}

module.exports = user
