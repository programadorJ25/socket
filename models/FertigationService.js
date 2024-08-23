const Fertigation = require("./Fertigation");
const _ = require("lodash");

async function upsertFertigation(
  plcId,
  newFertigation,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await Fertigation.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.Fertigation a JSON
      let existingFertigation;
      try {
        existingFertigation = JSON.parse(existingRecord.fertigation);
      } catch (error) {
        console.error("Error parsing existing Fertigation:", error);
        return;
      }

      console.log("Existing Record Fertigation:", existingFertigation);
      console.log("New Fertigation:", newFertigation);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingFertigation, newFertigation);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'Fertigation' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'Fertigation' son diferentes, crea uno nuevo
        await Fertigation.create(
          { plcId, fertigation: newFertigation, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await Fertigation.create(
        { plcId, fertigation: newFertigation, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting Fertigation:", error);
  }
}

module.exports = upsertFertigation;
