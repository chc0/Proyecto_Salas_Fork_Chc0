const express = require('express');
const path = require('path');
const db = require('../db/database_connection');

const app = express()


const getRingGraph = (callback) => {
  db.query(
    'SELECT * FROM Ring_Graph',
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available in Ring_Graph view");
      }
    }
  );
};

const GET_ID_TRA= (callback) => {
  db.query(
    'SELECT ID_Tra FROM PONENCIAS',
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available in ID_Tra view");
      }
    }
  );
};

const getRingGraph_dates = (callback) => {
  db.query(
    'SELECT * FROM RG_Fechas',
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available in Ring_Graph view");
      }
    }
  );
};

const getEquiposByTrabId = (Id_Trab, callback) => {
  db.query(
    'SELECT * FROM TABLA_USUARIOS WHERE ID_Tra = ?',
    [Id_Trab],
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available for the specified Id_Trab");
      }
    }
  );
};


const getListaSedes = (callback) => {
  db.query(
    'SELECT Salon FROM PONENCIAS GROUP BY Salon ;',
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available for Salon");
      }
    }
  );
};


const getEquiposBySalon = (Id_Trab, callback) => {
  db.query(
    'SELECT * FROM USUARIOS_POR_SALAS WHERE Salon = ?;',
    [Id_Trab],
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available for the specified Id_Trab");
      }
    }
  );
};







app.get('/areas', (req, res) => {
  getRingGraph((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});


app.get('/fechas', (req, res) => {
  getRingGraph_dates((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});


app.post('/informacion_de_equipos', (req, res) => {
  const { Id_Trab } = req.body;
  console.log(Id_Trab)
  getEquiposByTrabId(Id_Trab, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});


app.get('/id_tras', (req, res) => {
  GET_ID_TRA((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

app.get('/sedes', (req,res) => 
{
  getListaSedes((error, result) => {
    if (error) {
        console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
  });


app.post('/informacion_por_salones', (req, res) => {
  const { Salon } = req.body;
  console.log(req.body);
  getEquiposBySalon(Salon, (error, result) => 
  {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(result);
      res.json(result);

    }
  });
});

module.exports = app;
