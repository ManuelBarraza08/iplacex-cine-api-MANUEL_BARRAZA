import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido al cine Iplacex");
});

app.use("/api/peliculas", peliculaRoutes);
app.use("/api/actores", actorRoutes);

connectToDatabase()
  .then(() => {
    console.log("Conexión exitosa a MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`Servidor Express escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB Atlas:", error);
    process.exit(1);
  });
