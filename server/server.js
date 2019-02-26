const express = require('express');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
// const multer = require('multer');
// const verifyToken = require('./middleware/verifyToken');
const router = require('./router/index')
// const upload = multer({
//   dest: 'uploads/',
// });

const app = express();
const port = 5000;
//----------------
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
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
app.use('/', router)
  