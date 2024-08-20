const MappingDi = require("./MappingDi");
const _ = require("lodash");

async function upsertMappingDi(plcId, newMappingDi, state) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await MappingDi.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.mappingDi a JSON
      let existingMappingDi;
      try {
        existingMappingDi = JSON.parse(existingRecord.mappingDi);
      } catch (error) {
        console.error("Error parsing existing mappingDi:", error);
        return;
      }

      console.log("Existing Record mappingDi:", existingMappingDi);
      console.log("New mappingDi:", newMappingDi);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingMappingDi, newMappingDi);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'mappingDi' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'mappingDi' son diferentes, crea uno nuevo
        await MappingDi.create({ plcId, mappingDi: newMappingDi, state });
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await MappingDi.create({ plcId, mappingDi: newMappingDi, state });
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting MappingDi:", error);
  }
}

module.exports = upsertMappingDi;
