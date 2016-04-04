/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Ciudades = sequelize.define('Ciudades', {
        idCiudad: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_ciudad'
        },
        nombreCiudad: {
            type: DataTypes.STRING('45'),
            allowNull: false,
            field: 'nombre_ciudad'
        },
        idDepartamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: 'id_departamento',
            references: {
                model: 'departamento',
                key: 'id_departamento'
            }
        }
    },
        {
            tableName: 'ciudad'
        },
        {
            classMethods: {
                associate: function(models) {
                    Ciudades.hasMany(models.Usuarios, { foreignKey: 'id_ciudad', otherKey: 'id_departamento' });
                    Ciudades.hasMany(models.CentrosFormacion, { foreignKey: 'id_ciudad', otherKey: 'id_departamento' });
                }
            }
        },
        {
            underscored: true
        });

    return Ciudades;
}
