const { Router } = require('express');
const router = Router();
const Data = require('../models/data');
const xl = require("excel4node");
const path = require('path');

router.get("/", async(req, res) => {

    var data = await Data.find().sort({$natural:-1});
    res.render("index", { data });
})

// Agregar Producto
router.post("/add", async(req, res) => {

    console.log(req.body)
     const { nombre, cedula, numero, correo, fijo, apt, torre, local, parqueadero, numeroResidentes, nombresResidentes, esUsted, vehiculos, mascotas, visitantesFrecuentes, empleados } = req.body;
     const coment = new Data({ nombre, cedula, numero, correo, fijo, apt, torre, local, parqueadero, numeroResidentes, nombresResidentes, esUsted, vehiculos, mascotas, visitantesFrecuentes, empleados });
     await coment.save();
     res.json("Guardado Correctamente");
})

router.get("/download-excel", async(req, res) => {

    var data = await Data.find().sort({$natural:-1});

    var contador = 1
    let wb = new xl.Workbook()
    let ws = wb.addWorksheet("Datos de usuarios - callejuelas")

    let style = wb.createStyle({

        font: {
            color: "red"
        }
    })
    // Creando casillass excel

    ws.cell(1,1).string("Torre").style(style)
    ws.cell(1,2).string("Apt").style(style)
    ws.cell(1,3).string("Propietario").style(style)
    ws.cell(1,4).string("Arrendatario").style(style)
    ws.cell(1,5).string("Nombre").style(style)
    ws.cell(1,6).string("Cedula").style(style)
    ws.cell(1,7).string("Telefono").style(style)
    ws.cell(1,8).string("Numero Celular").style(style)
    ws.cell(1,9).string("Correo").style(style)
    ws.cell(1,10).string("Numero de residentes").style(style)
    ws.cell(1,11).string("Vehiculos").style(style)
    ws.cell(1,12).string("Perro").style(style)
    ws.cell(1,13).string("Gato").style(style)
    ws.cell(1,14).string("Empleados").style(style)
    ws.cell(1,15).string("Nombre de empleados").style(style)
    ws.cell(1,16).string("Visitantes frecuentes").style(style)
    ws.cell(1,17).string("Nombres de visitantes").style(style)

    data.forEach((el) => {

        contador += 1
        ws.cell( contador , 1 ).string(el.torre)
        ws.cell( contador , 2 ).string(el.apt)
        ws.cell( contador , 3 ).string(el.esUsted[0] == "Propetario" ?  "Si" :  "No")
        ws.cell( contador , 4 ).string(el.esUsted[0] == "Arrendatario" ?  "Si" :  "No")
        ws.cell( contador , 5 ).string(el.nombre)
        ws.cell( contador , 6 ).string(el.cedula)
        ws.cell( contador , 7 ).string(el.fijo)
        ws.cell( contador , 8 ).string(el.numero)
        ws.cell( contador , 9 ).string(el.correo)
        ws.cell( contador , 10 ).string(el.numeroResidentes)
        ws.cell( contador , 11 ).string(`Placa Moto: ${el.vehiculos[1]}, Placa Carro: ${el.vehiculos[0]}`)
        ws.cell( contador , 12 ).string(`Numero de perros: ${el.mascotas[0].cantidadPerros}, Raza de perros: ${el.mascotas[0].razaPerros}`)
        ws.cell( contador , 13 ).string(`Numero de gatos: ${el.mascotas[1].cantidadGatos}, Raza de gatos: ${el.mascotas[1].razaGatos}`)
        ws.cell( contador , 14 ).string(el.empleados[0] == "No tiene empleados" || el.visitantesFrecuentes[0] == "No es residente" ?  "No" :  "Si")
        ws.cell( contador , 15 ).string(`${el.empleados[0]}, ${el.empleados[1]}`)
        ws.cell( contador , 16 ).string(el.visitantesFrecuentes[0] == "No tiene visitantes frecuentes"  || el.visitantesFrecuentes[0] == "No es residente" ?  "No" :  "Si")
        ws.cell( contador , 17 ).string(el.visitantesFrecuentes[0] == "No tiene visitantes frecuentes"  || el.visitantesFrecuentes[0] == "No es residente" ? "No tiene visitantes frecuentes" : `${el.visitantesFrecuentes[0]}, ${el.visitantesFrecuentes[1]}, ${el.visitantesFrecuentes[2]}`)
    })
    
    
    
    //ws.cell(1,1).string("prueba")





    //Descargando excel

    console.log("Excel Generado");

    const pathExcel = path.join(__dirname, 'datosUsuariosCallejuelas.xlsx')

    wb.write(pathExcel, function(err, stats) {

        if(err){
            console.log(err);
        }else{

            function downloadFile(){

                res.download(pathExcel)
            }
            downloadFile()
            return false
        }
    })
})



module.exports = router;