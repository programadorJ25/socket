const MappingDi = require("./MappingDi");
const _ = require("lodash");

async function upsertMappingDi(plcId, newMappingDi) {
  try {
    // Busca todos los registros existentes por plcId
    const existingRecords = await MappingDi.findAll({ where: { plcId } });

    console.log(existingRecords);

    // Verifica si existe algún registro con los mismos datos en 'mappingDi'
    const recordExists = existingRecords.some((record) =>
      _.isEqual(record.mappingDi, newMappingDi)
    );

    if (recordExists) {
      // Los datos en 'mappingDi' son iguales a uno de los registros existentes, no se necesita ninguna acción
      console.log("No changes detected. No update performed.");
    } else {
      // Los datos en 'mappingDi' son diferentes a todos los registros existentes, crea uno nuevo
      await MappingDi.create({ plcId, mappingDi: newMappingDi });
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting MappingDi:", error);
  }
}

module.exports = upsertMappingDi;
