const express = require("express");
const jwt = require("jsonwebtoken")
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
// const path = require("path")

const app = express();
const port = 5000;

// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb){
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// });

const upload = multer({
  dest: 'uploads/'
})

// const upload = multer({
//   storage: storage
// }).single('avatar');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bd",
  multipleStatements: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer().array())

// POST to add data in form
connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.connection = connection;
app.set("port", process.env.port || port);
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        success: true,
        authData
    })
    }
  })
})
function verifyToken (req, res, next){
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()
  } else {
    res.sendStatus(403)
  }
}
app.post("/login", (req, res) => { 
  const user = {
    email: req.body.email,
    pas: req.body.password
  }
  const query = `SELECT email, password FROM registration_info WHERE email = ? `;
  connection.query(query, [user.email], (err, rows, fields) => {
    if (user.email === rows[0].email) {
      if (user.pas === rows[0].password) {
        jwt.sign({user}, 'secretkey', { expiresIn: '20h' }, (err, token) => {
          res.json({
            token
          })
        });
      }
    } else {
        res.status(400);
    }
  });
});
app.post("/register", (req, res) => {
  let userData = {
    fN: req.body.firstName,
    lN: req.body.secondName,
    tn: req.body.thirdName,
    bD: req.body.brthDay,
    pos: req.body.position,
    tel: req.body.telephone,
    em: req.body.email,
    pas: req.body.pas,
    photo: req.body.photo
  }
  console.log(userData)
  connection.query(`SELECT email FROM registration_info WHERE email = ?`,[userData.em],(err, rows, fields) => {
    console.log(rows[0])
    if ( rows[0] ) {
      res.json( { message: "Такой пользователь уже есть" } );
    } else {
        const query2 = `INSERT INTO registration_info(id_registr_info, email, password, first_name, last_name,third_name, 
                        birthday_date, position, telefone, photo) VALUES ( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query2,[ userData.em,  userData.pas, userData.fN, userData.lN, userData.tn, userData.bD,userData.pos, userData.tel, userData.photo], (err, rows, fields) => {
          if ( err ) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.json(rows);
          }; 
        })
      }
  })  
})

app.post("/upload", (req, res) => {
  console.log(req.body)
  res.json({
    success: "OK"
  })
  // upload(req, res, (err) => {
  //   if (err) {
  //     res.json({
  //       msg: "Error"
  //     })
  //   } else {
  //     console.log(req.file)
  //   }
  // }) 
})
