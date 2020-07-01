//====== SERVIDOR CON EXPRESS
const express = require('express');
const app = express();

//====== SETTINGS (Configuraciones)
app.set('appNombre', 'Tutorial de Express JULIO LUGO');
app.set('puerto', 3000);
//app.set('motorPlantilla', 'ejs' );


//====== MIDDLEWARES
//Para que EXPRESS pueda entender los JSON
app.use(express.json());



const oracledb = require('oracledb')
const datosConeccion = {
  user: 'HR',
  password: 'hr',
  connectString: '192.168.0.137:1521/XEPDB1'
}


async function getEmployee (empId) {
  let conn

  try {
    conn = await oracledb.getConnection(datosConeccion)

    const result = await conn.execute(
      'select * from employees where employee_id = :id',
      [empId]
    )

    console.log(result.rows[0])

  } catch (err) {
    console.log('Ouch!', err)
  } finally {
    if (conn) { // conn assignment worked, need to close
      await conn.close()
    }
  }
}

getEmployee(100);
getEmployee(101);
getEmployee(102);



//===== RUTAS

//app.get('/', (req, res ) => {
  
  //const datos = [{nombre: 'Raul'}, {nombre: 'Pedro'}, {nombre: 'Juan'}, {nombre: 'Jesus'},{nombre: 'Julio'}];
  //const datos = getEmployee(100);
  //res.render('index.ejs',{personas: datos});
  
 //getEmployee(100);


//})



//===== SERVIDOR ESCUCHANDO
app.listen(app.get('puerto'), () => {
  console.log(app.get('appNombre'));

  console.log('Servidor en puerto: ', app.get('puerto'));

});