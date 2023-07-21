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
    static contarIngresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor);
        this.atributos._id = Ingreso.contarIngresos += 1;
    }
    get id(){
        return this.atributos._id;
    }
}

//clase constructor de Egresos
class Egreso extends Dato {
    static contarEgresos = 0;

    constructor(descripcion, valor){
        super(descripcion, valor)
        this.atributos._id = Egreso.contarEgresos += 1; 
    }
    get id(){
        return this.atributos._id;
    }
}

/// Datos
let ingresos = [];
let egresos = [];

///generadores de datos
///generador de ingresos
function nuevoIngreso(descripcion, valor) {
    new Ingreso(descripcion,valor);
    ingresos.push({id: Ingreso.contarIngresos, descripcion: descripcion, valor: valor});
}
//generador de egresos
function nuevoEgreso(descripcion, valor) {
    new Egreso(descripcion,valor);
    egresos.push({id: Egreso.contarEgresos, descripcion: descripcion, valor: valor});
}
 //Objetos generados por defecto
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
    let ingresosHTML = "";
    for (i = 0; i < ingresos.length; i++) { 
        ingresosHTML += crearIngresoHTML(ingresos[i]);
    }
    document.getElementById("lista_ingresos").innerHTML = ingresosHTML;
    return;

    /*ingresos.forEach(ingreso => ingresosHTML += crearIngresoHTML(ingreso));
    document.getElementById("lista_ingresos").innerHTML = ingresosHTML;*/
}
const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `<div id="lista_ingresos">
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
        ${ingreso.descripcion}
        </div>

        <div class="derecha limpiarEstilos">
            <div class="elemento_valor" id="prueba">
                ${formatoMoneda(ingreso.valor)}
            </div>

            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn">
                    <i class="ion-ios-close-outline"></i>
                </button>
            </div>
        </div>
    </div>`
    return ingresoHTML;
}
/// Eliminar Ingresos

const eliminarIngresos = (id) => {
    const eliminarIngresos = ingresos.findIndex(ingreso => ingreso === id);
    ingresos.splice(eliminarIngresos, 1);
    cargarCabecero();
    cargarIngresos();
}

/// Egresos
const cargarEgresos = () => {
    let egresosHTML = "";
    for (i = 0; i < egresos.length; i++) { 
        egresosHTML += crearEgresoHTML(egresos[i]);
    }
    document.getElementById("lista_egresos").innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `<div id="lista_egresos">
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            ${egreso.descripcion}
        </div>

        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                ${formatoMoneda(egreso.valor)}
            </div>

            <div class="elemento_porcentaje">
                ${formatoPorcentaje(egreso.valor / totalEgresos())}
            </div>

            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn">
                    <i class="ion-ios-close-outline"></i>
                </button>
            </div>
        </div>
    </div>`
    return egresoHTML;
}
//Eliminar Egresos

const eliminarEgresos = (id) => {
    let indiceEliminar = "";

    cargarCabecero();
    cargarEgresos();
}

/// Cargar Datos

const agregarDato = () => {
    const forma = document.getElementById("forma");
    const tipo = document.getElementById("tipo");
    const descripcion = document.getElementById("descripcion").value;
    const valor = document.getElementById("valor").value;
    if(descripcion.value !== "" && typeof(descripcion) === 'string' || valor.value !== "" && typeof(valor) == 'number'){

        if (tipo.value === "ingreso"){
            nuevoIngreso(descripcion, +valor);
            cargarCabecero();
            cargarIngresos();
        } 
        else if (tipo.value === "egreso"){
            nuevoEgreso(descripcion, +valor);
            cargarCabecero();
            cargarEgresos();
        }
    }
    else {console.log("Hola");}
} 
/// Control App
function cargarApp() {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

console.log(ingresos);
console.log(egresos);