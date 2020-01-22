const eventEmitter = require("events");
const http = require("http");
const url = require("url");

class Sale extends eventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sale();

myEmitter.on("newSale", () => {
  console.log("There was a sale");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Ankit");
});

myEmitter.on("newSale", stock => {
  console.log(`There are now ${stock} items left in stock`);
});

myEmitter.emit("newSale", 9);

////////////////////////////////////

///

////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieved!");
  console.log(req.url);
  res.end("Request Recieved");
});

server.on("request", (req, res) => {
  console.log("Another Request recieved!");
});

server.on("close", () => {
  console.log("Server closed down");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request");
});
