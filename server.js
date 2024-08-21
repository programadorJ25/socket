const http = require("http");
const sequelize = require("./db/database");
const { EventHandler } = require('./middleware/EventHandler');
const eventHandler = new EventHandler();
const server = http.createServer();


const allowedOrigins = [
  "http://localhost:3000",
  "http://your-production-url.com",
]; // Agrega aquí todos los orígenes permitidos

const io = require("socket.io")(server, {
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
      // Busca y ejecuta el comando correspondiente en la instancia
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
    station: eventHandler.handleStation, // Usar la instancia
    pumpPm: eventHandler.handlePumpPm, // Usar la instancia
    pumpLead: eventHandler.handlePumpLead,
    sensorConf: eventHandler.handleSensorConf,
    setPoint: eventHandler.handleSetPoint,
    mappingDi: eventHandler.handleMappingDi,
    mappingDo: eventHandler.handleMappingDo,
    dataEnergy: eventHandler.handleDataEnergy,
    // Añadir nuevos eventos aquí
  };

  // Registrar eventos
  Object.keys(commandMap).forEach((eventName) => {
    socket.on(eventName, (data) => handleEvent(eventName, data));
  });
});

// Inicia un intervalo para hacer batch insert cada 10 segundos (ajusta según necesites)
setInterval(async () => {
  try {
    await eventHandler.batchInsertData(); // Usar la instancia
  } catch (error) {
    console.error("Error durante el batch insert:", error);
  }
}, 10000); // 10 segundos

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
