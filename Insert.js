const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const { DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE, INSTANCIA } = process.env;
const sql = require("mssql");
const timeout = 120_000_000;

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
  },
  connectionTimeout: 30 * 60000,
  requestTimeout: timeout,
  pool: {
    max: 1000,
    min: 1,
    idleTimeoutMillis: timeout,
    acquireTimeoutMillis: timeout,
    createTimeoutMillis: timeout,
    destroyTimeoutMillis: timeout,
    reapIntervalMillis: timeout,
    createRetryIntervalMillis: timeout,
  },
};

// Configs axios request

async function InsertDados(payload, table) {
  const config = {
    method: "post",
    url: "https://api.buzzmonitor.com.br/scroll.json",
    headers: {
      "Content-Type": "text/plain",
    },
    data: payload,
    maxContentLength: 100000000,
    maxBodyLength: 1000000000,
    timeout: 0,
  };
  //
  await axios
    .request(config)
    .then((response) => {
      // sql.connect(configdb).then(async () => {
      const jsonData = response.data.data;

      const jsonDataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
      let counter = 0;
      for (let i = 0; i < jsonDataArray.length; i++) {
        if (jsonDataArray[i].data === "0") counter++;
      }
      console.log(jsonData);

      // for (const caslu of jsonDataArray) {
      //   const jsonStr = JSON.stringify(caslu);

      //   const request = new sql.Request();

      //   request.input("json", sql.VarChar, jsonStr);

      //   await request.query(
      //     `INSERT INTO ${table} (ID, JSON, DTIMPORT) VALUES (null, @json, null)`
      //   );

      //   console.log(
      //     `Inserção no banco de dados concluída na tabela ${table}`
      //   );
      // }
      // });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  InsertDados,
};
