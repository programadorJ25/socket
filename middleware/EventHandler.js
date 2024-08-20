const PumpState = require("../models/PumpState");
const PumpLead = require("../models/PumpLead");
const upsertMappingDi = require("../models/MappingDiService");
const upsertMappingDo = require("../models/MappingDoService");
const LagPump2 = require("../models/LagPump2");
const Station = require("../models/Station");
const SetPoint = require("../models/SetPoint");
const DataEnergy = require("../models/DataEnergy");

// handlers/EventHandler.js
class EventHandler {
  async handleStation(data) {
    return await Station.create({
      plcId: data.plcId,
      station: data.values,
      state: data.state,
    });
  }

  async handlePumpPm(data) {
    return await PumpState.create({
      plcId: data.plcId,
      pumpPm: data.values,
      state: data.state,
    });
  }

  async handlePumpLead(data) {
    return await PumpLead.create({
      plcId: data.plcId,
      pumpLead: data.values,
      state: data.state,
    });
  }

  async handleSensorConf(data) {
    return await LagPump2.create({
      plcId: data.plcId,
      sensorConf: data.values,
      state: data.state,
    });
  }

  async handleSetPoint(data) {
    return await SetPoint.create({
      plcId: data.plcId,
      setPoint: data.values,
      state: data.state,
    });
  }

  async handleMappingDi(data) {
    return await upsertMappingDi(data.plcId, data.values, data.state);
  }

  async handleMappingDo(data) {
    return await upsertMappingDo(data.plcId, data.values, data.state);
  }

  async handleDataEnergy(data) {
    return await DataEnergy.create({
      plcId: data.plcId,
      dataEnergy: data.values,
      state: data.state,
    });
  }

  // Añade métodos para los nuevos eventos aquí
}

module.exports = new EventHandler();
