/*
 * Controlador
 */
var Controlador = function(modelo) {
    this.modelo = modelo;
};

Controlador.prototype = {
    agregarPregunta: function(pregunta, respuestas) {
        this.modelo.agregarPregunta(pregunta, respuestas);
    },
    borrarPregunta: function(id) {
        this.modelo.borrarPregunta(id);
    },
    editarPregunta: function(pregunta, nuevaRespuesta) {
        this.modelo.editarPregunta(pregunta, nuevaRespuesta);
    },
    borrarTodo: function() {
        this.modelo.borrarTodo();
    },
    agregarVoto: function(pregunta, respuestaVotada) {
        this.modelo.sumarVoto(pregunta, respuestaVotada);
    },
    guardar: function() {
        this.modelo.guardar();
    },
    cargar: function() {
        if (this.modelo.cargar() === true) {
            this.modelo.cargar();
        }
    }
};
