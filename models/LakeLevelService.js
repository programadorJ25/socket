const LakeLevel = require("./LakeLevel");
const _ = require("lodash");

async function upsertLakeLevel(
  plcId,
  newLakeLevel,
  state,
  transaction = null
) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await LakeLevel.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.LakeLevel a JSON
      let existingLakeLevel;
      try {
        existingLakeLevel = JSON.parse(existingRecord.lakeLevel);
      } catch (error) {
        console.error("Error parsing existing LakeLevel:", error);
        return;
      }

      console.log("Existing Record LakeLevel:", existingLakeLevel);
      console.log("New LakeLevel:", newLakeLevel);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingLakeLevel, newLakeLevel);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'LakeLevel' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'LakeLevel' son diferentes, crea uno nuevo
        await LakeLevel.create(
          { plcId, lakeLevel: newLakeLevel, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await LakeLevel.create(
        { plcId, lakeLevel: newLakeLevel, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting LakeLevel:", error);
  }
}

module.exports = upsertLakeLevel;
