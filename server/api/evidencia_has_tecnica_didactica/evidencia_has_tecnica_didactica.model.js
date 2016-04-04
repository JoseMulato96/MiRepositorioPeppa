/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Yohon Jairo Bravo
email: bravo2008@misena.edu.co
*********************************/
'use strict';

export default function(sequelize, DataTypes) {
    var EvidenciaHasTecnicaDidactica = sequelize.define('EvidenciaHasTecnicaDidactica', {
        idEvidencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_evidencia',
            references: {
                model: 'evidencia',
                key: 'id_evidencia'
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
            tableName: "evidencia_has_tecnica_didactica"
        },
        {
            underscored: true
        });

    return EvidenciaHasTecnicaDidactica;
}
