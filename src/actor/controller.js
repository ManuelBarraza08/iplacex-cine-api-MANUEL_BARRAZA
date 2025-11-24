import { ObjectId } from "mongodb";
import { getCollection } from "../common/db.js";
import { Actor } from "./actor.js";

const actorCollection = () => getCollection("actores");
const peliculaCollection = () => getCollection("peliculas");

export async function handleInsertActorRequest(req, res) {
  const { idPelicula, nombre, edad, estaRetirado, premios } = req.body;

  let peliculaObjectId;
  try {
    peliculaObjectId = new ObjectId(idPelicula);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "idPelicula no es un ObjectId válido" });
  }

  peliculaCollection()
    .findOne({ _id: peliculaObjectId })
    .then((pelicula) => {
      if (!pelicula) {
        return res.status(404).json({
          error: "Película no encontrada para el idPelicula proporcionado",
        });
      }

      const actor = new Actor({
        idPelicula,
        nombre,
        edad,
        estaRetirado,
        premios,
      });

      return actorCollection()
        .insertOne(actor)
        .then((result) => {
          res.status(201).json({
            message: "Actor creado correctamente",
            actorId: result.insertedId,
          });
        });
    })
    .catch((error) => {
      console.error("Error al insertar actor:", error);
      res.status(500).json({ error: "Error al insertar actor" });
    });
}

export async function handleGetActoresRequest(req, res) {
  actorCollection()
    .find({})
    .toArray()
    .then((actores) => {
      res.status(200).json(actores);
    })
    .catch((error) => {
      console.error("Error al obtener actores:", error);
      res.status(500).json({ error: "Error al obtener actores" });
    });
}

export async function handleGetActorByIdRequest(req, res) {
  const { id } = req.params;

  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Id mal formado. Debe ser un ObjectId válido." });
  }

  actorCollection()
    .findOne({ _id: objectId })
    .then((actor) => {
      if (!actor) {
        return res.status(404).json({ error: "Actor no encontrado" });
      }
      res.status(200).json(actor);
    })
    .catch((error) => {
      console.error("Error al obtener actor por id:", error);
      res.status(500).json({ error: "Error al obtener actor" });
    });
}

export async function handleGetActoresByPeliculaRequest(req, res) {
  const { peliculaId } = req.params;

  // En la colección de actores se guarda idPelicula como string (ObjectId.toString())
  actorCollection()
    .find({ idPelicula: peliculaId })
    .toArray()
    .then((actores) => {
      if (!actores || actores.length === 0) {
        return res
          .status(404)
          .json({ error: "No se encontraron actores para esa película" });
      }
      res.status(200).json(actores);
    })
    .catch((error) => {
      console.error("Error al obtener actores por id de película:", error);
      res.status(500).json({ error: "Error al obtener actores" });
    });
}
