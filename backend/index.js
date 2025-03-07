import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./Routes/index.routes.js";
import itemsRoutes from "./Routes/items.routes.js";
import itemsRoutesMongo from "./Model/items.model.routes.js";
import loginRoute from "./Routes/login.routes.js";
import { conectDB } from "./Utils/mongodb.js";

const app = express();
app.use(express.json());

conectDB();

app.use(cors());
app.use(morgan("dev"))
app.use(indexRoutes);
app.use(itemsRoutes);
app.use(itemsRoutesMongo);
app.use(loginRoute);

app.listen(5000, () => {
  console.log('Servidor ejecutándose en http://localhost:5000');
});