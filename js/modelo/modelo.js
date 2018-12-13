/*
 * Modelo
 */
var Modelo = function() {
    this.preguntas = [];
    this.ultimoId = 0;

    //inicializacion de eventos
    this.preguntaAgregada = new Evento(this);
    this.preguntaEliminada = new Evento(this);
    this.borrarTodoOb = new Evento(this);
    this.preguntaEditada = new Evento(this);
    this.voto = new Evento(this);
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
        localStorage.removeItem('preguntas');
        this.guardar();
        this.preguntaEliminada.notificar();
    },
    sumarVoto: function(pregunta, respuesta) {
        this.preguntas.forEach(function(preguntaActual) {
            if (preguntaActual.textoPregunta === pregunta) {
                preguntaActual.cantidadPorRespuesta.forEach(function(respuestaObj) {
                    if (respuestaObj.respuesta === respuesta) {
                        respuestaObj.cantidad++;
                    }
                });
            }
        });
        this.guardar();
        this.voto.notificar();
    },
    editarPregunta: function(pregunta, preguntaEditada) {
        this.preguntas.forEach(function(element) {
            if (element.id === pregunta) {
                element.textoPregunta = preguntaEditada;
            }
        });
        this.guardar();
        this.preguntaEditada.notificar();
    },
    borrarTodo: function() {
        this.preguntas = [];
        localStorage.removeItem('preguntas');
        this.borrarTodoOb.notificar();
    },
    //se guardan las preguntas
    guardar: function() {
        localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
    },
    cargar: function() {
        this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
        if (this.preguntas !== null) {
            return true;
        } else {
            this.preguntas = [];
            return false;
        }
    }
};
