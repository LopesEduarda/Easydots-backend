// import { v4 as uuidv4 } from 'uuid';

// module.exports = (sequelize, DataTypes) => {
//   const Usuario = sequelize.define(
//     'usuario',
//     {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.BIGINT,
//       },
//       ativo: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
      
//       nome: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         validate: {
//           len: { args: [2, 50], msg: 'O nome do usuario deve ter mais de 2 caracteres' },
//         },
//       },
//       email: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         unique: {
//           msg: 'E-mail já cadastrado',
//         },
//         validate: { isEmail: true },
//       },  
//       senhaHash: {
//         field: 'senhahash',
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         validate: { len: { args: [5, 100], msg: 'A senha deve ter mais de 5 caracteres' } },
//       },
//       // TODO adicionar uma coluna e apresentar no front os dados
//       //
//       //
//       //
//       //
//       createdAt: { field: 'createdat', type: DataTypes.DATE },
//       updatedAt: { field: 'updatedat', type: DataTypes.DATE },
//       deletedAt: { field: 'deletedat', type: DataTypes.DATE, allowNull: true },
//     },
//     {
//       sequelize,
//       tableName: 'usuario',
//       modelName: 'Usuario',
//       paranoid: true,
//       timestamps: true,
      
//       defaultScope: {
//         // exclude password hash by default
//         attributes: {
//           exclude: ['senhaHash'],
//         },
//       },
//       scopes: {
//         // include hash with this scope
//         withHash: { attributes: {} },
//       },
//     }
//   );

//   Usuario.associate = models => {
     
//   };

//   return Usuario;
// };
