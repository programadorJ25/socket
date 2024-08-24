const Sintonizacion = require("./Sintonizacion");
const _ = require("lodash");

async function upsertSintonizacion(plcId, newSintonizacion, state, transaction = null) {
  try {
    // Busca el registro más reciente por plcId en orden descendente de createdAt
    const existingRecord = await Sintonizacion.findOne({
      where: { plcId },
      order: [["createdAt", "DESC"]],
      transaction,
    });

    // Verifica si existe algún registro
    if (existingRecord) {
      // Convierte existingRecord.Sintonizacion a JSON
      let existingSintonizacion;
      try {
        existingSintonizacion = JSON.parse(existingRecord.sintonizacion);
      } catch (error) {
        console.error("Error parsing existing Sintonizacion:", error);
        return;
      }

      console.log("Existing Record Sintonizacion:", existingSintonizacion);
      console.log("New Sintonizacion:", newSintonizacion);

      // Verifica si los datos son iguales
      const isEqual = _.isEqual(existingSintonizacion, newSintonizacion);
      console.log("Comparison Result:", isEqual);

      if (isEqual) {
        // Los datos en 'Sintonizacion' son iguales a uno de los registros existentes, no se necesita ninguna acción
        console.log("No changes detected. No update performed.");
      } else {
        // Los datos en 'Sintonizacion' son diferentes, crea uno nuevo
        await Sintonizacion.create(
          { plcId, sintonizacion: newSintonizacion, state },
          { transaction }
        );
        console.log("Record inserted successfully.");
      }
    } else {
      // No se encontró ningún registro existente, crea uno nuevo
      await Sintonizacion.create({ plcId, sintonizacion: newSintonizacion, state }, { transaction });
      console.log("Record inserted successfully.");
    }
  } catch (error) {
    console.error("Error upserting Sintonizacion:", error);
  }
}

module.exports = upsertSintonizacion;
