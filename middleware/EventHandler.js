const sequelize = require("../db/database");

const upsertSetPoint = require("../models/SetPointService");
const upsertMappingDi = require("../models/MappingDiService");
const upsertMappingDo = require("../models/MappingDoService");
const upsertDataEnergy = require("../models/DataEnergyService");
const upsertAnalogIScale = require("../models/AnlogInSService");
const upsertLowDischarge = require("../models/LowPressureService");
const upsertHighDischarge = require("../models/HighPressureService");
const upsertLowLevel = require("../models/LowLevelService");
const upsertFailurePhase = require("../models/PhaseFailureService");
const upsertFailureVFD = require("../models/VFDfailureService");
const upsertFilterStation = require("../models/FilterStationService");
const upsertFertigation = require("../models/FertigationService");
const upsertLakeLevel = require("../models/LakeLevelService");
const upsertVsdPumpPM = require("../models/VsdPumpPMService");
const upsertVsdPump1 = require("../models/VsdPump1Service");
const upsertVsdPump2 = require("../models/VsdPump2Service");

const upsertBombaPM = require("../models/BombaPMService");
const upsertBombaLider = require("../models/BombaLideService");
const upsertBombaAux = require("../models/BombaAuxService");
const upsertAlarms = require("../models/AlarmsService");
const upsertSintonizacion = require("../models/SintonizacionService");

const Station = require("../models/Station");

