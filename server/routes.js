/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
    // Insert routes below

    //Ruber
    app.use('/api/tipos_formacion', require('./api/tipos_formacion'));
    app.use('/api/conocimientos_conceptos_principios', require('./api/conocimientos_conceptos_principios'));
    app.use('/api/conocimientos_proceso', require('./api/conocimientos_proceso'));
    app.use('/api/niveles_formacion', require('./api/niveles_formacion'));
    app.use('/api/redes_tecnologicas', require('./api/redes_tecnologicas'));
    app.use('/api/lineas_tecnologicas', require('./api/lineas_tecnologicas'));
    app.use('/api/modalidades_formacion', require('./api/modalidades_formacion'));
    app.use('/api/tipos_competencia', require('./api/tipos_competencia'));
    app.use('/api/programas', require('./api/programas'));

    //Paola y Deisy
    app.use('/api/tipos_rubro', require('./api/tipos_rubro'));
    app.use('/api/unidades_medida', require('./api/unidades_medida'));
    app.use('/api/tipos_recurso', require('./api/tipos_recurso'));
    app.use('/api/novedades_instructor', require('./api/novedades_instructor'));
    app.use('/api/fuente_recursos', require('./api/fuente_recursos'));
    app.use('/api/categorias_ambiente', require('./api/categorias_ambiente'));
    app.use('/api/ambientes_formacion', require('./api/ambientes_formacion'));
    app.use('/api/tipos_ambiente', require('./api/tipos_ambiente'));
    app.use('/api/regionales', require('./api/regionales'));
    app.use('/api/etapas_practicas', require('./api/etapas_practica'));
    app.use('/api/estilos_aprendizaje', require('./api/estilos_aprendizaje'));
    app.use('/api/estados', require('./api/estados'));
    app.use('/api/especialidades', require('./api/especialidades'));
    app.use('/api/eps', require('./api/eps'));
    app.use('/api/deserciones', require('./api/deserciones'));
    app.use('/api/centros_formacion', require('./api/centros_formacion'));
    app.use('/api/caracterizaciones', require('./api/caracterizaciones'));
    app.use('/api/areas', require('./api/areas'));
    app.use('/api/departamentos', require('./api/departamentos'));
    app.use('/api/ciudades', require('./api/ciudades'));
    app.use('/api/generos', require('./api/generos'));
    app.use('/api/jornadas', require('./api/jornadas'));
    app.use('/api/fichas', require('./api/fichas'));
    app.use('/api/tipos_sangre', require('./api/tipos_sangre'));
    app.use('/api/usuarios', require('./api/usuarios'));
    app.use('/api/tipos_vocero', require('./api/tipos_vocero'));
    app.use('/api/tipos_oferta', require('./api/tipos_oferta'));
    app.use('/api/tipos_instuctor', require('./api/tipos_instructor'));
    app.use('/api/tipos_documento', require('./api/tipos_documento'));
    app.use('/api/tipos_contrato', require('./api/tipos_contrato'));
    app.use('/api/libretas_militar', require('./api/libretas_militar'));
    app.use('/api/roles', require('./api/roles'));
    app.use('/api/paises', require('./api/paises'));

    //Bolivar, Jhon y Buritica
    app.use('/api/tipos_evidencias', require('./api/tipos_evidencias'));
    app.use('/api/tipos_entregas', require('./api/tipos_entregas'));
    app.use('/api/actividades', require('./api/actividades'));
    app.use('/api/evidencias', require('./api/evidencias'));
    app.use('/api/tecnicas_didacticas', require('./api/tecnicas_didacticas'));
    app.use('/api/guias_aprendizaje', require('./api/guias_aprendizaje'));
    app.use('/api/actividades_aprendizaje', require('./api/actividades_aprendizaje'));
    app.use('/api/tipo_actividades_aprendizaje', require('./api/tipo_actividades_aprendizaje'));
    app.use('/api/tecnicas_evaluacion', require('./api/tecnicas_evaluacion'));
    app.use('/api/resultados_aprendizaje', require('./api/resultados_aprendizaje'));
    app.use('/api/instrumentos_evaluacion', require('./api/instrumentos_evaluacion'));
    app.use('/api/proyectos', require('./api/proyectos'));
    app.use('/api/recursos', require('./api/recursos'));
    app.use('/api/criterios_evaluacion', require('./api/criterios_evaluacion'));
    app.use('/api/competencias', require('./api/competencias'));
    app.use('/api/inasistencias_aprendiz', require('./api/inasistencias_aprendiz'));

    //Mulato
    app.use('/api/fases', require('./api/fases'));
    app.use('/api/detalles_sabanas_horarios', require('./api/detalles_sabanas_horarios'));
    app.use('/api/sabanas_horarios', require('./api/sabanas_horarios'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
}
