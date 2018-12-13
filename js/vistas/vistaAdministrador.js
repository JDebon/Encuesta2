/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
    this.modelo = modelo;
    this.controlador = controlador;
    this.elementos = elementos;
    var contexto = this;

    // suscripción de observadores
    this.modelo.preguntaAgregada.suscribir(function() {
        contexto.reconstruirLista();
    });
    this.modelo.preguntaEliminada.suscribir(function() {
        contexto.reconstruirLista();
    });
    this.modelo.borrarTodoOb.suscribir(function() {
        contexto.reconstruirLista();
    });
    this.modelo.preguntaEditada.suscribir(function() {
        contexto.reconstruirLista();
    });
};

VistaAdministrador.prototype = {
    //lista
    inicializar: function() {
        if (this.controlador.cargar() !== undefined) {
            this.controlador.cargar();
        }
        this.reconstruirLista();
        this.configuracionDeBotones();
        validacionDeFormulario();
    },

    construirElementoPregunta: function(pregunta) {
        var contexto = this;
        var nuevoItem = $('<li>');
        nuevoItem
            .addClass('list-group-item')
            .attr('id', pregunta.id)
            .text(pregunta.textoPregunta);
        //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
        var interiorItem = $('.d-flex');
        var titulo = interiorItem.find('h5');
        titulo.text(pregunta.textoPregunta);
        interiorItem.find('small').text(
            pregunta.cantidadPorRespuesta.map(function(resp) {
                return ' ' + resp.respuesta;
            })
        );
        nuevoItem.html($('.d-flex').html());
        return nuevoItem;
    },

    reconstruirLista: function() {
        var lista = this.elementos.lista;
        lista.html('');
        var preguntas = this.modelo.preguntas;
        for (var i = 0; i < preguntas.length; ++i) {
            lista.append(this.construirElementoPregunta(preguntas[i]));
        }
    },

    configuracionDeBotones: function() {
        var e = this.elementos;
        var contexto = this;
        //asociacion de eventos a boton
        e.botonAgregarPregunta.click(function() {
            let value = e.pregunta.val();
            let respuestas = [];
            $('[name="option[]"]').each(function() {
                if ($(this).val() != false) {
                    let respuestaObj = { respuesta: $(this).val(), cantidad: 0 };
                    respuestas.push(respuestaObj);
                }
            });
            contexto.limpiarFormulario();
            contexto.controlador.agregarPregunta(value, respuestas);
        });
        e.botonBorrarPregunta.click(function() {
            let id = parseInt($('.list-group-item.active').attr('id'));
            contexto.controlador.borrarPregunta(id);
        });
        e.borrarTodo.click(function() {
            contexto.controlador.borrarTodo();
        });
        e.botonEditarPregunta.click(function() {
            let id = parseInt($('.list-group-item.active').attr('id'));
            let edit = prompt('Por favor, escriba una pregunta');
            contexto.controlador.editarPregunta(id, edit);
        });
        //asociar el resto de los botones a eventos
    },

    limpiarFormulario: function() {
        $('.form-group.answer.has-feedback.has-success').remove();
    }
};
