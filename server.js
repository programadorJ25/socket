const http = require("http");
const sequelize = require("./db/database");
const EventHandler = require("./middleware/EventHandler");
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

  const handleEvent = async (eventName, data) => {
    console.log(`${eventName} recibido:`, data);

    try {
      // Busca y ejecuta el comando correspondiente
      const handlerMethod = commandMap[eventName];
      if (handlerMethod) {
        const message = await handlerMethod(data);
        console.log(
          `Mensaje para ${eventName} almacenado en la base de datos:`,
          message
        );
        io.emit(eventName, data);
      } else {
        console.error("Evento desconocido:", eventName);
      }
    } catch (error) {
      console.error(`Error al almacenar el mensaje para ${eventName}:`, error);
    }
  };

  // Mapeo de eventos a métodos del manejador de comandos
  const commandMap = {
    station: EventHandler.handleStation,
    pumpPm: EventHandler.handlePumpPm,
    pumpLead: EventHandler.handlePumpLead,
    sensorConf: EventHandler.handleSensorConf,
    setPoint: EventHandler.handleSetPoint,
    mappingDi: EventHandler.handleMappingDi,
    mappingDo: EventHandler.handleMappingDo,
    dataEnergy: EventHandler.handleDataEnergy,
    // Añadir nuevos eventos aquí
  };

  // Registrar eventos
  Object.keys(commandMap).forEach((eventName) => {
    socket.on(eventName, (data) => handleEvent(eventName, data));
  });
});

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar con la base de datos:", error);
  })
  .finally(() => {
    server.listen(8080, () => {
      console.log("Servidor escuchando en el puerto 8080");
    });
  });