// handlers/EventHandler.js
class EventHandler {
  constructor() {
    this.accumulatedData = {
      stations: [],
      setPoints: [],
      mappingDis: [],
      mappingDos: [],
      dataEnergies: [],
      analogInputScale: [],
      lowDischarge: [],
      highDischarge: [],
      lowLevel: [],
      failurePhase: [],
      failureVFD: [],
      filterStation: [],
      fertigation: [],
      lakeLevel: [],
      vsdPumpPM: [],
      vsdPump1: [],
      vsdPump2: [],
      //mew data
      bombaPM: [],
      bombaLider: [],
      bombaAux: [],
      alarms: [],
      sintonizacion: [],
    };
    this.handleStation = this.handleStation.bind(this);
    this.handleSetPoint = this.handleSetPoint.bind(this);
    this.handleMappingDi = this.handleMappingDi.bind(this);
    this.handleMappingDo = this.handleMappingDo.bind(this);
    this.handleDataEnergy = this.handleDataEnergy.bind(this);
    this.handleAnalogInputScale = this.handleAnalogInputScale.bind(this);
    this.handleLowDischarge = this.handleLowDischarge.bind(this);
    this.handleHighDischarge = this.handleHighDischarge.bind(this);
    this.handleLowLevel = this.handleLowLevel.bind(this);
    this.handleFailurePhase = this.handleFailurePhase.bind(this);
    this.handleFailureVFD = this.handleFailureVFD.bind(this);
    this.handleFilterStation = this.handleFilterStation.bind(this);
    this.handleFertigation = this.handleFertigation.bind(this);
    this.handleLakeLevel = this.handleLakeLevel.bind(this);
    this.handleVsdPumpPM = this.handleVsdPumpPM.bind(this);
    this.handleVsdPump1 = this.handleVsdPump1.bind(this);
    this.handleVsdPump2 = this.handleVsdPump2.bind(this);
    // Bindear otros métodos según sea necesario
    this.handleBombaPM = this.handleBombaPM.bind(this);
    this.handleBombaLider = this.handleBombaLider.bind(this);
    this.handleBombaAux = this.handleBombaAux.bind(this);
    this.handleAlarms = this.handleAlarms.bind(this);
    this.handleSintonizacion = this.handleSintonizacion.bind(this);
  }
  async batchInsertData() {
    const transaction = await sequelize.transaction();
    try {
      if (this.accumulatedData.stations.length > 0) {
        await Station.bulkCreate(this.accumulatedData.stations, {
          transaction,
        });
      }
      if (this.accumulatedData.setPoints.length > 0) {
        for (const set_Point of this.accumulatedData.setPoints) {
          await upsertSetPoint(
            set_Point.plcId,
            set_Point.values,
            set_Point.state,
            transaction
          );
        }
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
        for (const energy of this.accumulatedData.dataEnergies) {
          await upsertDataEnergy(
            energy.plcId,
            energy.values,
            energy.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.analogInputScale.length > 0) {
        for (const analogIScale of this.accumulatedData.analogInputScale) {
          await upsertAnalogIScale(
            analogIScale.plcId,
            analogIScale.values,
            analogIScale.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.lowDischarge.length > 0) {
        for (const lowDis of this.accumulatedData.lowDischarge) {
          await upsertLowDischarge(
            lowDis.plcId,
            lowDis.values,
            lowDis.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.highDischarge.length > 0) {
        for (const highDis of this.accumulatedData.highDischarge) {
          await upsertHighDischarge(
            highDis.plcId,
            highDis.values,
            highDis.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.lowLevel.length > 0) {
        for (const levelLow of this.accumulatedData.lowLevel) {
          await upsertLowLevel(
            levelLow.plcId,
            levelLow.values,
            levelLow.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.failurePhase.length > 0) {
        for (const failPhase of this.accumulatedData.failurePhase) {
          await upsertFailurePhase(
            failPhase.plcId,
            failPhase.values,
            failPhase.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.failureVFD.length > 0) {
        for (const failVFD of this.accumulatedData.failureVFD) {
          await upsertFailureVFD(
            failVFD.plcId,
            failVFD.values,
            failVFD.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.filterStation.length > 0) {
        for (const stationFilter of this.accumulatedData.filterStation) {
          await upsertFilterStation(
            stationFilter.plcId,
            stationFilter.values,
            stationFilter.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.fertigation.length > 0) {
        for (const fertigations of this.accumulatedData.fertigation) {
          await upsertFertigation(
            fertigations.plcId,
            fertigations.values,
            fertigations.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.lakeLevel.length > 0) {
        for (const levelLake of this.accumulatedData.lakeLevel) {
          await upsertLakeLevel(
            levelLake.plcId,
            levelLake.values,
            levelLake.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.vsdPumpPM.length > 0) {
        for (const pmpPumpVSD of this.accumulatedData.vsdPumpPM) {
          await upsertVsdPumpPM(
            pmpPumpVSD.plcId,
            pmpPumpVSD.values,
            pmpPumpVSD.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.vsdPump1.length > 0) {
        for (const pump1VSD1 of this.accumulatedData.vsdPump1) {
          await upsertVsdPump1(
            pump1VSD1.plcId,
            pump1VSD1.values,
            pump1VSD1.state,
            transaction
          );
        }
      }

      if (this.accumulatedData.vsdPump2.length > 0) {
        for (const pump2VSD of this.accumulatedData.vsdPump2) {
          await upsertVsdPump2(
            pump2VSD.plcId,
            pump2VSD.values,
            pump2VSD.state,
            transaction
          );
        }
      }

      //ultimos cinco datos
      if (this.accumulatedData.bombaPM.length > 0) {
        for (const bombaPM of this.accumulatedData.bombaPM) {
          await upsertBombaPM(
            bombaPM.plcId,
            bombaPM.values,
            bombaPM.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.bombaLider.length > 0) {
        for (const bombaLider of this.accumulatedData.bombaLider) {
          await upsertBombaLider(
            bombaLider.plcId,
            bombaLider.values,
            bombaLider.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.bombaAux.length > 0) {
        for (const bombaAux of this.accumulatedData.bombaAux) {
          await upsertBombaAux(
            bombaAux.plcId,
            bombaAux.values,
            bombaAux.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.alarms.length > 0) {
        for (const alarms of this.accumulatedData.alarms) {
          await upsertAlarms(
            alarms.plcId,
            alarms.values,
            alarms.state,
            transaction
          );
        }
      }
      if (this.accumulatedData.sintonizacion.length > 0) {
        for (const sintonizacion of this.accumulatedData.sintonizacion) {
          await upsertSintonizacion(
            sintonizacion.plcId,
            sintonizacion.values,
            sintonizacion.state,
            transaction
          );
        }
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
      setPoints: [],
      mappingDis: [],
      mappingDos: [],
      dataEnergies: [],
      analogInputScale: [],
      lowDischarge: [],
      highDischarge: [],
      lowLevel: [],
      failurePhase: [],
      failureVFD: [],
      filterStation: [],
      fertigation: [],
      lakeLevel: [],
      vsdPumpPM: [],
      vsdPump1: [],
      vsdPump2: [],
      //mew data
      bombaPM: [],
      bombaLider: [],
      bombaAux: [],
      alarms: [],
      sintonizacion: [],
    };
  }

  // Métodos para acumular datos
  async handleStation(data) {
    console.log(data);

    this.accumulatedData.stations.push({
      plcId: data.plcId,
      station: data.values,
    });
  }

  async handleSetPoint(data) {
    this.accumulatedData.setPoints.push({
      plcId: data.plcId,
      values: data.values,
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
    this.accumulatedData.mappingDos.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleDataEnergy(data) {
    this.accumulatedData.dataEnergies.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleAnalogInputScale(data) {
    this.accumulatedData.analogInputScale.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleLowDischarge(data) {
    this.accumulatedData.lowDischarge.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleHighDischarge(data) {
    this.accumulatedData.highDischarge.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  async handleLowLevel(data) {
    this.accumulatedData.lowLevel.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  async handleFailurePhase(data) {
    this.accumulatedData.failurePhase.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  async handleFailureVFD(data) {
    this.accumulatedData.failureVFD.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleFilterStation(data) {
    this.accumulatedData.filterStation.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleFertigation(data) {
    this.accumulatedData.fertigation.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleLakeLevel(data) {
    this.accumulatedData.lakeLevel.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleVsdPumpPM(data) {
    this.accumulatedData.vsdPumpPM.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleVsdPump1(data) {
    this.accumulatedData.vsdPump1.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }

  async handleVsdPump2(data) {
    this.accumulatedData.vsdPump2.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  // Añade métodos para los nuevos eventos aquí
  async handleBombaPM(data) {
    this.accumulatedData.bombaPM.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  async handleBombaLider(data) {
    this.accumulatedData.bombaLider.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  async handleBombaAux(data) {
    this.accumulatedData.bombaAux.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  async handleAlarms(data) {
    this.accumulatedData.alarms.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
  async handleSintonizacion(data) {
    this.accumulatedData.sintonizacion.push({
      plcId: data.plcId,
      values: data.values,
      state: data.state,
    });
  }
}

module.exports = { EventHandler }; // Exportar la clase como propiedad de un objeto
