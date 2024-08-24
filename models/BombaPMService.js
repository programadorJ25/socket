const BombaPM = require("./BombaPM");
const _ = require("lodash");

async function upsertBombaPM(plcId, newBombaPM, state, transaction = null) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await BombaPM.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.BombaPM a JSON
      let existingBombaPM;
      try {
        existingBombaPM = JSON.parse(existingRecord.bombaPM);
      } catch (error) {
        console.error("Error parsing existing BombaPM:", error);
        return;
      }

      console.log("Existing Record BombaPM:", existingBombaPM);
      console.log("New BombaPM:", newBombaPM);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingBombaPM, newBombaPM);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'BombaPM' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'BombaPM' son diferentes, crea uno nuevo
        await BombaPM.create(
          { plcId, bombaPM: newBombaPM, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await BombaPM.create(
        { plcId, bombaPM: newBombaPM, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting BombaPM:", error);
  }
}

module.exports = upsertBombaPM;
