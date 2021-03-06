const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/image", express.static("uploads"));
const db = require("./app/models");
//prod
db.sequelize.sync();

//dev
// db.sequelize.sync({ force: true }).then(() => {
//  console.log("Drop and re-sync db.");
// });

/* CORS */
// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000/" }));
// const cors = require("cors")
// app.use(cors())

const cors = require('cors');

app.use(cors({
  origin: true,
  credentials: true
}));
// const cors = require('cors');
// const corsOptions = {
//   origin: "http://localhost:3000/",
//   credentials: true
// }
// app.use(cors(corsOptions));
require("./app/routes/route")(app);

// set port, listen for requests
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
