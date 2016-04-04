/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Deisy Lorena Navia
email: dlnavia1@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var CentrosFormacion = sequelize.define('CentrosFormacion', {
    id_centro_formacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //aqui empieza regional la llave foranea de id_regional de la tabla faltante
    id_regional: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'regional',
        key: 'id_regional'
      }
    },
    //aqui termina regional
    nombre_centro_formacion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    codigo_centro_formacion: {
      type: DataTypes.STRING('10'),
      allowNull: false
    },
    //aqui empieza la llave foranea de ciudad pero falta la de departamento
    // ya que no sabemos aun como traer la llave foranea (id_departamento) por
    //medio del id_ciudad asi que falta Id_departamento.
    id_ciudad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ciudad',
        key: 'id_ciudad'
      }
    },
    id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ciudad',
        key: 'id_departamento'
      }
    }
    //aqui termina la llave foranea de ciudad pero falta la de departamento
    // ya que no sabemos aun como traer la llave foranea (id_departamento) por
    //medio del id_ciudad asi que falta Id_departamento.
  },
  {
    tableName: 'centro_formacion'
  },
  {
    classMethods: {
      associate: function(models) {
        CentrosFormacion.hasMany(models.Fichas, { foreignKey: 'id_centro_formacion'});
      }
    }
  },
  {
    classMethods: {
      associate: function(models){
        CentrosFormacion.belongsToMany(models.Usuarios,
        {
          as: 'usuario',
          through: models.UsuariosHasCentrosFormacion,
          foreignKey: 'id_centro_formacion',
          otherKey: 'id_usuario'
        })
      }
    }
},
{
    underscored: true
});

  return CentrosFormacion;
}
