require('dotenv').config();
const app = require("./src/app");
const connectToDb = require("./src/db/db");


// Connect to the database
connectToDb();
const PORT = process.env.PORT || 3000;
// KAVERI
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});