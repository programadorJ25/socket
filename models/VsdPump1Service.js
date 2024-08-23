const VsdPump1 = require("./VsdPump1");
const _ = require("lodash");

async function upsertVsdPump1(plcId, newVsdPump1, state, transaction = null) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await VsdPump1.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.VsdPump1 a JSON
      let existingVsdPump1;
      try {
        existingVsdPump1 = JSON.parse(existingRecord.vsdPump1);
      } catch (error) {
        console.error("Error parsing existing VsdPump1:", error);
        return;
      }

      console.log("Existing Record VsdPump1:", existingVsdPump1);
      console.log("New VsdPump1:", newVsdPump1);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingVsdPump1, newVsdPump1);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'VsdPump1' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'VsdPump1' son diferentes, crea uno nuevo
        await VsdPump1.create(
          { plcId, vsdPump1: newVsdPump1, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await VsdPump1.create(
        { plcId, vsdPump1: newVsdPump1, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting VsdPump1:", error);
  }
}

module.exports = upsertVsdPump1;
