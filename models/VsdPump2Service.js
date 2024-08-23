const VsdPump2 = require("./VsdPump2");
const _ = require("lodash");

async function upsertVsdPump2(plcId, newVsdPump2, state, transaction = null) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await VsdPump2.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.VsdPump2 a JSON
      let existingVsdPump2;
      try {
        existingVsdPump2 = JSON.parse(existingRecord.vsdPump2);
      } catch (error) {
        console.error("Error parsing existing VsdPump2:", error);
        return;
      }

      console.log("Existing Record VsdPump2:", existingVsdPump2);
      console.log("New VsdPump2:", newVsdPump2);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingVsdPump2, newVsdPump2);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'VsdPump2' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'VsdPump2' son diferentes, crea uno nuevo
        await VsdPump2.create(
          { plcId, vsdPump2: newVsdPump2, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await VsdPump2.create(
        { plcId, vsdPump2: newVsdPump2, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting VsdPump2:", error);
  }
}

module.exports = upsertVsdPump2;
