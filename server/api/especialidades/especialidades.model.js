/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Especialidades = sequelize.define('Especialidades', {
        idEspecialidad: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_especialidad'
        },
        nombreEspecialidad: {
            type: DataTypes.STRING('80'),
            allowNull: false,
            field: 'nombre_especialidad'
        }
    },
        {
            tableName: 'especialidad'
        },
        {
            classMethods: {
                associate: function(models) {
                    Especialidades.hasMany(models.Usuarios, { foreignKey: 'id_especialidad' });
                }
            }
        },
        {
            underscored: true
        });

    return Especialidades;
}
