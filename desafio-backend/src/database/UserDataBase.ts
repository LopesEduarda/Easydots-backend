import { BaseDatabase } from "../config/db.config";
import { deletedUsers } from "./models/User";

export class UserDataBase extends BaseDatabase {
    private static TABLE_NAME = "easydotsusers"
    private static TABLE_NAME2 = "deleted_users"

    // criando um usuário, inserindo no banco de dados
    public async createUser(id: string, name: string, email: string, password: string, created_at: Date): Promise<void> {
        try {
            await BaseDatabase.connection()
                .insert({
                    id,
                    name,
                    email,
                    password,
                    created_at
                })
                .into(UserDataBase.TABLE_NAME)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // ordenando usuários por data de criação
    public async orderingUsers(created_at: string, order: string) {
        try {
            const users = await UserDataBase.connection(UserDataBase.TABLE_NAME)
                .select('*')
                .where('created_at', 'LIKE', `%${created_at}`)
                .orderBy('created_at', order)

            return users

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // pegando todos os usuários
    public async getUsers() {
        try {
            const users = await UserDataBase.connection(UserDataBase.TABLE_NAME)
                .select('*')
            return users

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // buscar usuário por id
    public async getUserById(id: string) {
        try {
            const users = await UserDataBase.connection(UserDataBase.TABLE_NAME)
                .select('*')
                .where({ id })
            return users

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // deletar usuário por id
    public async deleteUserById(id: string) {
        try {
            await UserDataBase.connection(UserDataBase.TABLE_NAME)
                .delete()
                .where({ id })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // atualizar usuário por id
    public async updateUser(id: string, name: string, email: string, password: string) {
        try {
            await UserDataBase.connection(UserDataBase.TABLE_NAME)
                .update({
                    name,
                    email,
                    password
                })
                .where({ id })
            const user = await UserDataBase.connection(UserDataBase.TABLE_NAME)
                .select()
                .where({ id })
            return user
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // filtrar usuários
    public async filterUsers(ativo: string) {
        try {
            await UserDataBase.connection(UserDataBase.TABLE_NAME)
                .select('*')
                .where('ativo', 'LIKE', `%${ativo}%`)

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    // inserindo usuários deletados na tabela de usuários deletados
    async insertDeletedUsers(deletedUsers: deletedUsers) {
        try {
            await BaseDatabase.connection()
                .insert(deletedUsers)
                .into(UserDataBase.TABLE_NAME2)

        } catch (error: any) {
            throw new Error(error.message || "Error creating user. Please check your system administrator.");
        }
    }


    // tabela que criarei para listar os usuários deletados
    public async deletedUsers() {
        try {
            const users = await UserDataBase.connection(UserDataBase.TABLE_NAME2)
                .select('*')
            return users
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

}
