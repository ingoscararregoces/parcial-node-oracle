const oracledb = require("oracledb");

export async function ConenectionDb() {
  try {
    // oracledb.initOracleClient();
    // oracledb.initOracleClient({ libDir: 'c:\\oracle\\product\\19.3.0.0\\db_1' });

    const connection = await oracledb.getConnection({
      user: "oscar",
      password: "12345",
      connectString:"localhost:1521/xe",
      // connectString:"(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))",
    });
    // console.log('----- CONEXION DB EXITOSA -----');
    // await connection.close();   // Always close connections
    return connection;
  } catch (error) {
    console.log('ERROR CONEXION DB',error);
  }
}
