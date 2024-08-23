const HighPressureDis = require("./HighPressureDis");
const _ = require("lodash");

async function upsertLowDischarge(
  plcId,
  newHighPressureDis,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await HighPressureDis.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.HighPressureDis a JSON
      let existingHighPressureDis;
      try {
        existingHighPressureDis = JSON.parse(existingRecord.highPressureDis);
      } catch (error) {
        console.error("Error parsing existing HighPressureDis:", error);
        return;
      }

      console.log("Existing Record HighPressureDis:", existingHighPressureDis);
      console.log("New HighPressureDis:", newHighPressureDis);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingHighPressureDis, newHighPressureDis);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'HighPressureDis' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'HighPressureDis' son diferentes, crea uno nuevo
        await HighPressureDis.create(
          { plcId, highPressureDis: newHighPressureDis, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await HighPressureDis.create(
        { plcId, highPressureDis: newHighPressureDis, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting HighPressureDis:", error);
  }
}

module.exports = upsertLowDischarge;
