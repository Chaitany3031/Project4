require('dotenv').config();
const app = require("./src/app");
const connectToDb = require("./src/db/db");
const initSocketServer = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app);

// Connect to the database
connectToDb();

// Pass httpServer instead of app
initSocketServer(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
