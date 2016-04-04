/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var ModalidadesFormacion = sequelize.define('ModalidadesFormacion', {
        idModalidadFormacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_modalidad_formacion'
        },
        modalidadFormacion: {
            type: DataTypes.STRING(60),
            allowNull: false,
            field: 'modalidad_formacion'
        }
    },
        {
            tableName: 'modalidad_formacion'
        },
        {
            classMethods: {
                associate: function(models) {
                    ModalidadesFormacion.hasMany(models.Programas, { foreignKey: 'idModalidadFormacion' });
                }
            }
        },
        {
            underscored: true
        });
    return ModalidadesFormacion;
}