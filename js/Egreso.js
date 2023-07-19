class Egreso extends Dato (){
    contarEgresos = 0;

    constructor (descripcion, valor, id){
        super(descripcion, valor);
        this.atributos._id = id;
    }

    get id(){
        return this.atributos._id;
    }
}