/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
    Sequelize,
    sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below

//Ruber
db.TiposFormacion = db.sequelize.import('../api/tipos_formacion/tipos_formacion.model');
db.ConocimientosConceptosPrincipios = db.sequelize.import('../api/conocimientos_conceptos_principios/conocimientos_conceptos_principios.model');
db.ConocimientosProceso = db.sequelize.import('../api/conocimientos_proceso/conocimientos_proceso.model');
db.NivelesFormacion = db.sequelize.import('../api/niveles_formacion/niveles_formacion.model');
db.RedesTecnologicas = db.sequelize.import('../api/redes_tecnologicas/redes_tecnologicas.model');
db.LineasTecnologicas = db.sequelize.import('../api/lineas_tecnologicas/lineas_tecnologicas.model');
db.ModalidadesFormacion = db.sequelize.import('../api/modalidades_formacion/modalidades_formacion.model');
db.TiposCompetencia = db.sequelize.import('../api/tipos_competencia/tipos_competencia.model');
db.Programas = db.sequelize.import('../api/programas/programas.model');
db.ProyectosHasProgramas = db.sequelize.import('../api/proyectos_has_programas/proyectos_has_programas.model');
db.ProgramasHasCompetencias = db.sequelize.import('../api/programas_has_competencias/programas_has_competencias.model');
db.User = db.sequelize.import('../api/user/user.model');
//Paola y Deisy
db.UnidadesMedida = db.sequelize.import('../api/unidades_medida/unidades_medida.model');
db.TiposRubro = db.sequelize.import('../api/tipos_rubro/tipos_rubro.model');
db.TiposRecurso = db.sequelize.import('../api/tipos_recurso/tipos_recurso.model');
db.NovedadesInstructor = db.sequelize.import('../api/novedades_instructor/novedades_instructor.model');
db.FuenteRecursos = db.sequelize.import('../api/fuente_recursos/fuente_recursos.model');
db.CategoriasAmbiente = db.sequelize.import('../api/categorias_ambiente/categorias_ambiente.model');
db.AmbientesFormacion = db.sequelize.import('../api/ambientes_formacion/ambientes_formacion.model');
db.ActividadAprendizajeHasRecurso = db.sequelize.import('../api/actividad_aprendizaje_has_recurso/actividad_aprendizaje_has_recurso.model');
db.TiposAmbiente = db.sequelize.import('../api/tipos_ambiente/tipos_ambiente.model');
db.Regionales = db.sequelize.import('../api/regionales/regionales.model');
db.EtapasPractica = db.sequelize.import('../api/etapas_practica/etapas_practica.model');
db.EstilosAprendizaje = db.sequelize.import('../api/estilos_aprendizaje/estilos_aprendizaje.model');
db.Estados = db.sequelize.import('../api/estados/estados.model');
db.Especialidades = db.sequelize.import('../api/especialidades/especialidades.model');
db.Eps = db.sequelize.import('../api/eps/eps.model');
db.Deserciones = db.sequelize.import('../api/deserciones/deserciones.model');
db.UsuariosHasCentrosFormacion = db.sequelize.import('../api/usuarios_has_centros_formacion/usuarios_has_centros_formacion.model');
db.CentrosFormacion = db.sequelize.import('../api/centros_formacion/centros_formacion.model');
db.Caracterizaciones = db.sequelize.import('../api/caracterizaciones/caracterizaciones.model');
db.ActividadesAprendizajeHasUsuarios = db.sequelize.import('../api/actividades_aprendizaje_has_usuarios/actividades_aprendizaje_has_usuarios.model');
db.Departamentos = db.sequelize.import('../api/departamentos/departamentos.model');
db.Ciudades = db.sequelize.import('../api/ciudades/ciudades.model');
db.UsuariosHasFichas = db.sequelize.import('../api/usuarios_has_fichas/usuarios_has_fichas.model');
db.Generos = db.sequelize.import('../api/generos/generos.model');
db.Jornadas = db.sequelize.import('../api/jornadas/jornadas.model');
db.Fichas = db.sequelize.import('../api/fichas/fichas.model');
db.TiposSangre = db.sequelize.import('../api/tipos_sangre/tipos_sangre.model');
db.Usuarios = db.sequelize.import('../api/usuarios/usuarios.model');
db.TiposVocero = db.sequelize.import('../api/tipos_vocero/tipos_vocero.model');
db.TiposOferta = db.sequelize.import('../api/tipos_oferta/tipos_oferta.model');
db.TiposInstructor = db.sequelize.import('../api/tipos_instructor/tipos_instructor.model');
db.TiposDocumento = db.sequelize.import('../api/tipos_documento/tipos_documento.model');
db.TiposContrato = db.sequelize.import('../api/tipos_contrato/tipos_contrato.model');
db.RolesHasUsuarios = db.sequelize.import('../api/roles_has_usuarios/roles_has_usuarios.model');
db.LibretasMilitar = db.sequelize.import('../api/libretas_militar/libretas_militar.model');
db.Roles = db.sequelize.import('../api/roles/roles.model');
db.Paises = db.sequelize.import('../api/paises/paises.model');
//Buritica, Jhon y Bolivar
db.EvidenciaHasCriteriosEvaluacion = db.sequelize.import('../api/evidencia_has_criterios_evaluacion/evidencia_has_criterios_evaluacion.model');
db.ResultadosAprendizaje = db.sequelize.import('../api/resultados_aprendizaje/resultados_aprendizaje.model');
db.ActividadAprendizajeHasTecnicaDidactica = db.sequelize.import('../api/actividad_aprendizaje_has_tecnica_didactica/actividad_aprendizaje_has_tecnica_didactica.model');
db.EvidenciaHasTecnicaDidactica = db.sequelize.import('../api/evidencia_has_tecnica_didactica/evidencia_has_tecnica_didactica.model');
db.ActividadesAprendizajeHasResultadosAprendizaje = db.sequelize.import('../api/actividades_aprendizaje_has_resultados_aprendizaje/actividades_aprendizaje_has_resultados_aprendizaje.model');
db.TiposEvidenciasHasTecnicasEvaluacion = db.sequelize.import('../api/tipos_evidencias_has_tecnicas_evaluacion/tipos_evidencias_has_tecnicas_evaluacion.model');
db.TiposEvidencias = db.sequelize.import('../api/tipos_evidencias/tipos_evidencias.model');
db.TiposEntregas = db.sequelize.import('../api/tipos_entregas/tipos_entregas.model');
db.Actividades = db.sequelize.import('../api/actividades/actividades.model');
db.Evidencias = db.sequelize.import('../api/evidencias/evidencias.model');
db.TecnicasEvaluacion = db.sequelize.import('../api/tecnicas_evaluacion/tecnicas_evaluacion.model');
db.TecnicasDidacticas = db.sequelize.import('../api/tecnicas_didacticas/tecnicas_didacticas.model');
db.GuiasAprendizaje = db.sequelize.import('../api/guias_aprendizaje/guias_aprendizaje.model');
db.ActividadesAprendizaje = db.sequelize.import('../api/actividades_aprendizaje/actividades_aprendizaje.model');
db.TipoActividadesAprendizaje = db.sequelize.import('../api/tipo_actividades_aprendizaje/tipo_actividades_aprendizaje.model');
db.InstrumentosEvaluacion = db.sequelize.import('../api/instrumentos_evaluacion/instrumentos_evaluacion.model');
db.Proyectos = db.sequelize.import('../api/proyectos/proyectos.model');
db.Recursos = db.sequelize.import('../api/recursos/recursos.model');
db.RecursoHasProyecto = db.sequelize.import('../api/recurso_has_proyecto/recurso_has_proyecto.model');
db.CriteriosEvaluacion = db.sequelize.import('../api/criterios_evaluacion/criterios_evaluacion.model');
db.Competencias = db.sequelize.import('../api/competencias/competencias.model');
db.InasistenciasAprendiz = db.sequelize.import('../api/inasistencias_aprendiz/inasistencias_aprendiz.model');
//Mulato
db.Fases = db.sequelize.import('../api/fases/fases.model');
db.DetallesSabanasHorarios = db.sequelize.import('../api/detalles_sabanas_horarios/detalles_sabanas_horarios.model');
db.SabanasHorarios = db.sequelize.import('../api/sabanas_horarios/sabanas_horarios.model');
db.SabanasHorariosHasResultadosAprendizajes = db.sequelize.import('../api/sabanas_horarios_has_resultados_aprendizajes/sabanas_horarios_has_resultados_aprendizajes.model');

export default db;
