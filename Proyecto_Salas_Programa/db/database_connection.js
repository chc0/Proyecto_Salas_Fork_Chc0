const mysql = require('mysql2');

const pool = mysql.createConnection(
  {
    host: '172.17.0.2',
    user: 'alvirelwapo',
    password: '6327',
    database: 'SALAS_DB'
  });


module.exports = pool;

