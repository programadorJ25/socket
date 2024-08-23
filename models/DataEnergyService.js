const DataEnergy = require("./DataEnergy");
const _ = require("lodash");

async function upsertDataEnergy(
  plcId,
  newDataEnergy,
  transaction = null
) {
  try {
    console.log(newDataEnergy);

    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await DataEnergy.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.DataEnergy a JSON
      let existingDataEnergy;
      try {
        existingDataEnergy = JSON.parse(existingRecord.dataEnergy);
      } catch (error) {
        console.error("Error parsing existing DataEnergy:", error);
        return;
      }

      console.log("Existing Record DataEnergy:", existingDataEnergy);
      console.log("New DataEnergy:", newDataEnergy);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingDataEnergy, newDataEnergy);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'DataEnergy' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'DataEnergy' son diferentes, crea uno nuevo
        await DataEnergy.create(
          { plcId, dataEnergy: newDataEnergy },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await DataEnergy.create(
        { plcId, dataEnergy: newDataEnergy },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting DataEnergy:", error);
  }
}

module.exports = upsertDataEnergy;
