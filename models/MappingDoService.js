const MappingDo = require("./MappingDo");
const _ = require("lodash");

async function upsertMappingDo(plcId, newMappingDo, state) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await MappingDo.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.mappingDo a JSON
      let existingMappingDo;
      try {
        existingMappingDo = JSON.parse(existingRecord.mappingDo);
      } catch (error) {
        console.error("Error parsing existing mappingDo:", error);
        return;
      }

      console.log("Existing Record mappingDo:", existingMappingDo);
      console.log("New mappingDo:", newMappingDo);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingMappingDo, newMappingDo);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'mappingDo' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'mappingDo' son Doferentes, crea uno nuevo
        await MappingDo.create({ plcId, mappingDo: newMappingDo, state });
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await MappingDo.create({ plcId, mappingDo: newMappingDo, state });
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting MappingDo:", error);
  }
}

module.exports = upsertMappingDo;
