const express = require('express');
const app = express()

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





module.exports = app;
