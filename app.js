// DEPENDENCIAS DE LIBRERÍAS
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db/database_connection');
const argon2 = require('argon2');
const login_routes = require ('./routes/rutas_login');

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
app.set('routes', __dirname + '/routes');



app.use('/',login_routes);

app.get('/register', (req, res) => {res.render('register');});

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
  if(req.session.isLoggedIn & req.session.user_type === 'alumno')
  {
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

app.get('/dashboard/ponente', (req,res)=>
{
  if(req.session.isLoggedIn & req.session.user_type === 'ponente')
  {
    username = req.session.username;
    full_name = req.session.full_name;
    email = req.session.email;
    user_type = req.session.user_type;
    res.render('dashboard_ponente',{username,full_name,email,user_type});
  }
  else
  {
    res.render('login');
  }
});

app.get('/admin', (req,res)=>
{
  if(req.session.isLoggedIn & req.session.user_type === 'administrador')
  {
    username = req.session.username;
    full_name = req.session.full_name;
    email = req.session.email;
    user_type = req.session.user_type;
    res.render('dashboard_admin',{username,full_name,email,user_type});
  }
  else
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
