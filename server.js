const http = require("http");
const sequelize = require("./db/database");
const PumpState = require("./models/PumpState");
const PumpLead = require("./models/PumpLead");
const LagPump1 = require("./models/LagPump1");
const LagPump2 = require("./models/LagPump2");
const Station = require("./models/Station");
const SetPoint = require("./models/SetPoint");

const server = http.createServer();

// const io = require("socket.io")(server, {
//   cors: { origin: "*" },
// });

const allowedOrigins = [
  "http://localhost:3000",
  "http://your-production-url.com",
]; // Agrega aquí todos los orígenes permitidos

const io = require("socket.io")(server, {
  // cors: {
  //   origin: (origin, callback) => {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  //   methods: ["GET", "POST"],
  //   credentials: true,
  // },
  cors: {
    origin: true, // Permite cualquier origen
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");

  // Función para manejar el almacenamiento del mensaje
  const handleEvent = async (eventName, data) => {
    console.log(`${eventName} recibido:`, data);

    try {
      let message;
      switch (eventName) {
        case "pumpPm":
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
        case "pumpNext":
          message = await LagPump1.create({
            plcId: data.plcId,
            pumpLag1: data.pumpLag1,
            // Otros campos específicos para event3
          });
          break;
        case "sensorConf":
          message = await LagPump2.create({
            plcId: data.plcId,
            sensorConf: data.sensorConf,
            // Otros campos específicos para event4
          });
          break;
        case "station":
          message = await Station.create({
            plcId: data.plcId,
            station: data.station,
            // Otros campos específicos para event5
          });
        case "setPoint":
          message = await SetPoint.create({
            plcId: data.plcId,
            setPoint: data.setPoint,
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
  const events = [
    "pumpPm",
    "pumpLead",
    "pumpNext",
    "sensorConf",
    "station",
    "setPoint",
  ];

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
