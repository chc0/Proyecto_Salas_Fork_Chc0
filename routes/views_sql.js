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
    'SELECT Salon FROM PONENCIAS GROUP BY Salon;',
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


const Actualizar_lista_asistencias = (Id_Trab, Array_Asistencias, callback) => {
  db.query(
    'UPDATE PONENCIAS SET Asistencia = ? WHERE ID_Tra = ?',
    [JSON.stringify(Array_Asistencias), Id_Trab],
    (updateErr, updateRes) => {
      if (updateErr) {
        console.error(updateErr);
        callback("update_error");
      } else {
        callback(null, updateRes);
      }
    }
  );
};

const GET_TOTAL_PON= (callback) => {
  db.query(
    'SELECT COUNT(*) FROM PONENCIAS2',
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available in Ponencias2 ");
      }
    }
  );
};

const GET_ID_PON= (callback) => {
  db.query(
    'SELECT ID_Pon FROM PONENCIAS2',
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available in ID_Pon view");
      }
    }
  );
};

const getPonenciasById = (Id_Pon, callback) => {
  db.query(
    'SELECT * FROM PONENCIAS2 WHERE ID_Pon = ?',
    [Id_Pon],
    (err, sqlRes) => {
      if (err) {
        console.error('Error en la consulta de getPonenciasById:', err);
        callback(err, null);
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        console.log('No se encontraron datos para el ID_Pon:', Id_Pon);
        callback(`No data available for the specified Id_Pon: ${Id_Pon}`, null);
      }
    }
  );
};


const getParametros = (callback) => {
  db.query(
    'SELECT * FROM PARAMETROS',
    (err, sqlRes) => {
      if (err) {
        console.error(err);
        callback("sql_error");
      } else if (sqlRes.length > 0) {
        callback(null, sqlRes);
      } else {
        callback("No data available in PARAMETROS");
      }
    }
  );
};


app.get('/parametros', (req, res) => {
  getParametros((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});



app.post('/informacion_de_ponencias', (req, res) => {
  const { ID_Pon } = req.body;
  console.log('ID_Pon recibido:', ID_Pon);

  getPonenciasById(ID_Pon, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});


app.get('/id_pon', (req, res) => {
  GET_ID_PON((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});

app.get('/total_ponencias', (req, res) => {
  GET_TOTAL_PON((error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});


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
  console.log(Salon);
  getEquiposBySalon(Salon, (error, result) => 
  {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);

    }
  });
});

app.post('/asistencia', (req, res) => {
  console.log("recieved asistencia request");
  const { Id_Trab, Asistencia } = req.body;
  Actualizar_lista_asistencias(Id_Trab, Asistencia, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Successfully updated asistencia array.' });
  });
});



module.exports = app;
