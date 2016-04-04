/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
    var Usuarios = sequelize.define('Usuarios', {
        id_usuario: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        numero_documento: {
            type: DataTypes.STRING('15'),
            allowNull: false,
            unique: {
                msg: 'El documento ya existe'
            }
        },
        nombre_1: {
            type: DataTypes.STRING('45'),
            allowNull: false
        },
        nombre_2: DataTypes.STRING('45'),
        apellido_1: {
            type: DataTypes.STRING('45'),
            allowNull: false
        },
        apellido_2: DataTypes.STRING('45'),
        telefono: {
            type: DataTypes.STRING('45'),
            allowNull: false
        },
        correo_1: {
            type: DataTypes.STRING('45'),
            allowNull: false
        },
        correo_2: DataTypes.STRING('45'),
        direccion: DataTypes.STRING('45'),
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING('65'),
            allowNull: false
        },
        fecha_expedicion: DataTypes.DATEONLY,
        telefono_2: DataTypes.STRING('10'),
        telefono_3: DataTypes.STRING('10'),
        fecha_registro: DataTypes.DATE,
        fecha_nacimiento: DataTypes.DATEONLY,
        iniciales_horario: DataTypes.STRING('4'),
        id_desercion: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'desercion',
                key: 'id_desercion'
            }
        },
        id_estilo_aprendizaje: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'estilo_aprendizaje',
                key: 'id_estilo_aprendizaje'
            }
        },
        id_especialidad: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'especialidad',
                key: 'id_especialidad'
            }
        },
        id_tipo_contrato: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'tipo_contrato',
                key: 'id_tipo_contrato'
            }
        },
        id_etapa_practica: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'etapa_practica',
                key: 'id_etapa_practica'
            }
        },
        id_tipo_vocero: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tipo_vocero',
                key: 'id_tipo_vocero'
            }
        },
        //aqui empieza la llave foranea de ciudad pero falta la de departamento
        // ya que no sabemos aun como traer la llave foranea (id_departamento) por
        //medio del id_ciudad asi que falta Id_departamento.
        id_ciudad: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ciudad',
                key: 'id_ciudad'
            }
        },
        id_departamento: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ciudad',
                key: 'id_departamento'
            }
        },
        //aqui termina la llave foranea de ciudad pero falta la de departamento
        // ya que no sabemos aun como traer la llave foranea (id_departamento) por
        //medio del id_ciudad asi que falta Id_departamento.
        id_eps: {
            type: DataTypes.STRING('20'),
            references: {
                model: 'eps',
                key: 'id_eps'
            }
        },
        id_tipo_documento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipo_documento',
                key: 'id_tipo_documento'
            }
        },
        id_genero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'genero',
                key: 'id_genero'
            }
        },
        id_tipo_sangre: {
            type: DataTypes.INTEGER,
            references: {
                model: 'tipo_sangre',
                key: 'id_tipo_sangre'
            }
        },
        id_libreta_militar: {
            type: DataTypes.INTEGER,
            references: {
                model: 'libreta_militar',
                key: 'id_libreta_militar'
            }
        },
        id_caracterizacion: {
            type: DataTypes.INTEGER,
            unique: false,
            references: {
                model: 'caracterizacion',
                key: 'id_caracterizacion'
            }
        }
    },
        {
            tableName: 'usuario'
        },
        {
            classMethods: {
                associate: function(models) {
                    Usuarios.hasMany(models.InasistenciasAprendiz,{foreignKey: 'id_aprendiz'});
                    Usuarios.hasMany(models.InasistenciasAprendiz,{foreignKey: 'id_instructor'});
                    Usuarios.hasMany(models.NovedadesInstructor,{foreignKey: 'id_usuario'});
                    Usuarios.hasMany(models.SabanasHorarios,{foreignKey: 'id_usuario'});
                    Usuarios.belongsToMany(models.Roles,
                        {
                            as: 'rol',
                            through: models.RolesHasUsuarios,
                            foreignKey: 'id_usuario',
                            otherKey: 'id_rol'
                        });
                    Usuarios.belongsToMany(models.Fichas,
                        {
                            as: 'fichas',
                            through: models.UsuariosHasFichas,
                            foreignKey: 'id_usuario',
                            otherKey: 'id_ficha'
                        });
                    Usuarios.belongsToMany(models.ActividadesAprendizaje,
                        {
                            as: 'actividad_aprendizaje',
                            through: models.ActividadesAprendizajeHasUsuarios,
                            foreignKey: 'id_usuario',
                            otherKey: 'id_actividad_aprendizaje'
                        });
                    Usuarios.belongsToMany(models.Areas,
                        {
                            as: 'area',
                            through: models.UsuariosHasAreas,
                            foreignKey: 'id_usuario',
                            otherKey: 'id_area'
                        });
                    Usuarios.belongsToMany(models.CentrosFormacion,
                        {
                            as: 'centro_formacion',
                            through: models.UsuariosHasCentrosFormacion,
                            foreignKey: 'id_usuario',
                            otherKey: 'id_centro_formacion'
                        })

                }
            }
        },
        {
            underscored: true
        });

    return Usuarios;

}
