require("dotenv").config();
const { DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE, INSTANCIA } = process.env;
const sql = require("mssql");

// Configs db
const configdb = {
  user: DB_USER || "",
  password: DB_PASSWORD || "",
  server: DB_SERVER || "",
  database: DB_DATABASE || "",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    instanceName: INSTANCIA,
    requestTimeout: 120 * 1000, // 90 segundos,
  },
};

function deleteJSON() {
  sql.connect(configdb).then(async () => {
    const request = new sql.Request();

    await request
      .query(
        `   TRUNCATE TABLE ALLOS.[dbo].[JSON_ATENDIDOS]
          TRUNCATE TABLE ALLOS.[dbo].[JSON_RECEBIDOS]
          TRUNCATE TABLE ALLOS.[dbo].[JSON_EMAIL]
          TRUNCATE TABLE ALLOS.[dbo].[JSON_SLA_06]
          TRUNCATE TABLE ALLOS.[dbo].[JSON_SLA_30]
          TRUNCATE TABLE ALLOS.[dbo].[JSON_TICKETS]

      `
      )
      .then(() => console.log("Tabelas JSON limpas com sucesso."));
  });
}

module.exports = deleteJSON;
