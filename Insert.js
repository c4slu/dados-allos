const axios = require("axios");
const dotenv = require("dotenv");

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

// Configs axios request

function InsertDados(payload, table) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.buzzmonitor.com.br/scroll.json",
    headers: {
      "Content-Type": "text/plain",
    },
    data: payload,
  };

  axios
    .request(config)
    .then((response) => {
      sql.connect(configdb).then(async () => {
        const jsonData = response.data.data;
        const ScrollID = response.data.scroll_id;

        for (const post of jsonData) {
          // Para cada post_id, insira-o em uma linha separada no SQL Server
          const ID = post.elasticsearch_id;
          const jsonStr = JSON.stringify(post);
          const dt = post.date;

          const request = new sql.Request();

          request.input("ID", sql.VarChar, ID); // Supondo que post_id seja um inteiro
          request.input("json", sql.NVarChar, jsonStr);
          request.input("Dt", sql.Float, dt);

          await request.query(
            `INSERT INTO ${table} (ID, JSON, DTIMPORT) VALUES (@ID, @json, @Dt)`
          );
          // console.log(
          //   `Inserção no banco de dados concluída para ID ${ID} da tabela ${table}`
          // );
        }
        console.log(
          "TABELA \n" +
            table +
            "\n\nSCROLL ID:\n" +
            ScrollID +
            "\n\n\n ===-----=== \n\n\n"
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
module.exports = {
  InsertDados,
};
