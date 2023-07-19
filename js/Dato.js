class Dato {
   atributos = {};

   constructor (descripcion, valor, id){
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