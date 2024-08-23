const VFDfailure = require("./VFDfailure");
const _ = require("lodash");

async function upsertLowDischarge(
  plcId,
  newVFDfailure,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await VFDfailure.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.VFDfailure a JSON
      let existingVFDfailure;
      try {
        existingVFDfailure = JSON.parse(existingRecord.vFDfailure);
      } catch (error) {
        console.error("Error parsing existing VFDfailure:", error);
        return;
      }

      console.log("Existing Record VFDfailure:", existingVFDfailure);
      console.log("New VFDfailure:", newVFDfailure);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingVFDfailure, newVFDfailure);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'VFDfailure' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'VFDfailure' son diferentes, crea uno nuevo
        await VFDfailure.create(
          { plcId, vFDfailure: newVFDfailure, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await VFDfailure.create(
        { plcId, vFDfailure: newVFDfailure, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting VFDfailure:", error);
  }
}

module.exports = upsertLowDischarge;
