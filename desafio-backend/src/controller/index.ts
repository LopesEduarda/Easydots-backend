import { UserController } from './UserController';
import app from "./app"

const userController = new UserController()

// criar usuário
app.post('/user', userController.createUser)
// buscando usuários por ordem de criação
app.get('/users', userController.getUsersOrdering)
// buscar usuário por id
app.get('/getuserbyid/:id', userController.getUserById)
// deletar usuário por id
app.delete('/deleteuserbyid/:id', userController.deleteUserById)
// atualizar usuário por id
app.put('/updateuser/:id', userController.updateUserbyId)
// filtrar usuários ativos
app.get('/getactiveruser', userController.filterUsers)
// busca por todos os usuários
app.get('/getallusers', userController.getUsers)
// busca por todos os usuários deletados
app.get('/getalldeletedusers', userController.getDeletedUsers)