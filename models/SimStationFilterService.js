const SimStationFilter = require("./SimStationFilter");
const _ = require("lodash");

async function upsertLowDischarge(
  plcId,
  newSimStationFilter,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await SimStationFilter.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.SimStationFilter a JSON
      let existingSimStationFilter;
      try {
        existingSimStationFilter = JSON.parse(existingRecord.simStationFilter);
      } catch (error) {
        console.error("Error parsing existing SimStationFilter:", error);
        return;
      }

      console.log("Existing Record SimStationFilter:", existingSimStationFilter);
      console.log("New SimStationFilter:", newSimStationFilter);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingSimStationFilter, newSimStationFilter);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'SimStationFilter' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'SimStationFilter' son diferentes, crea uno nuevo
        await SimStationFilter.create(
          { plcId, simStationFilter: newSimStationFilter, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await SimStationFilter.create(
        { plcId, simStationFilter: newSimStationFilter, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting SimStationFilter:", error);
  }
}

module.exports = upsertLowDischarge;
