const SetPoint = require("./SetPoint");
const _ = require("lodash");

async function upsertLowDischarge(
  plcId,
  newSetPoint,
  state,
  transaction = null
) {
  try {
    console.log(newSetPoint);
    
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await SetPoint.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.SetPoint a JSON
      let existingSetPoint;
      try {
        existingSetPoint = JSON.parse(existingRecord.setPoint);
      } catch (error) {
        console.error("Error parsing existing SetPoint:", error);
        return;
      }

      console.log("Existing Record SetPoint:", existingSetPoint);
      console.log("New SetPoint:", newSetPoint);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingSetPoint, newSetPoint);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'SetPoint' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'SetPoint' son diferentes, crea uno nuevo
        await SetPoint.create(
          { plcId, setPoint: newSetPoint, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await SetPoint.create(
        { plcId, setPoint: newSetPoint, state },
        { transaction }
      );
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting SetPoint:", error);
  }
}

module.exports = upsertLowDischarge;
