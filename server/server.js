const express = require('express');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const socket = require('socket.io');
// const cors = require('cors')
// const verifyToken = require('./middleware/verifyToken');
const router = require('./router/index');

const app = express();
const port = 5000;

// app.use(cors)
app.use(upload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, DELETE, OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.set('port', process.env.port || port);
const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
app.use('/', router);
const io = socket(server);

io.on('connection', (socket) => {
  console.log('socket was connected');
  socket.on('disconnect', () => {
    console.log('user disconnected')
  });
});
