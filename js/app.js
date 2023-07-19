// Arreglos

const ingresos = [];
const egresos = [];

//Controlador del modulo de Presupuesto
const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

//Constructores de Objetos

class Dato {
    atributos = {};
 
    constructor (descripcion, valor){
       this.atributos._descripcion = descripcion;
       this.atributos._valor = valor;
    };
 
    get descripcion(){
       return this.atributos._descripcion;
    }
 
    set descripcion(nuevaDescripcion){
       if (typeof nuevaDescripcion !== "string"){
          alert("Descripcion invalida")
          return;
       }
 
       this.propiedades._descripcion = nuevaDescripcion
    }
 
    get valor(){
       return this.atributos._valor;
    }
 
    set valor(nuevoValor){
       if (typeof nuevoValor !== "number"){
          alert("Valor invalido")
          return;
       }
 
       this.propiedades._valor = nuevoValor
    }
}

class Ingreso extends Dato {
    contarIngresos = 0;

    constructor (descripcion, valor, id){
        super(descripcion, valor);
        this.atributos._id = id;
    }

    get id(){
        return this.atributos._id;
    }
}

class Egreso extends Dato {
    contarEgresos = 0;

    constructor (descripcion, valor, id){
        super(descripcion, valor);
        this.atributos._id = id;
    }

    get id(){
        return this.atributos._id;
    }
}

// controladores de las operaciones
const totalIngresos = () => {
    let sum = 0;
    for(let prop of ingresos){
        sum += ingresos[prop];
    }

    return sum;
}

const totalEgresos = () => {
    let sum = 0;
    for(let prop of egresos){
        sum += egresos[prop];
    }
    return sum;
}

// Formato de Moneda
const formatoMoneda = (transaccion) => {
    
    const locales = 'esp-MX';
    
    const opciones = {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionsDigits: 2
    };

    const formatoPeso = new Intl.NumberFormat(locales, opciones);
    const formatoPrecio = formatoPeso.format(transaccion);

    return formatoPrecio
}

const formatoPorcentaje = (porcentaje) => {
    
    const locales = 'esp-MX';
    
    const opciones = {style: 'percent'};

    const formatoPorcentado = new Intl.NumberFormat(locales, opciones);
    const porcentajePrecio = formatoPorcentado.format(porcentaje);

    return porcentajePrecio;
}

//Controlador del UI / Carga dinamica de datos
///Carga de Ingresos

const cargarIngreso = () => {
    let ingresosHTML
    for (let ingreso of ingresos){
        crearIngresoHTML(ingresos[prop]);
    }

    let listaIngresos = document.getElementById("lista-ingresos");
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = ` ${document.getElementById("lista-ingresos")} `;

    document.querySelector(".elemento-descripcion") = ingreso.descripcion;
    document.querySelector(".elmento-valor") = formatoMoneda(ingreso.valor);
    document.querySelector(".ion-ios-close-outline") = eliminarIngreso(document.getElementById("ingreso"));

    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(i = (id) => {ingresos.findIndex = id});

    ingresos.splice(indiceEliminar, 1);
}

// Carga de Egresos

const cargarEgreso = () => {
    let egresosHTML
    for (let egreso of egresos){
        crearEgresoHTML(egresos[prop]);
    }

    let listaEgresos = document.getElementById("lista-egresos")
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = ` ${document.getElementById("lista-egresos")} `;

    document.querySelector(".elemento-descripcion") = egreso.descripcion;
    document.querySelector(".elemento-valor") = formatoMoneda(egreso.valor);
    document.querySelector(".ion-ios-close-outline") = eliminarEgreso(document.getElementById("egreso"));

    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(i = (id) => { egresos.findIndex = id});

    egresos.splice(indiceEliminar, 1);
}

// Carga de datos

const agregarDatos = () => {
    let forma = document.getElementById("forma");
    let tipo = document.getElementById("tipo");
    let descripcion = document.getElementById("descripcion");
    let valor = document.getElementById("valor");

    //validacion de datos
    if (descripcion === null && valor === null){
        return;
    }
    else { 
        if(tipo = ingreso){
            ingresos.push(new Ingreso(descripcion, valor))
        }
        else {
            egresos.push(new Egreso(descripcion, valor))
        }
    }
}

// controlador global de la app
function cargarApp () {
    cargarCabecero();
    cargarIngreso();
    cargarEgreso();
}