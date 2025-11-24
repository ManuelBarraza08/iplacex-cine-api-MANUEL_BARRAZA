import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://manuelbarrazac8_db_user:<princesa08>@prog-webservices-s1-ej3.y67krqx.mongodb.net/?appName=prog-webservices-s1-ej3-cluster";

const client = new MongoClient(uri);
const dbName = "cine-db";

let db = null;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  await client.connect();
  db = client.db(dbName);
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error(
      "La conexión a la base de datos no ha sido inicializada."
    );
  }
  return db;
}

export function getCollection(collectionName) {
  return getDb().collection(collectionName);
}
