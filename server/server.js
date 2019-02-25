const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const upload = require('express-fileupload');
const multer = require('multer');

// const upload = multer({
//   dest: 'uploads/',
// });

const app = express();
const port = 5000;
//----------------
app.use(upload());

app.post('/fileupload', (req, res) => {
  if (req.files) {
    const file = req.files.filename;
    const filename = file.name;
    file.mv(`./patients_analizes/${filename}`, (err) => {
      if (err) {
        console.log(err);
        res.send('Error occured');
      } else {
        res.send('Done');
      }
    });
  }
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd',
  multipleStatements: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

global.connection = connection;
app.set('port', process.env.port || port);
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        success: true,
        authData,
      });
    }
  });
});

app.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    pas: req.body.password,
  };
  const query = 'SELECT email, password, id_registr_info FROM registration_info WHERE email = ? ';
  connection.query(query, [user.email], (err, rows, fields) => {
    console.log(rows[0])
    if (rows[0]) {
      if (user.pas === rows[0].password) {
        jwt.sign({ user }, 'secretkey', { expiresIn: '20h' }, (err, token) => {
          if (token) {
            console.log()
            res.json({
              token,
              id: rows[0].id_registr_info,
            });
          } else {
            res.sendStatus(500);
          }
        });
      } else {
        res.status(418).json({ message: 'Неверный пароль' });
      }
    } else {
      res.status(406).json({ message: 'Неверный логин' });
    }
  });
});

app.post('/register', (req, res) => {
  const userData = {
    fN: req.body.firstName,
    lN: req.body.secondName,
    tn: req.body.thirdName,
    bD: req.body.brthDay,
    pos: req.body.position,
    tel: req.body.telephone,
    em: req.body.email,
    pas: req.body.pas,
    photo: req.body.photo,
  };
  console.log(userData);
  connection.query('SELECT email FROM registration_info WHERE email = ?', [userData.em], (err, rows, fields) => {
    if (rows[0]) {
      res.json({ error: 'Такой пользователь уже есть' });// status code 400
    } else {
      const query2 = `INSERT INTO registration_info(id_registr_info, email, password, first_name, last_name,third_name, 
                      birthday_date, position, telefone, photo) VALUES ( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(query2, [userData.em, userData.pas, userData.fN, userData.lN, userData.tn, userData.bD, userData.pos, userData.tel, userData.photo], (err, rows, fields) => {
        if (err) {
          res.status(500);
        } else {
          res.json(rows);
        }
      });
    }
  });
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM `registration_info` WHERE id_registr_info = ?';
  connection.query(query, [id], async (err, rows, fields) => {
    console.log(rows[0]);
    if (err) {
      res.status(500);
    } else {
      await res.json({
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        thirdName: rows[0].third_name,
        photo: rows[0].photo,
      });
    }
  });
});

app.get('/user/:id/:sort/patients/', (req, res) => {
  const { id } = req.params;
  const { sort } = req.params;
  const queryNorm = 'SELECT * FROM `pacients_data` WHERE id_registr_info = ?';
  const queryASC = 'SELECT * FROM `pacients_data` WHERE id_registr_info = ? ORDER BY last_name ASC';
  const queryDESC = 'SELECT * FROM `pacients_data` WHERE id_registr_info = ? ORDER BY last_name DESC';
  // const query = 'SELECT * FROM `pacients_data` LEFT JOIN `registration_info` ON `pacients_data`.`id_registr_info` = `registration_info`.`id_registr_info` WHERE `pacients_data`.`id_registr_info` = ?';
  switch (sort) {
    case 'norm':
      connection.query(queryNorm, [id], (err, rows, fields) => {
        if (err) {
          res.status(500);
        } else {
          res.json(rows);
        }
      });
      break;
    case 'asc':
      connection.query(queryASC, [id], (err, rows, fields) => {
        if (err) {
          res.status(500);
        } else {
          res.json(rows);
        }
      });
      break;
    case 'desc':
      connection.query(queryDESC, [id], (err, rows, fields) => {
        if (err) {
          res.status(500);
        } else {
          res.json(rows);
        }
      });
      break;
    default: break;
  }
});

app.post('/registration/patient/', (req, res) => {
  const data = req.body;
  const query = `INSERT INTO pacients_data (id_pacient, id_registr_info, first_name, last_name, third_name, brth_day, reg_place, work_place, phone, photo, email, pas, pacients_data_analyse) VALUES 
                ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11],[value-12],[value-13])`;
  connection.query(query, [], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});

// SORTING // SELECT * FROM `pacients_data` LEFT JOIN `registration_info` ON `pacients_data`.`id_registr_info` = `registration_info`.`id_registr_info` WHERE `pacients_data`.`id_registr_info` = 13 ORDER BY `pacients_data`.`first_name` ASC

// app.post('/upload', upload.single('productImage'), (req, res) => {
//   console.log(req.file);
//   res.json();
// });
