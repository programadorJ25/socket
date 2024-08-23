const LowLevel = require("./LowLevel");
const _ = require("lodash");

async function upsertLowLevel(
  plcId,
  newLowLevel,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await LowLevel.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.LowLevel a JSON
      let existingLowLevel;
      try {
        existingLowLevel = JSON.parse(existingRecord.lowLevel);
      } catch (error) {
        console.error("Error parsing existing LowLevel:", error);
        return;
      }

      console.log("Existing Record LowLevel:", existingLowLevel);
      console.log("New LowLevel:", newLowLevel);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingLowLevel, newLowLevel);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'LowLevel' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'LowLevel' son diferentes, crea uno nuevo
        await LowLevel.create(
          { plcId, lowLevel: newLowLevel, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await LowLevel.create(
        { plcId, lowLevel: newLowLevel, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting LowLevel:", error);
  }
}

module.exports = upsertLowLevel;
