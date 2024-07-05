const http = require("http");
const sequelize = require("./db/database");
const PumpState = require("./models/PumpState");
const PumpLead = require("./models/PumpLead");
const LagPump1 = require("./models/LagPump1");
const LagPump2 = require("./models/LagPump2");



const server = http.createServer();

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");

  // Función para manejar el almacenamiento del mensaje
  const handleEvent = async (eventName, data) => {
    console.log(`${eventName} recibido:`, data);

    try {
      let message;
      switch (eventName) {
        case "pumpState":
          message = await PumpState.create({
            plcId: data.plcId,
            pumpState: data.pumpState,
            // Otros campos específicos para event1
          });
          break;
        case "pumpLead":
          message = await PumpLead.create({
            plcId: data.plcId,
            pumpLead: data.pumpLead,
            // Otros campos específicos para event2
          });
          break;
        case "pumpLag1":
          message = await LagPump1.create({
            plcId: data.plcId,
            pumpLag1: data.pumpLag1,
            // Otros campos específicos para event3
          });
          break;
        case "pumpLag2":
          message = await LagPump2.create({
            plcId: data.plcId,
            pumpLag2: data.pumpLag2,
            // Otros campos específicos para event4
          });
          break;
        case "event5":
          message = await Message5.create({
            plcId: data.plcId,
            // Otros campos específicos para event5
          });
          break;
        default:
          console.error("Evento desconocido:", eventName);
          return;
      }
      console.log(
        `Mensaje para ${eventName} almacenado en la base de datos:`,
        message
      );
    } catch (error) {
      console.error(`Error al almacenar el mensaje para ${eventName}:`, error);
    }

    io.emit(eventName, data);
  };

  // Definir los eventos y sus handlers
  const events = ["pumpState", "pumpLead", "pumpLag1", "pumpLag2", "event5"];

  events.forEach((eventName) => {
    socket.on(eventName, (data) => handleEvent(eventName, data));
  });
});

sequelize
  .sync()
  .then(() => {
    server.listen(8080, () => {
      console.log("Servidor escuchando en el puerto 8080");
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar con la base de datos:", error);
  });
