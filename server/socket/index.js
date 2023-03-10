module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    socket.on("product/create", (message) => {
      socket.broadcast.emit("product/create", message);
    });

    socket.on("product/edit", (message) => {
      socket.broadcast.emit("product/edit", message);
    });

    socket.on("product/delete", (id) => {
      socket.broadcast.emit("product/delete", id);
    });
  });
};
