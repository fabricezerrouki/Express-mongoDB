/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Config = require('./config/config')
const database = require('./config/database')

const apis = require('./routes/routes')

const app = express()

// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', process.env.PFPLUS_PRODUCTION_URL);
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   //Auth Each API Request created by user.
//   next();
// });


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', apis)

var port = process.env.PORT || 8000 // set our port

const server = app.listen(port, () => {
  var host = server.address().address
  var port = server.address().port
  // eslint-disable-next-line no-console
  console.log('😀 app listening at http://%s:%s', host, port)
})
