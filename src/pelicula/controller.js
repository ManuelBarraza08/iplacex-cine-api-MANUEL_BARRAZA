import { ObjectId } from "mongodb";
import { getCollection } from "../common/db.js";
import { Pelicula } from "./pelicula.js";


const peliculaCollection = () => getCollection("peliculas");

export async function handleInsertPeliculaRequest(req, res) {
  const { nombre, generos, anioEstreno } = req.body;

  const pelicula = new Pelicula({ nombre, generos, anioEstreno });

  peliculaCollection()
    .insertOne(pelicula)
    .then((result) => {
      res.status(201).json({
        message: "Película creada correctamente",
        peliculaId: result.insertedId,
      });
    })
    .catch((error) => {
      console.error("Error al insertar película:", error);
      res.status(500).json({ error: "Error al insertar película" });
    });
}

export async function handleGetPeliculasRequest(req, res) {
  peliculaCollection()
    .find({})
    .toArray()
    .then((peliculas) => {
      res.status(200).json(peliculas);
    })
    .catch((error) => {
      console.error("Error al obtener películas:", error);
      res.status(500).json({ error: "Error al obtener películas" });
    });
}

export async function handleGetPeliculaByIdRequest(req, res) {
  const { id } = req.params;

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Id mal formado. Debe ser un ObjectId válido." });
  }

  peliculaCollection()
    .findOne({ _id: objectId })
    .then((pelicula) => {
      if (!pelicula) {
        return res.status(404).json({ error: "Película no encontrada" });
      }
      res.status(200).json(pelicula);
    })
    .catch((error) => {
      console.error("Error al obtener película por id:", error);
      res.status(500).json({ error: "Error al obtener película" });
    });
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
  const { id } = req.params;
  const { nombre, generos, anioEstreno } = req.body;

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Id mal formado. Debe ser un ObjectId válido." });
  }

  const updateDoc = {
    $set: {},
  };

  if (nombre !== undefined) updateDoc.$set.nombre = nombre;
  if (generos !== undefined)
    updateDoc.$set.generos = Array.isArray(generos) ? generos : [];
  if (anioEstreno !== undefined)
    updateDoc.$set.anioEstreno = Number.isInteger(anioEstreno)
      ? anioEstreno
      : parseInt(anioEstreno, 10);

  peliculaCollection()
    .updateOne({ _id: objectId }, updateDoc)
    .then((result) => {
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Película no encontrada" });
      }
      res.status(200).json({ message: "Película actualizada correctamente" });
    })
    .catch((error) => {
      console.error("Error al actualizar película:", error);
      res.status(500).json({ error: "Error al actualizar película" });
    });
}

export async function handleDeletePeliculaByIdRequest(req, res) {
  const { id } = req.params;

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Id mal formado. Debe ser un ObjectId válido." });
  }

  peliculaCollection()
    .deleteOne({ _id: objectId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Película no encontrada" });
      }
      res.status(200).json({ message: "Película eliminada correctamente" });
    })
    .catch((error) => {
      console.error("Error al eliminar película:", error);
      res.status(500).json({ error: "Error al eliminar película" });
    });
}
