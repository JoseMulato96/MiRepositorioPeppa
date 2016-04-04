/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Eps = sequelize.define('Eps', {
        idEps: {
            type: DataTypes.STRING('20'),
            allowNull: false,
            primaryKey: true,
            field: 'id_eps'
        },
        nombreEps: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'nombre_eps'
        }
    },
        {
            tableName: 'eps'
        },
        {
            classMethods: {
                associate: function(models) {
                    Eps.hasMany(models.Usuarios, { foreignKey: 'id_eps' });
                }
            }
        },
        {
            underscored: true
        });

    return Eps;
}
