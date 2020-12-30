import express from "express"; //import express npm package
import routes from "./routes"; //import routes folder
import cors from "cors";
import db from "./config/database";
import { saveBodyMesurmentsConstoller } from "./routes/api/v0/mesurments/mesurment-controller";

require("dotenv").config(); //load environmental variables

const app = express();

/**
 * Middleware
 */

app.use(cors());
app.use(express.json({ limit: "50mb" }));

/**
 * Database connection
 */
db.authenticate()
  .then(() => console.log("Database connected successfully..."))
  .catch((error) => console.log("Error", error.message));

routes(app);

/**
 * Save mesurment data
 */
saveBodyMesurmentsConstoller();

/**
 * Inilizing the server
 */
app.listen(process.env.API_PORT, () => {
  console.log(`server started in port : ${process.env.API_PORT}`);
});
