const FilterStation = require("./FilterStation");
const _ = require("lodash");

async function upsertFilterStation(
  plcId,
  newFilterStation,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await FilterStation.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.FilterStation a JSON
      let existingFilterStation;
      try {
        existingFilterStation = JSON.parse(existingRecord.filterStation);
      } catch (error) {
        console.error("Error parsing existing FilterStation:", error);
        return;
      }

      console.log("Existing Record FilterStation:", existingFilterStation);
      console.log("New FilterStation:", newFilterStation);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingFilterStation, newFilterStation);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'FilterStation' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'FilterStation' son diferentes, crea uno nuevo
        await FilterStation.create(
          { plcId, filterStation: newFilterStation, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await FilterStation.create(
        { plcId, filterStation: newFilterStation, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting FilterStation:", error);
  }
}

module.exports = upsertFilterStation;
