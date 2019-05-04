const router = require('express').Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs-extra');
const connection = require('../utils/config');

global.connection = connection;

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, '/assets'),
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     crypto.pseudoRandomBytes(16, (err, raw) => {
//       if (err) return cb(err);
//       cb(null, raw.toString('hex') + path.extname(file.originalname));
//     });
//   },
// });

router.post('/imageupload', (req, res) => {
  if (req.files) {
    const file = req.files.avatar;
    const filename = file.name;
    file.mv(`./router/assets/${filename}`, (err) => {
      if (err) {
        res.status(400).send({
          error: {
            message: 'Photo is already existed',
          },
        });
      } else {
        const fullpath = path.join('/assets/', filename);
        res.status(200).send(fullpath);
      }
    });
  }
});

router.post('/patient/login', (req, res) => {
  const user = {
    email: req.body.email,
    pas: req.body.password,
  };
  const query = 'SELECT email, pas, id_pacient, first_name, last_name, third_name FROM pacients_data WHERE email = ? ';
  connection.query(query, [user.email], (err, rows, fields) => {
    if (rows[0]) {
      if (user.pas === rows[0].pas) {
        jwt.sign({ user }, 'secretkey', { expiresIn: '20h' }, (err, token) => {
          if (token) {
            res.send({
              token,
              id: rows[0].id_pacient,
              firstName: rows[0].first_name,
              lastName: rows[0].last_name,
              thirdName: rows[0].third_name,
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

router.post('/patient/diary', (req, res) => {
  const {
    id,
    date,
    time,
    state,
    note,
    pill,
  } = req.body;
  const query = 'INSERT INTO pat_analyzes (`id_pat_analyzes`, `id_patient`, `date`, `time`, `state`, `pill`, `note`) VALUES (null, ?,?,?,?,?,?)';
  connection.query(query, [id, date, time, state, pill, note], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});

router.post('/patient/diary/:id/', (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  const query = 'SELECT `time`, `state`, `pill`, `note` FROM `pat_analyzes` WHERE id_patient = ? AND date = ?';
  connection.query(query, [id, date], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});

router.post('/login', (req, res) => {
  const user = {
    email: req.body.email,
    pas: req.body.password,
  };
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
        res.status(418).send('Неверный пароль');
      }
    } else {
      res.status(406).send('Неверный логин');
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
  connection.query('SELECT email FROM registration_info WHERE email = ?', [userData.em], (err, rows, fields) => {
    if (rows[0]) {
      res.json({ error: 'Такой пользователь уже есть' });
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

router.get('/user/diagnosis/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM `diagnosis` WHERE id_pacient = ?';
  connection.query(query, [id], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});

router.get('/user/pills/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM `diary_pacients` WHERE id_pacient = ?';
  connection.query(query, [id], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});

//--------------------------------------------------------------------------
router.get('/user/notes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM pat_analyzes WHERE id_patient = ? ORDER BY pat_analyzes.date DESC';
  connection.query(query, [id], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});
//--------------------------------------------------------------------------

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
  const query = `INSERT INTO pacients_data (id_pacient, id_registr_info, first_name, last_name, third_name, brth_day, reg_place, work_place, phone, photo, email, pas, pacients_data_analyse) VALUES 
                (NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, NULL)`;
  connection.query(query, [id, name, surname, middleName, bday, registration, job, telephone, email, password], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.send(rows);
    }
  });
});

router.post('/user/patients/diagnos', (req, res) => {
  const user = {
    diagnos: req.body.diagnosis_name,
    id: req.body.id,
    date: req.body.date,
    note: req.body.note,
  };
  const { id, diagnos, date, note } = user;
  const query = 'INSERT INTO diagnosis (id_diagnosis, id_pacient, diagnosis_name, date, note) VALUES (NULL, ?, ?, ?, ?)';
  connection.query(query, [id, diagnos, date, note], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});

router.post('/user/patients/pills', (req, res) => {
  const data = {
    id: req.body.id,
    note: req.body.note,
    drugs: req.body.drugs,
    dose: req.body.dose,
    date: req.body.date,
  };
  const { id, note, drugs, dose, date } = data;
  const query = 'INSERT INTO diary_pacients (id_diary, id_pacient, note, drugs, dose, date) VALUES (NULL, ?, ?, ?, ?, ?)';
  connection.query(query, [id, note, drugs, dose, date], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});

//---------------------------
router.get('/patients/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM `pacients_data` WHERE id_pacient = ?';
  connection.query(query, [id], (err, rows, fields) => {
    if (err) {
      res.status(500);
    } else {
      res.json(rows);
    }
  });
});
//---------------------------
router.post('/fileupload', (req, res) => {
  const obj = {};
  const query = 'INSERT INTO examination_data (id_examination, id_pacient, examination_date, examination_file) VALUES (NULL,?,?,?)';
  if (req.busboy) {
    let fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
      fstream = fs.createWriteStream(`./public/patients_analizes/${filename}`);
      file.pipe(fstream);
      obj.filepath = `/patients_analizes/${filename}`;
      fstream.on('close', () => {
        console.log('closed');
      });
    });
    req.busboy.on('field', (key, value) => {
      obj[key] = value;
    });
    req.busboy.on('finish', () => {
      const { id, date, filepath } = obj;
      console.log(id, date, filepath);
      connection.query(query, [id, date, filepath], (err, rows, fields) => {
        if (err) {
          res.status(500);
        } else {
          res.status(200).json({
            file: filepath,
          });
        }
      });
    });
  }
});

module.exports = router;
