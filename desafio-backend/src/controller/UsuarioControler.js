import DBConnection from '../database/DBConnection';
import bcrypt from 'bcryptjs';


// DOCUMENTAÇÂO DO SEQUELIZE: https://sequelize.org/docs/v6/core-concepts/model-basics/
const UsuarioController = () => {

  const hash = async (senha) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(senha, salt);
  }
  
  const create = async (req, res) => {
    const usuario = req.body;
    usuario.senhaHash = await hash(usuario.senha);
   
    // ------------------------------------
    //TODO utilizar o metodo de criação de registros do Model do sequelize
    //https://sequelize.org/docs/v6/core-concepts/model-instances/#creating-an-instance
    

    // ------------------------------------
  }
  
  const findAll = async (req, res) => {
    // TODO Implementar a busca de todos os usuarios considerando o filtro ativo
    const { ativo = true, paranoid= true} = req.query;

    const items = await DBConnection.Usuario.findAll({ 
       // ------------------------------------
        // TODO Implementar o filtro para trazer somente registros ativos
        // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses
        where: {   },
         // ------------------------------------
        paranoid: paranoid !== "false",
         // ------------------------------------
        // TODO Implementar ordenação dos registros pela data de criação
        //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering
        // order: [['', '']]
         // ------------------------------------
    });
   
    return res.status(200).json(items);
  }

  const findById = async (req, res) => {
    // ------------------------------------
    // TODO Implementar a busca do usuario pelo ID
    // https://sequelize.org/api/v6/class/src/model.js~model
   
    // ------------------------------------
  }

  const updateByID = async (req, res) => {
    const { id } = req.params;
    const usuario = req.body;
    // ------------------------------------
    // TODO Quando nao tiver senha lançe uma exceção para informado que a senha é obrigatoria
     
    // ------------------------------------
    usuario.senhaHash = await hash(usuario.senha);
    
    const [ rows, [item] ] = await DBConnection.Usuario.update(usuario, { where: { id }, returning: true})
    .catch(error=> res.status(500).json(error))
    
    return res.status(200).json(item);
  }

  const restoreByID = async (req, res) => {
    const { id } = req.params;
    
    const [ item ] = await DBConnection.Usuario.restore({ where: { id }, returning: true})
    .catch(error=> res.status(500).json(error))
    
    return res.status(200).json(item);
  }

  // Remoção do usuario pelo ID
  const deleteByID = async (req, res) => {
    const { id } = req.params;
     
    const deletedRecord = await DBConnection.Usuario.destroy({ where: { id }})
      .catch((error) => res.status(500).json(error));
     
    if (deletedRecord === 1) {
        res.status(200).json({ message: "Deleted successfully" });          
    } else {
      // ------------------------------------
      // TODO Informe um codigo de erro apropriado
      //https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status#respostas_de_erro_do_servidor
       res.status(1).json({ message : "record not found" });
      // ------------------------------------
    }
  }

  return {
    findAll,
    deleteByID,
    // TODO Retornar todas as funções que as rotas utilizem 
    
  };
}

export default UsuarioController();