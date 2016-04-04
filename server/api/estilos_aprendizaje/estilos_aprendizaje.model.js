/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var EstilosAprendizaje = sequelize.define('EstilosAprendizaje', {
        idEstiloAprendizaje: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_estilo_aprendizaje'
        },
        estiloAprendizaje: {
            type: DataTypes.STRING('45'),
            allowNull: false,
            field: 'estilo_aprendizaje'
        }
    },
        {
            tableName: 'estilo_aprendizaje'
        },
        {
            classMethods: {
                associate: function(models) {
                    EstilosAprendizaje.hasMany(models.Usuarios, { foreignKey: 'id_estilo_aprendizaje' });
                }
            }
        },
        {
            underscored: true
        });

    return EstilosAprendizaje;
}
