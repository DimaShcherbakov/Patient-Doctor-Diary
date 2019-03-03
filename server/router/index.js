const connection = require('../utils/config');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

global.connection = connection;

router.post('/fileupload', (req, res) => {
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

router.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    pas: req.body.password,
  };
  console.log(user)
  const query = 'SELECT email, password, id_registr_info FROM registration_info WHERE email = ? ';
  connection.query(query, [user.email], (err, rows, fields) => {
    if (rows[0]) {
      if (user.pas === rows[0].password) {
        jwt.sign({ user }, 'secretkey', { expiresIn: '20h' }, (err, token) => {
          if (token) {
            res.send({
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

router.post('/register', (req, res) => {
  const userData = {
    fN: req.body.firstName,
    lN: req.body.secondName,
    tn: req.body.thirdName,
    bD: req.body.brthDay,
    pos: req.body.position,
    tel: req.body.telephone,
    em: req.body.email,
    pas: req.body.pas1,
    photo: req.body.photo,
  };
  console.log(userData)
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

router.get('/user/:id', (req, res) => {
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
        phone: rows[0].telefone,
        bDay: rows[0].birthday_date,
        pos: rows[0].position,
        email: rows[0].email,
      });
    }
  });
});

router.get('/user/:id/:sort/patients/', (req, res) => {
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

router.post('/registration/patient', (req, res) => {
  const data = req.body;
  const {
    id, name, surname, middleName, bday, telephone, job, registration, email, password,
  } = data;
  console.log(data);
  const query = `INSERT INTO pacients_data (id_pacient, id_registr_info, first_name, last_name, third_name, brth_day, reg_place, work_place, phone, photo, email, pas, pacients_data_analyse) VALUES 
                (NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, NULL)`;
  connection.query(query, [id, name, surname, middleName, bday, registration, job, telephone, email, password], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});

router.post('/messages', (req, res) => {
  const message = req.body;

});

module.exports = router;
