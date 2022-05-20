const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    
         "nombre": String ,
          "cedula": String,
          "numero": String,
          "correo": String,
          "fijo": String,
          "apt": String,
          "torre": String,
          "local": String,
          "parqueadero": String,
          "numeroResidentes": String,
          "nombresResidentes": Array,
          "esUsted": Array,
          "vehiculos": Array,
          "mascotas": Array,
          "visitantesFrecuentes": Array,
          "empleados": Array

}, {
    versionKey: false
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;