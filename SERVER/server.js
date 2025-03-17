require("dotenv").config();
const app = require("./app");

const dbConfig = require("./config/dbConfig");

const PORT=process.env.PORT_NUMBER || 8000 ;

app.listen(PORT,() => {
  console.log(`Server started at port ${PORT}`);
});