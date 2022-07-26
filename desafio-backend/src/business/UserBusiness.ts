import { UserDataBase } from "../database/UserDataBase";
import Authenticator from "../services/Authenticator";
import { HashManager } from "../services/hashManager";
import { InputUser } from "../database/models/User";
import { generateId } from "../services/idGenerator";


export class UserBusiness {

    // criando um novo usuário
    async createUser(user: InputUser) {
        try {
            console.log(user)
            if ( !user.name || !user.email) {
                throw new Error("Please, fill all the fields!")
            }

            if (!user.password) {
                throw new Error("You need to fill the field password to create an user!")
            }

            const id = generateId()
            // gerando o id da task

            const newUser = new UserDataBase()
            await newUser.createUser(id, user.name, user.email, user.password, user.created_at)

            return newUser
        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }

    // listando os usuários
    async getUsers() {
        try {
            const users = await new UserDataBase().getUsers();
            return users;
        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }

    // ordenando usuários por data de criação
    async orderingUsers(created_at: string, order: string) {
        try {
            if (!order || order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC") {
                order = "DESC"
            }

            const users = await new UserDataBase().orderingUsers(created_at, order)
            return users

        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }

    // buscando usuário por id
    async getUserById(id: string) {
        try {
            if (!id) {
                throw new Error('Please, fill in the field id!')
            }

            const userById = await new UserDataBase().getUserById(id)
            return userById
        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }

    // deletar usuário por id
    async deleteUserById(id: string) {
        const statusCode = 404;

        try {
            const deleteUserById = await new UserDataBase().deleteUserById(id)

            if (!id) {
                let statusCode = 404
                throw new Error(`Please, fill in the field user id you want delete! ${statusCode}`)
            }

            return deleteUserById
        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }

    // atualizar usuário por id
    async updateUserById(id: string, name: string, email: string, password: string) {
        try {
            const updateUserId = await new UserDataBase().updateUser(id, name, email, password)

            if (!updateUserId) {
                throw new Error('Please, fill in the field user id you want to update!')
            }

            return updateUserId
        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }

    // filtrando usuários ativos
    async filterUsers(ativo: string) {
        try {
            const filterUser = await new UserDataBase().filterUsers(ativo)

            return filterUser
        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }
}