const PhaseFailure = require("./PhaseFailure");
const _ = require("lodash");

async function upsertLowDischarge(
  plcId,
  newPhaseFailure,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await PhaseFailure.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.PhaseFailure a JSON
      let existingPhaseFailure;
      try {
        existingPhaseFailure = JSON.parse(existingRecord.phaseFailure);
      } catch (error) {
        console.error("Error parsing existing PhaseFailure:", error);
        return;
      }

      console.log("Existing Record PhaseFailure:", existingPhaseFailure);
      console.log("New PhaseFailure:", newPhaseFailure);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingPhaseFailure, newPhaseFailure);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'PhaseFailure' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'PhaseFailure' son diferentes, crea uno nuevo
        await PhaseFailure.create(
          { plcId, phaseFailure: newPhaseFailure, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await PhaseFailure.create(
        { plcId, phaseFailure: newPhaseFailure, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting PhaseFailure:", error);
  }
}

module.exports = upsertLowDischarge;
