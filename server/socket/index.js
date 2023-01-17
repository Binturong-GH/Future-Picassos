const Product = require("../db/models/productModel");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id, " has made a persistent connection to the server!");

    socket.on("product/create", (message) => {
      socket.broadcast.emit("product/create", message);
    });

    socket.on("product/edit", (message) => {
      // console.log(message);
      socket.broadcast.emit("product/edit", message);
    });
  });
};
