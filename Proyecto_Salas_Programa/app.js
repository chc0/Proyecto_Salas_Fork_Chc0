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
app.get('/',(req,res)=>{res.redirect('/login')})
app.get('/login', (req, res) => {res.render('login');});
app.get('/register', (req, res) => {res.render('register');});

app.post('/login', (req, res) => 
{
  const { username_or_email, password } = req.body;
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
          get_everything(username_or_email,(err,everything)=>
          {
            req.session.username = everything[0].nombre_usuario;
            req.session.full_name = everything[0].nombre_completo;
            req.session.user_type = everything[0].tipo_usuario;
            req.session.email = everything[0].email;
            res.redirect('/dashboard');
          });
        } else 
        {
          console.log('INTENTO DE SESIÓN FALLIDO');
        }
      })
      .catch((error) => 
      {
          console.error('Hasheo de contraseña fallido:', error);
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


app.get('/dashboard', (req, res) =>
{
  if(req.session.isLoggedIn)
  {
    console.log("HELLO; USER LOGGED IN IS = " + req.session.username);
    username = req.session.username;
    full_name = req.session.full_name;
    email = req.session.email;
    user_type = req.session.user_type;
    res.render('dashboard',{username,full_name,email,user_type});
  }else
  {
    res.render('login');
  }
});


app.get('/logout', (req, res) => 
{
    req.session.destroy((err) => 
    {
        if (err) {
            console.error('Error destroying session:', err);
        } else 
        {
          res.redirect('/login');
        }
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
  db.query(
    'SELECT PASSWORD_HASH FROM USUARIO WHERE NOMBRE_USUARIO = ? OR EMAIL = ?', 
    [username_or_email,username_or_email],
    (err, sql_res) =>
    {
      if (err) {console.error(err);callback("sql_error")}
      if (sql_res.length === 1)
      {
        const passwordHash = sql_res[0].PASSWORD_HASH;
        callback(null,passwordHash);
      } 
      else
      {
        callback("USER NOT FOUND");
      }
    })
}

function get_everything(username_or_email, callback)
{
  db.query(
    'SELECT * FROM USUARIO WHERE NOMBRE_USUARIO = ? OR EMAIL = ?', 
    [username_or_email,username_or_email],
    (err, sql_res) =>
    {
      if (err) {console.error(err);callback("sql_error")}
      if (sql_res.length === 1)
      {
        callback(null,sql_res);
      } 
      else
      {
        callback("USER NOT FOUND");
      }
    })
}

// SERVIDOR
app.listen(port, () => 
{
    console.log(`Server is running on port ${port}`);
});
