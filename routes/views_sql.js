const express = require('express');
const path = require('path');
const db = require('../db/database_connection');

const app = express()


function get_Area(callback)
{
  db.query(
    'SELECT Area, Rama FROM PONENCIAS', 
    (err, sql_res) =>
    {
      if (err) {console.error(err);callback("sql_error")}
      if (sql_res.length === 1)
      {
        callback(null,sql_res);
      } 
      else
      {
        callback("NO HAY AREAS REGISTRADAS!");
      }
    })
}

app.get('/areas', (req, res) => {
  get_Area((err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(data);
  });
});

module.exports = app;
