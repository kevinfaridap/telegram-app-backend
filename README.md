<h3 align="center">Telegram App Api</h3>
  <p align="center">
   <img src="https://user-images.githubusercontent.com/74039235/119268981-91241080-bc1f-11eb-8c7d-f5f0b8135566.png" style="margin-left: auto; margin-right: auto;" />
  </p>
  <p align="center">
   This Api is for Telegram App. These are documentation for backend telegram apps that explain how to install and run the backend.
  </p>


## Built With
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Sockt.IO](https://socket.io/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](database-example.sql)


#### User Endpoint

|  METHOD  |             API              |                    REMARKS                    |
| :------: | :-------------------------:  | :-------------------------------------------: |
|  `POST`  |       /users/register        |      Register User and Activation Email       |
|  `POST`  |        /users/login          |        Sign in with a verified account        |
|  `PUT`   |        /users/verify         |                  Verify account               |
|  `GET`   |        /users/profile        |          Get User Profile by Decoded Email    |
|  `GET`   |         /users/:id           |                 Get User by Id                |
|  `GET`   |    /users/getalluser/:id     |       Get All User Except Loginned User       |
|  `PUT`   |         /removebio           |           Remove Bio/Status in Profile        |
|  `PUT`   |         /users/:id           |                 Edit Data By id               |
|  `PUT`   |       /users/updatepin       |             Update User's Pin By id           |
|  `PUT`   |    /users/changepassword     |              Change User's Password           |
| `DELETE` |         /users/:id           |                Delete Data By id              |


#### Message Endpoint

|  METHOD  |             API              |                    REMARKS                    |
| :------: | :-------------------------:  | :-------------------------------------------: |
|  `GET`   | /message/:iduser/:idreceiver |  Get Message History by idSender & idReceiver |
|  `POST`  |    /message/sendmessage      |            Send Message to Database           |





## Installation

Clone this repository and then use the package manager npm to install dependencies.


```bash
npm install
```

## Setup .env example

Create .env file in your root project folder.

```env

PORT=8081
DB_HOST=localhost
DB_USER =root
DB_PASSWORD=your_password
DB_NAME=hiring_channel
SECRET_KEY= 'iniprivatekey'
AUTH_EXPIRES=1h

```

## Run the app

Development mode

```bash
npm run dev
```

Deploy mode

```bash
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


># Visit Project
- :white_check_mark: [Frontend](https://github.com/kevinfaridap/telegram-app-frontend)
- :rocket: [Telegram Apps [Demo Application]](https://mytelegram-app.netlify.app/)


