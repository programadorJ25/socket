const LowPressureDis = require("./LowPressureDis");
const _ = require("lodash");

async function upsertLowDischarge(
  plcId,
  newLowPressureDis,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await LowPressureDis.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.LowPressureDis a JSON
      let existingLowPressureDis;
      try {
        existingLowPressureDis = JSON.parse(existingRecord.lowPressureDis);
      } catch (error) {
        console.error("Error parsing existing LowPressureDis:", error);
        return;
      }

      console.log("Existing Record LowPressureDis:", existingLowPressureDis);
      console.log("New LowPressureDis:", newLowPressureDis);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingLowPressureDis, newLowPressureDis);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'LowPressureDis' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'LowPressureDis' son diferentes, crea uno nuevo
        await LowPressureDis.create(
          { plcId, lowPressureDis: newLowPressureDis, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await LowPressureDis.create(
        { plcId, lowPressureDis: newLowPressureDis, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting LowPressureDis:", error);
  }
}

module.exports = upsertLowDischarge;
