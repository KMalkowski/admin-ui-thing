import * as mysql from "mysql2/promise";
async function getSchema() {
  const connection = await mysql.createConnection(
    process.env.DATABASE_URL || ""
  );

  const [rows] = await connection.execute("SHOW TABLES");
  console.log(rows);
}

getSchema();
