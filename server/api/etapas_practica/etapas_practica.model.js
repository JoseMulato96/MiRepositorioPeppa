/********************************
------------- PEPA --------------
          CBI - PALMIRA
Model By: Paola Andrea Pino
email: paola.pino@misena.edu.co
*********************************/

'use strict';

export default function(sequelize, DataTypes) {
  var EtapasPractica = sequelize.define('EtapasPractica', {
    idEtapaPractica: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_etapa_practica'
    },
    nombreEmpresa: {
      type: DataTypes.STRING('60'),
      allowNull: false,
      field: 'nombre_empresa'
    },
    representante: {
      type: DataTypes.STRING('60'),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING('60'),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING('60'),
      allowNull: false
    },
    tipoPractica: {
      type: DataTypes.STRING('45'),
      allowNull: false,
      field: 'tipo_practica'
    }
  },
  {
    tableName: 'etapa_practica'
  },
  {
    classMethods: {
      associate: function(models) {
        EtapasPractica.hasMany(models.Usuarios, { foreignKey: 'id_etapa_practica'});
      }
    }
  },
  {
      underscored: true
  });

  return EtapasPractica;
}
