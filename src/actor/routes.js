import express from "express";
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaRequest,
} from "./controller.js";

const actorRoutes = express.Router();

actorRoutes.post("/", handleInsertActorRequest);

actorRoutes.get("/", handleGetActoresRequest);

actorRoutes.get("/:id", handleGetActorByIdRequest);

actorRoutes.get("/pelicula/:peliculaId", handleGetActoresByPeliculaRequest);

export default actorRoutes;
