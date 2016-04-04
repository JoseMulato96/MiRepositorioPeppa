/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Jose Mulato
email: jwmulato@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var SabanasHorarios = sequelize.define('SabanasHorarios', {
        idSabanaHorario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_sabana_horario'
        },
        idFicha: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_ficha',
            references: {
                model: 'ficha',
                key: 'id_ficha'
            }
        },

        idAmbiente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_ambiente',
            references: {
                model: 'ambiente_formacion',
                key: 'id_ambiente_formacion'
            }
        },

        idInstructor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'id_instructor',
            references: {
                model: 'usuario',
                key: 'id_usuario'
            }
        }
    },
        {
            tableName: 'sabana_horario',
        },
        {
            classMethods: {
                associate: function(models) {
                    SabanasHorarios.belongsToMany(models.ResultadosAprendizajes,
                        {
                            as: 'resultadosAprendizajes',
                            through: models.SabanasHorariosHasResultadosAprendizajes,
                            foreignKey: 'id_sabana_horario',
                            otherKey: 'id_resultado_aprendizaje'
                        });
                    SabanasHorarios.hasMany(models.DetallesSabanasHorarios, { foreignKey: 'id_sabana_horario' });
                }
            }
        },
        {
            underscored: true
        });
    return SabanasHorarios;
}
