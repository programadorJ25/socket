const Alarms = require("./Alarms");
const _ = require("lodash");

async function upsertAlarms(plcId, newAlarms, state, transaction = null) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await Alarms.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.Alarms a JSON
      let existingAlarms;
      try {
        existingAlarms = JSON.parse(existingRecord.alarms);
      } catch (error) {
        console.error("Error parsing existing Alarms:", error);
        return;
      }

      console.log("Existing Record Alarms:", existingAlarms);
      console.log("New Alarms:", newAlarms);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingAlarms, newAlarms);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'Alarms' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'Alarms' son diferentes, crea uno nuevo
        await Alarms.create(
          { plcId, alarms: newAlarms, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await Alarms.create({ plcId, alarms: newAlarms, state }, { transaction });
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting Alarms:", error);
  }
}

module.exports = upsertAlarms;
