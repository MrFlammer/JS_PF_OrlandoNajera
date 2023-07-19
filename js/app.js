// constructor de datos

class Dato {
    atributos = {}

    constructor(descripcion, valor){;
        this.atributos._descripcion = descripcion;
        this.atributos._valor = valor;
    }

    get descripcion(){
        return this.atributos._descripcion;
    }
    set descripcion(nuevaDescripcion){
        this.atributos._descripcion = nuevaDescripcion;
    }

    get valor(){
        return this.atributos._valor;
    }
    set valor(nuevoValor){
        this.atributos._valor = nuevoValor;
    }
}

//clase constructor de Ingresos
class Ingreso extends Dato {
    contarIngresos = 0;

    constructor(id, descripcion, valor){
        super(descripcion, valor);
        this.atributos._id = id;
        
    }

    get id(){
        return this.atributos._id;
    }
}

//clase constructor de Egresos
class Egreso extends Dato {
    contarEgresos = 0;

    constructor(id, descripcion, valor){
        super(descripcion, valor)
        this.atributos._id = id;
        
    }

    get id(){
        return this.atributos._id;
    }
}

/// Datos
let ingresos = [];
let egresos = [];

///generadores de datos

function nuevoIngreso(descripcion, valor) {
    new Ingreso(descripcion,valor);
    ingresos.push({ Descripcion: descripcion, valor: valor});
}

function nuevoEgreso(descripcion, valor) {
    new Egreso(descripcion,valor);
    egresos.push({ Descripcion: descripcion, valor: valor});
}

nuevoIngreso("Salario", 20000);
nuevoIngreso("Venta auto", 50000);

nuevoEgreso("Renta", 4000);
nuevoEgreso("Ropa", 800);

/// Controlador del modulo de presupuesto

const cargarCabecero = () => {
    var presupuesto = totalIngresos() - totalEgresos();
    var porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
}

/// controladores de las operaciones principales

const totalIngresos = () => {
    let sum = ingresos.reduce((previous, current) => {return previous + current.valor}, 0);
    return sum;
}

const totalEgresos = () => {
    let sum = egresos.reduce((previous, current) => {return previous + current.valor}, 0);
    return sum
}

///controladores del formato de los datos

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

///Carga dinamica de datos

//ingresos

const cargarIngresos = () => {
    let ingresosHTML
    for (let i = 0; i < ingresos.length; i++) {
        crearIngresoHTMl + JSON.stringify(ingresos[i]);
    }
    ingresosHTML = document.getElementById("lista-ingresos");
}
const crearIngresoHTMl = (ingreso) => {}

/// Eliminar Ingresos

const eliminarIngresos = (id) => {
    let indiceEliminar = ingresos.findIndex((id) => {
        for (let i = 0; i < ingresos.length; i++ ){}
    });
    ingresos.splice(indiceEliminar, 1);

    cargarCabecero();
    cargarIngresos();
}

/// Egresos
const cargarEgresos = () => {
    let egresosHTML
    for (let i = 0; i < egresos.length; i++){
        crearEgresoHTML(JSON.stringify(egresos[i]));
    }
    egresosHTML = document.getElementById("lista-egresos");
}

const crearEgresoHTML = (egreso) => {}

//Eliminar Egresos

const eliminarEgresos = (id) => {
    let indiceEliminar = egresos.findIndex((id) => {return egresos[i].id = id});
    egresos.splice(indiceEliminar, 1);

    cargarCabecero();
    cargarEgresos();
}

/// Cargar Datos

const agregarDato = () => {
    let forma = document.getElementById("forma");
    let tipo = document.getElementById("tipo");
    let descripcion = document.getElementById("descripcion");
    let valor = document.getElementById("valor");

    if(descripcion !== null && typeof(descripcion) === 'string' || valor !== null && typeof(valor) === 'number'){
        if(tipo === "ingreso") {
            // se agrega la descripcion y el valor al arrglo de ingresos
            nuevoIngreso(descripcion, valor);
            cargarCabecero();
            cargarIngresos();
        }
        else {
            //se agrega la descripcion y el valor al arreglo de egresos
            nuevoEgreso(descripcion, valor);
            cargarCabecero();
            cargarEgresos();
        }
    }
}

function cargarApp () {
    cargarCabecero();
}