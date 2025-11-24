export class Actor {
  constructor({ idPelicula, nombre, edad, estaRetirado, premios }) {
    this.idPelicula = idPelicula; // string con el ObjectId de la película
    this.nombre = nombre;
    this.edad = Number.isInteger(edad) ? edad : parseInt(edad, 10);
    this.estaRetirado =
      typeof estaRetirado === "boolean"
        ? estaRetirado
        : estaRetirado === "true";
    this.premios = Array.isArray(premios) ? premios : [];
  }
}
