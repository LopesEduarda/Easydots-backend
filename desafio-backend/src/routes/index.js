import UsuarioRoutes from './Usuario.routes'

export default (app, express) => {
  const router = express.Router();
  
  app.use('/v1', UsuarioRoutes(router));

  
  console.log('\n Rotas disponiveis');
  router.stack.forEach(r => {
    if (r.route && r.route.path) {
      const [layer] = r.route.stack;
      console.log(layer.method.padEnd(6, ' '), r.route.path);
    }
  });
}