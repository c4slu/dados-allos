const exec = require("./Insert.js");
const dotenv = require("dotenv");
const data = new Date();
data.setDate(data.getDate() - 1);
const dia = String(data.getDate()).padStart(2, "0");
const mes = String(data.getMonth() + 1).padStart(2, "0");
const ano = data.getFullYear();
const dataOntem = `${ano}${mes}${dia}`;

module.exports = {
  dataOntem: dataOntem,
};

const { payload06h } = require("./payloads/payload_SLA06.js");
const { payload30h } = require("./payloads/payload_SLA30.js");
const { payloadRecebidos } = require("./payloads/payload_RECEBIDOS.js");
const { payloadATENDIDOS } = require("./payloads/payload_ATENDIDOS.js");
const { payloadEMAIL } = require("./payloads/payload_EMAIL.js");
const { payloadTICKETS } = require("./payloads/payload_TICKETS.js");

const table_SLA06 = "JSON_SLA_06";
const table_SLA30 = "JSON_SLA_30";
const table_RECEBIDOS = "JSON_RECEBIDOS";
const table_ATENDIDOS = "JSON_ATENDIDOS";
const table_TITCKETS = "JSON_TICKETS";
const table_EMAIL = "JSON_EMAIL";

dotenv.config();
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

sql.connect(configdb).then(async () => {
  const request = new sql.Request();

  await request
    .query(
      `   --
      `
    )
    .then(() => console.log("Tabelas JSON limpas com sucesso."));

  // INSERT DADOS SLA 06
  //await exec.InsertDados(payload06h, table_SLA06);

  // INSERT DADOS SLA 30
  //await exec.InsertDados(payload30h, table_SLA30);

  // INSERT DADOS RECEBIDOS
  //await exec.InsertDados(payloadRecebidos, table_RECEBIDOS);

  // INSERT DADOS ATENDIDOS
  //await exec.InsertDados(payloadATENDIDOS, table_ATENDIDOS);

  // INSERT DADOS TICKETS
  //await exec.InsertDados(payloadTICKETS, table_TITCKETS);

  // INSERT DADOS EMAIL
  await exec.InsertDados(payloadEMAIL, table_EMAIL);
});
