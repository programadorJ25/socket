const BombaAux = require("./BombaAux");
const _ = require("lodash");

async function upsertBombaAux(plcId, newBombaAux, state, transaction = null) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await BombaAux.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.BombaAux a JSON
      let existingBombaAux;
      try {
        existingBombaAux = JSON.parse(existingRecord.bombaAux);
      } catch (error) {
        console.error("Error parsing existing BombaAux:", error);
        return;
      }

      console.log("Existing Record BombaAux:", existingBombaAux);
      console.log("New BombaAux:", newBombaAux);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingBombaAux, newBombaAux);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'BombaAux' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'BombaAux' son diferentes, crea uno nuevo
        await BombaAux.create(
          { plcId, bombaAux: newBombaAux, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await BombaAux.create(
        { plcId, bombaAux: newBombaAux, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting BombaAux:", error);
  }
}

module.exports = upsertBombaAux;
