import express from "express";
import {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest,
} from "./controller.js";

const peliculaRoutes = express.Router();

peliculaRoutes.post("/", handleInsertPeliculaRequest);
peliculaRoutes.get("/", handleGetPeliculasRequest);
peliculaRoutes.get("/:id", handleGetPeliculaByIdRequest);
peliculaRoutes.put("/:id", handleUpdatePeliculaByIdRequest);
peliculaRoutes.delete("/:id", handleDeletePeliculaByIdRequest);

export default peliculaRoutes;
