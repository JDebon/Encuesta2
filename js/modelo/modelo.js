/*
 * Modelo
 */
var Modelo = function() {
    this.preguntas = [];
    this.ultimoId = 0;

    //inicializacion de eventos
    this.preguntaAgregada = new Evento(this);
    this.preguntaEliminada = new Evento(this);
};

Modelo.prototype = {
    //se obtiene el id más grande asignado a una pregunta
    obtenerUltimoId: function() {
        let mayor = 0;
        this.preguntas.forEach(function(element) {
            if (element.id > mayor) {
                mayor = element.id;
            }
        });
        console.log(mayor);
        return mayor;
    },

    //se agrega una pregunta dado un nombre y sus respuestas
    agregarPregunta: function(nombre, respuestas) {
        var id = this.obtenerUltimoId();
        id++;
        var nuevaPregunta = { textoPregunta: nombre, id: id, cantidadPorRespuesta: respuestas };
        this.preguntas.push(nuevaPregunta);
        this.guardar();
        this.preguntaAgregada.notificar();
    },
    borrarPregunta: function(id) {
        this.preguntas = this.preguntas.filter(function(element) {
            if (element.id !== id) {
                return true;
            } else {
                return false;
            }
        });
        this.preguntaEliminada.notificar();
    },

    //se guardan las preguntas
    guardar: function() {}
};
