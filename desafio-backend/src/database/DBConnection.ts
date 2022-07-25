// const { Client } = require("pg");
// import fs from 'fs-extra';
// import path from 'path';
// import Sequelize, { DataTypes } from 'sequelize';

// // import databaseConfig from '../config/db.config';
// import { BaseDatabase } from '../config/db.config';

// const basename = path.basename(__filename);

// // https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor
// // const sequelize = new Sequelize(
// //   databaseConfig.database,
// //   databaseConfig.username,
// //   databaseConfig.password, 
// //   databaseConfig
// // );

// const fullPath = path.resolve(__dirname, 'models');

// export class DBConnection {
//   constructor() {
//     this.init();
//   }

//   init() {
//     fs.readdirSync(fullPath)
//       .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
//       .forEach(file => {
//         const model = require(path.join(fullPath, file))(sequelize, DataTypes);
//         this[path.basename(file, '.js')] = model;
//       });

//     Object.keys(this).forEach(modelName => {
//       if (this[modelName].associate) {
//         this[modelName].associate(this);
//       }
//     });

//     this.sequelize = sequelize;
//     this.Sequelize = Sequelize;


//     sequelize.sync({})
//   }
// }

// export default new DBConnection();
