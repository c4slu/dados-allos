// Importação das functions e payloads
const exec = require("./Insert.js");
const deleteJSON = require("./delete.js");
const payload06h = require("./payloads/payload_SLA06.js");
//const payload30h = require("./'payloads/payload_SLA30'.js");
const payloadRecebidos = require("./payloads/payload_RECEBIDOS.js");
const payloadATENDIDOS = require("./payloads/payload_ATENDIDOS.js");
const payloadEMAIL = require("./payloads/payload_EMAIL.js");
const payloadTICKETS = require("./payloads/payload_TICKETS.js");

// Varivel das tabelas do banco de dados SQL SERVER
const table_SLA06 = "JSON_SLA_06";
const table_SLA30 = "JSON_SLA_30";
const table_RECEBIDOS = "JSON_RECEBIDOS";
const table_ATENDIDOS = "JSON_ATENDIDOS";
const table_TICKETS = "JSON_TICKETS";
const table_EMAIL = "JSON_EMAIL";

// Datas do MÊS
const diasMes = [
  "20231001",
  // "20231002",
  // "20231003",
  // "20231004",
  // "20231005",
  // "20231006",
  // "20231007",
  // "20231008",
  // "20231009",
  // "20231010",
  // "20231011",
  // "20231012",
  // "20231013",
  // "20231014",
  // "20231015",
  // "20231016",
  // "20231017",
  // "20231018",
  // "20231019",
  // "20231020",
  // "20231021",
  // "20231022",
  // "20231023",
  // "20231024",
  // "20231025",
  // "20231026",
  // "20231028",
  // "20231029",
  // "20231030",
  // "20231031",
];

// Função assíncrona para processar os payloads
async function processPayloads(diasMes) {
  for (const data of diasMes) {
    // Aqui você pode incluir um bloco try-catch se quiser lidar com exceções
    // await exec.InsertDados(
    //   JSON.parse(
    //     JSON.stringify({
    //       ...payload06h,
    //       general_params: { since: `${data}000000`, until: `${data}235900` },
    //     })
    //   ),
    //   table_SLA06
    // );
    // await exec.InsertDados(
    //   JSON.parse(
    //     JSON.stringify({
    //       ...payload30h,
    //       general_params: { since: `${data}000000`, until: `${data}235900` },
    //     })
    //   ),
    //   table_SLA30
    // );
    // await exec.InsertDados(
    //   JSON.parse(
    //     JSON.stringify({
    //       ...payloadRecebidos,
    //       general_params: { since: `${data}000000`, until: `${data}235900` },
    //     })
    //   ),
    //   table_RECEBIDOS
    // );
    await exec.InsertDados(
      JSON.parse(
        JSON.stringify({
          ...payloadATENDIDOS,
          general_params: { since: `${data}000000`, until: `${data}235900` },
        })
      ),
      table_ATENDIDOS
    );
    // await exec.InsertDados(
    //   JSON.parse(
    //     JSON.stringify({
    //       ...payloadTICKETS,
    //       general_params: { since: `${data}000000`, until: `${data}235900` },
    //     })
    //   ),
    //   table_TICKETS
    // );
    // await exec.InsertDados(
    //   JSON.parse(
    //     JSON.stringify({
    //       ...payloadEMAIL,
    //       general_params: { since: `${data}000000`, until: `${data}235900` },
    //     })
    //   ),
    //   table_EMAIL
    // );
  }
}
//deleteJSON();
// Chamada da função para processar os payloads
processPayloads(diasMes);
