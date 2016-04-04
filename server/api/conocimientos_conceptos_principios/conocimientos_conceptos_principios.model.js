/********************************
------------- PEPA  --------------
          CBI - PALMIRA
Model By: Ruberney Rodríguez V.
email: rrrodriguez10@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var ConocimientosConceptosPrincipios = sequelize.define('ConocimientosConceptosPrincipios', {
        idConocimientoConceptoPrincipios: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_conocimiento_concepto_principios'
        },
        nombreConocimientoConceptoPrincipios: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'nombre_conocimiento_concepto_principios'
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        idCompetencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_competencia',
            references: {
                model: 'competencia',
                key: 'id_competencia'
            }
        }
    },
        {
            tableName: 'conocimiento_concepto_principios'
        },
        {
            underscored: true
        });

    return ConocimientosConceptosPrincipios;
}
