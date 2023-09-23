// DEPENDENCIAS DE LIBRERÍAS
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/database_connection');
const argon2 = require('argon2');

//EXPRESS Y MIDDLEWARE
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// DIRECTORIOS DE ARCHIVOS
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// RUTAS Y MÉTODOS.
app.get('/login', (req, res) => {res.render('login');});
app.get('/register', (req, res) => {res.render('register');});


app.post('/login', (req, res) => 
{
  const { username_or_email, password } = req.body;

  db.query(
    'SELECT PASSWORD_HASH FROM USUARIO WHERE NOMBRE_USUARIO = ? OR EMAIL = ?', 
    [username_or_email,username_or_email],
    (err, res) =>
    {
      if (err) {console.error(err);return res.status(500).send('Internal Server Error');}
      if (results.length === 1)
      {
        const passwordHash = res[0].PASSWORD_HASH;
        console.log(passwordHash); 
        return res.status(200).send('Login successful');
      } 
      else {return res.status(401).send('Authentication failed');}
    })
});

app.post('/register', (req, res) => 
{
   

    
});


// SERVIDOR

app.listen(port, () => 
{
    console.log(`Server is running on port ${port}`);
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


// VERIFY PASSWORD USAGE EXAMPLE
// verifyPassword(hashedPassword, password)
// .then((passwordMatches) => {
//   if (passwordMatches) {
//     console.log('Password is correct');
//   } else {
//     console.log('Password is incorrect');
//   }
// })
// .catch((error) => 
// {
//   console.error('Password hashing failed:', error);
// });
