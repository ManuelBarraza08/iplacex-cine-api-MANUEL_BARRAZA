import express from "express";
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaRequest,
} from "./controller.js";

const actorRoutes = express.Router();

actorRoutes.post("/actor", handleInsertActorRequest);
actorRoutes.get("/actores", handleGetActoresRequest);
actorRoutes.get("/actor/:id", handleGetActorByIdRequest);
// Se adapta la ruta a /actor/pelicula/:peliculaId para evitar conflicto con /actor/:id
actorRoutes.get("/actor/pelicula/:peliculaId", handleGetActoresByPeliculaRequest);

export default actorRoutes;
