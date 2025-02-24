import express from "express"
import indexRoutes from "./Routes/index.routes.js"

const app = express();

app.use(indexRoutes)

app.listen(5000, () => {
  console.log('Servidor ejecutándose en http://localhost:5000');
});