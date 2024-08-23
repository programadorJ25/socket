const VsdPumpPM = require("./VsdPumpPM");
const _ = require("lodash");

async function upsertVsdPumpPM(
  plcId,
  newVsdPumpPM,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await VsdPumpPM.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.VsdPumpPM a JSON
      let existingVsdPumpPM;
      try {
        existingVsdPumpPM = JSON.parse(existingRecord.vsdPumpPM);
      } catch (error) {
        console.error("Error parsing existing VsdPumpPM:", error);
        return;
      }

      console.log("Existing Record VsdPumpPM:", existingVsdPumpPM);
      console.log("New VsdPumpPM:", newVsdPumpPM);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingVsdPumpPM, newVsdPumpPM);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'VsdPumpPM' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'VsdPumpPM' son diferentes, crea uno nuevo
        await VsdPumpPM.create(
          { plcId, vsdPumpPM: newVsdPumpPM, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await VsdPumpPM.create(
        { plcId, vsdPumpPM: newVsdPumpPM, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting VsdPumpPM:", error);
  }
}

module.exports = upsertVsdPumpPM;
