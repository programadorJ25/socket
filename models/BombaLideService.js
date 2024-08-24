const BombaLider = require("./BombaLider");
const _ = require("lodash");

async function upsertBombaLider(plcId, newBombaLider, state, transaction = null) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await BombaLider.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.BombaLider a JSON
      let existingBombaLider;
      try {
        existingBombaLider = JSON.parse(existingRecord.bombaLider);
      } catch (error) {
        console.error("Error parsing existing BombaLider:", error);
        return;
      }

      console.log("Existing Record BombaLider:", existingBombaLider);
      console.log("New BombaLider:", newBombaLider);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingBombaLider, newBombaLider);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'BombaLider' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'BombaLider' son diferentes, crea uno nuevo
        await BombaLider.create(
          { plcId, bombaLider: newBombaLider, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await BombaLider.create(
        { plcId, bombaLider: newBombaLider, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting BombaLider:", error);
  }
}

module.exports = upsertBombaLider;
