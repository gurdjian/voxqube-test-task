const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors')

const Voxqube = require('./models/voxqube');

const indexRouter = require('./routes/index');
const voxqubeRouter = require('./routes/voxqube');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/voxqube', voxqubeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// work with DB
async function main() {
  await mongoose.connect('mongodb://localhost:27017/voxqube', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main().catch(err => {
  console.log('mongoDB error:', err)
  process.exit(1);
});


// request data from API
const urlAPI = 'https://api.voxqube.com:7000/api/v2/voices/list'
axios.get(urlAPI)
.then(async (response) => {
  if (Array.isArray(response.data)) {
    await Voxqube.deleteMany({});
    Voxqube.insertMany(response.data, function(error, docs) {
      if (error) {
        throw new Error(error);
      }
      if (response.data.length !== docs.length) {
        throw new Error(`Validated only ${docs.length} docs of ${response.data.length} received`);
      } 
      console.log(`Success. Validated ${docs.length} docs of ${response.data.length} received`);
    })
  } else {
    throw new TypeError('wrong data from API');
  }
})
.catch(err => console.log('axios error: ', err));


/**
 * Module dependencies.
 */

//const app = require('../app');
const debug = require('debug')('voxqube:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
