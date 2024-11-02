const Station = require("./Station");
const _ = require("lodash");

async function upsertStation(plcId, newStation, transaction = null) {
  try {
    console.log("data: " + newStation);
    
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await Station.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.Station a JSON
      let existingStation;
      try {
        existingStation = JSON.parse(existingRecord.values);
      } catch (error) {
        console.error("Error parsing existing Station:", error);
        return;
      }

      console.log("Existing Record Station:", existingStation);
      console.log("New Station:", newStation);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingStation, newStation);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'Station' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'Station' son diferentes, crea uno nuevo
        await Station.create({ plcId, values: newStation }, { transaction });
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await Station.create({ plcId, values: newStation }, { transaction });
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting Station:", error);
  }
}

module.exports = upsertStation;
