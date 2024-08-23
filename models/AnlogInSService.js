const AnalogInScale = require("./AnalogInScale");
const _ = require("lodash");

async function upsertAnalogInScale(
  plcId,
  newAnalogInScale,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await AnalogInScale.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.AnalogInScale a JSON
      let existingAnalogInScale;
      try {
        existingAnalogInScale = JSON.parse(existingRecord.analogInScale);
      } catch (error) {
        console.error("Error parsing existing AnalogInScale:", error);
        return;
      }

      console.log("Existing Record AnalogInScale:", existingAnalogInScale);
      console.log("New AnalogInScale:", newAnalogInScale);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingAnalogInScale, newAnalogInScale);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'AnalogInScale' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'AnalogInScale' son diferentes, crea uno nuevo
        await AnalogInScale.create(
          { plcId, analogInScale: newAnalogInScale, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await AnalogInScale.create(
        { plcId, analogInScale: newAnalogInScale, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting AnalogInScale:", error);
  }
}

module.exports = upsertAnalogInScale;
