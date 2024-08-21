const sequelize = require("../db/database");
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
  constructor() {
    this.accumulatedData = {
      stations: [],
      pumpStates: [],
      pumpLeads: [],
      sensorConfs: [],
      setPoints: [],
      mappingDis: [],
      mappingDos: [],
      dataEnergies: [],
    };
    this.handleStation = this.handleStation.bind(this);
    this.handlePumpPm = this.handlePumpPm.bind(this);
    this.handlePumpLead = this.handlePumpLead.bind(this);
    this.handleSensorConf = this.handleSensorConf.bind(this);
    this.handleSetPoint = this.handleSetPoint.bind(this);
    this.handleMappingDi = this.handleMappingDi.bind(this);
    this.handleMappingDo = this.handleMappingDo.bind(this);
    this.handleDataEnergy = this.handleDataEnergy.bind(this);

    // Bindear otros métodos según sea necesario
  }
  async batchInsertData() {
    const transaction = await sequelize.transaction();
    try {
      if (this.accumulatedData.stations.length > 0) {
        await Station.bulkCreate(this.accumulatedData.stations, {
          transaction,
        });
      }
      if (this.accumulatedData.pumpStates.length > 0) {
        await PumpState.bulkCreate(this.accumulatedData.pumpStates, {
          transaction,
        });
      }
      if (this.accumulatedData.pumpLeads.length > 0) {
        await PumpLead.bulkCreate(this.accumulatedData.pumpLeads, {
          transaction,
        });
      }
      if (this.accumulatedData.sensorConfs.length > 0) {
        await LagPump2.bulkCreate(this.accumulatedData.sensorConfs, {
          transaction,
        });
      }
      if (this.accumulatedData.setPoints.length > 0) {
        await SetPoint.bulkCreate(this.accumulatedData.setPoints, {
          transaction,
        });
      }
      if (this.accumulatedData.mappingDis.length > 0) {
        for (const mappingDiData of this.accumulatedData.mappingDis) {
          await upsertMappingDi(
            mappingDiData.plcId,
            mappingDiData.values,
            mappingDiData.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.mappingDos.length > 0) {
        for (const mappingDoData of this.accumulatedData.mappingDos) {
          await upsertMappingDo(
            mappingDoData.plcId,
            mappingDoData.values,
            mappingDoData.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.dataEnergies.length > 0) {
        await DataEnergy.bulkCreate(this.accumulatedData.dataEnergies, {
          transaction,
        });
      }

      await transaction.commit();
      this.resetAccumulatedData();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  resetAccumulatedData() {
    this.accumulatedData = {
      stations: [],
      pumpStates: [],
      pumpLeads: [],
      sensorConfs: [],
      setPoints: [],
      mappingDis: [],
      mappingDos: [],
      dataEnergies: [],
    };
  }

  // Métodos para acumular datos
  async handleStation(data) {
    this.accumulatedData.stations.push({
      plcId: data.plcId,
      station: data.values,
      state: data.state,
    });
  }

  async handlePumpPm(data) {
    this.accumulatedData.pumpStates.push({
      plcId: data.plcId,
      pumpPm: data.values,
      state: data.state,
    });
  }

  async handlePumpLead(data) {
    this.accumulatedData.pumpLeads.push({
      plcId: data.plcId,
      pumpLead: data.values,
      state: data.state,
    });
  }

  async handleSensorConf(data) {
    this.accumulatedData.sensorConfs.push({
      plcId: data.plcId,
      sensorConf: data.values,
      state: data.state,
    });
  }

  async handleSetPoint(data) {
    this.accumulatedData.setPoints.push({
      plcId: data.plcId,
      setPoint: data.values,
      state: data.state,
    });
  }

  async handleMappingDi(data) {
    this.accumulatedData.mappingDis.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleMappingDo(data) {
    console.log("this in handleMappingDo:", this);
    this.accumulatedData.mappingDos.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleDataEnergy(data) {
    this.accumulatedData.dataEnergies.push({
      plcId: data.plcId,
      dataEnergy: data.values,
      state: data.state,
    });
  }

  // Añade métodos para los nuevos eventos aquí
}

module.exports = { EventHandler }; // Exportar la clase como propiedad de un objeto
