import express from "express"
import indexRoutes from "./Routes/index.routes.js"
import itemsRoutes from "./Routes/items.routes.js"
import loginRoute from "./Routes/login.routes.js"


const app = express();
app.use(express.json());


app.use(indexRoutes);
app.use(itemsRoutes);
app.use(loginRoute);

app.listen(5000, () => {
  console.log('Servidor ejecutándose en http://localhost:5000');
});