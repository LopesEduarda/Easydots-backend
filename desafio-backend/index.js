// import 'dotenv/config';
// const express = require('express')
// import cors from 'cors';
// const bodyParser = require('body-parser') 
// const DBConnection = require('./src/database/DBConnection')
// import Routes from './src/routes'

// const app = express()
// const port = 9999;

// //---------------------------------------------------------------------------
// // ! Cors
// const whitelist = [
//   'http://localhost:3000', 
//   'http://localhost:3001', 
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (origin === undefined || whitelist.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         console.log(origin);
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
 

// // ------------------------------------------------
// // ROTAS 
// Routes(app, express);
// // ------------------------------------------------

// app.listen(port, () => {
//   console.log(`App executando na porta ${port}.`)
// })