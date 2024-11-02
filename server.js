// Importar las dependencias
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const sequelize = require("./db/database");
const { EventHandler } = require("./middleware/EventHandler");

// Crear la aplicación Express
const app = express();

// Crear un servidor HTTP
const server = http.createServer(app);

// Configurar Socket.io
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://your-production-url.com", // Agrega aquí tus orígenes permitidos
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware para permitir CORS y parsear JSON
app.use(cors());
app.use(express.json());  // Para poder parsear el cuerpo de las solicitudes JSON

// Manejador de eventos
const eventHandler = new EventHandler();

// Mapeo de eventos a métodos del manejador de comandos
const commandMap = {
  station: eventHandler.handleStation,
  setPoint: eventHandler.handleSetPoint,
  mappingDi: eventHandler.handleMappingDi,
  mappingDo: eventHandler.handleMappingDo,
  dataEnergy: eventHandler.handleDataEnergy,
  analogInScale: eventHandler.handleAnalogInputScale,
  lowDischarge: eventHandler.handleLowDischarge,
  highDischarge: eventHandler.handleHighDischarge,
  lowLevel: eventHandler.handleLowLevel,
  failurePhase: eventHandler.handleFailurePhase,
  failureVFD: eventHandler.handleFailureVFD,
  filterStation: eventHandler.handleFilterStation,
  fertigation: eventHandler.handleFertigation,
  lakeLevel: eventHandler.handleLakeLevel,
  vsdPumpPM: eventHandler.handleVsdPumpPM,
  vsdPump1: eventHandler.handleVsdPump1,
  vsdPump2: eventHandler.handleVsdPump2,
  bombaPM: eventHandler.handleBombaPM,
  bombaLider: eventHandler.handleBombaLider,
  bombaAux: eventHandler.handleBombaAux,
  alarms: eventHandler.handleAlarms,
  sintonizacion: eventHandler.handleSintonizacion,
};

// Manejar conexiones de Socket.io
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  // Escuchar el evento para unirse a una sala
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Cliente ${socket.id} se ha unido a la sala: ${roomId}`);
  });

  // Registrar eventos
  Object.keys(commandMap).forEach((eventName) => {
    socket.on(eventName, async (data) => {
      console.log(`${eventName} recibido:`, data);
      try {
        const handlerMethod = commandMap[eventName];
        if (handlerMethod) {
          const message = await handlerMethod(data);
          console.log(`Mensaje para ${eventName} almacenado en la base de datos:`, message);
          // Emitir datos a la sala correspondiente
          if (data.id) {
            io.to(data.id).emit(eventName, data); // Emitir solo a la sala del cliente
          } else {
            io.emit(eventName, data); // Emitir a todos si no hay ID
          }
        } else {
          console.error("Evento desconocido:", eventName);
        }
      } catch (error) {
        console.error(`Error al manejar el evento ${eventName}:`, error);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Endpoint para recibir datos desde el script Python
app.post("/dataLogger", (req, res) => {
  const datos = req.body;  // Obtiene los datos enviados
  if (!datos) {
    console.error("No se recibieron datos");
    return res.sendStatus(400); // Responde con un código de estado 400 (Bad Request)
  }
  
  console.log("Datos recibidos del script:", JSON.stringify(datos, null, 2));

  // Emitir el evento a la sala correspondiente
  if (datos.id) {
    io.to(datos.id).emit("dataLogger", datos); // Cambia 'dataLogger' por el nombre del evento que quieras usar
  }

  res.sendStatus(200);  // Responde con un código de estado 200 (OK)
});

// Iniciar un intervalo para hacer batch insert cada 10 segundos (ajusta según necesites)
setInterval(async () => {
  try {
    await eventHandler.batchInsertData(); // Usar la instancia
  } catch (error) {
    console.error("Error durante el batch insert:", error);
  }
}, 10000); // 10 segundos

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar con la base de datos:", error);
  })
  .finally(() => {
    server.listen(82, () => {
      console.log("Servidor escuchando en el puerto 82");
    });
  });
