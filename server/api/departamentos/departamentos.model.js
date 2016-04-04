/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Departamentos = sequelize.define('Departamentos', {
        idDepartamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_departamento'
        },
        nombreDepartamento: {
            type: DataTypes.STRING('45'),
            allowNull: false,
            field: 'nombre_departamento'
        },
        idPaises: {
            type: DataTypes.STRING('4'),
            allowNull: false,
            field: 'id_paises',
            references: {
                model: 'paises',
                key: 'id_paises'
            }
        }
    },
        {
            tableName: 'departamento'
        },
        {
            classMethods: {
                associate: function(models) {
                    Departamentos.hasMany(models.Ciudades, { foreignKey: 'id_departamento' })
                }
            }
        },
        {
            underscored: true
        });

    return Departamentos;
}
