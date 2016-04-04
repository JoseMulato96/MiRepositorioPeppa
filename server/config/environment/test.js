'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/pepaweb-test'
  },
  sequelize: {
    uri: 'mysql://root:1234@localhost:3306/pepa_db',
    options: {
      logging: false,
      storage: 'test.mysql',
      define: {
        timestamps: false
      }
    }
  }
};
