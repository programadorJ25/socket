const http = require("http");
const sequelize = require("./db/database");
const Message = require("./models/Message");

const server = http.createServer();

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Se ha conectado un cliente");

  socket.on("chatMessage", async (data) => {
    console.log(data);

    // Almacenar el mensaje en la base de datos
    try {
      const message = await Message.create({
        usuario: data.usuario,
        mensaje: data.mensaje,
      });
      console.log("Mensaje almacenado en la base de datos:", message);
    } catch (error) {
      console.error("Error al almacenar el mensaje:", error);
    }

    io.emit("chatMessage", data);
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
