// DEPENDENCIAS DE LIBRERÍAS
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db/database_connection');
const argon2 = require('argon2');

//EXPRESS Y MIDDLEWARE
const app = express();
const port = 3000;
app.use(session({
  secret: 'ea05839e74e8836ad2e903208a28006c', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000, 
  },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// DIRECTORIOS DE ARCHIVOS
app.set('views', __dirname + '/views');
app.set('js', __dirname + '/js');
app.use(express.static(__dirname + '/public'));

// RUTAS Y MÉTODOS.
app.get('/login', (req, res) => {res.render('login');});
app.get('/register', (req, res) => {res.render('register');});
app.get('/dashboard',(req, res) => {res.render('dashboard');});

app.post('/login', (req, res) => 
{
  const { username_or_email, password } = req.body;
  console.log(username_or_email);
  get_pwd_hash(username_or_email, (err, pwd_hash_res)=>
  {
    if(err){console.log(err);res.render('login')}
    else
    {
      verifyPassword(pwd_hash_res,password).then((password_Matches) => 
      {
        if (password_Matches) 
        {
          req.session.isLoggedIn = true;
          console.log('SESIÓN INICIADA!!');
          res.render('dashboard');
        } else 
        {
          console.log('INTENTO DE SESIÓN FALLIDO');
        }
      })
      .catch((error) => 
      {
          console.error('Password hashing failed:', error);
      });
    }
  });
});



app.post('/register', (req, res) => 
{
    const { username, email, full_name, password } = req.body;
    hashPassword(password).then((contr_encriptada)=>
    {
    console.log( "HASH CREADO DE CONTRASEÑA: " + contr_encriptada)
    db.query(
      'INSERT INTO USUARIO (tipo_usuario, password_hash, email, nombre_completo, nombre_usuario) VALUES(?, ?, ?, ?,?) ;',
      [ 'alumno' ,contr_encriptada, email, full_name, username],
      (err, sql_res) =>
      {
        if (err) {console.error(err);return res.status(500).send('Internal Server Error at Registration');}
        if (sql_res.affectedRows === 1)
        {
          console.log("REGISTRATION OF USER " + username); 
          res.render('login')
        } 
        else {return res.status(401).send('REGISTRATION FAILED');}
      });
    }).catch((error) =>
    {
    // Handle the error here (e.g., log, return an error response)
    console.error('ERROR AL HASHEAR CONTRASEÑA:', error);
    });
  });


// FUNCIONES

async function hashPassword(password)
{
  try 
  {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) 
  {
    console.error('Error hashing password:', error);
    throw error;
  }

}

async function verifyPassword(hashedPassword, providedPassword) 
{
  try 
  {
    const passwordMatches = await argon2.verify(hashedPassword, providedPassword);
    return passwordMatches;
  } catch (error) 
  {
    console.error('Error verifying password:', error);
    throw error;
  }
}

function get_pwd_hash(username_or_email, callback)
{
  console.log("did THIS");
  db.query(
    'SELECT PASSWORD_HASH FROM USUARIO WHERE NOMBRE_USUARIO = ? OR EMAIL = ?', 
    [username_or_email,username_or_email],
    (err, sql_res) =>
    {
      if (err) {console.error(err);callback("sql_error")}
      if (sql_res.length === 1)
      {
        const passwordHash = sql_res[0].PASSWORD_HASH;
        console.log(passwordHash); 
        callback(null,passwordHash);
      } 
      else{callback("USER NOT FOUND");}
    })
}

// SERVIDOR
app.listen(port, () => 
{
    console.log(`Server is running on port ${port}`);
});
