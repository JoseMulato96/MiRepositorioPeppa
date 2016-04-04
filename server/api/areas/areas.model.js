/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Areas = sequelize.define('Areas', {
        idArea: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_area'
        },
        nombreArea: {
            type: DataTypes.STRING('60'),
            allowNull: false,
            field: 'nombre_area'
        }
    },
        {
            tableName: 'area'
        },
        {
            classMethods: {
                associate: function(models) {
                    Areas.belongsToMany(models.Usuarios,
                        {
                            as: 'usuarios',
                            through: models.UsuariosHasAreas,
                            foreignKey: 'id_area',
                            otherKey: 'id_usuario'
                        })
                }
            }
        },
        {
            underscored: true
        });

    return Areas;
}
