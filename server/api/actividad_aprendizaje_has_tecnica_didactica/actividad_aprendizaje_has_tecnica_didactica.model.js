/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var ActividadAprendizajeHasTecnicaDidactica = sequelize.define('ActividadAprendizajeHasTecnicaDidactica', {
        idActividadAprendizaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_actividad_aprendizaje',
            references: {
                model: 'actividad_aprendizaje',
                key: 'id_actividad_aprendizaje'
            }
        },
        idTecnicaDidactica: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_tecnica_didactica',
            references: {
                model: 'tecnica_didactica',
                key: 'id_tecnica_didactica'
            }
        }

    },
        {
            tableName: "actividad_aprendizaje_has_tecnica_didactica"
        },
        {
            underscored: true
        });
    return ActividadAprendizajeHasTecnicaDidactica;

}
