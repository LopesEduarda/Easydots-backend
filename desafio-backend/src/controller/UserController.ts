import { UserDataBase } from './../database/UserDataBase';
import { UserBusiness } from './../business/UserBusiness';
import { deletedUsers, InputUser } from './../database/models/User';
import { Request, Response } from 'express'

export class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body

            const newUser: InputUser = {
                id: '',
                name,
                email,
                password,
                created_at: new Date()
            }

            const newTaskBusiness = new UserBusiness()
            const newTaskDataBase = await newTaskBusiness.createUser(newUser)

            res.status(201).send({ message: "User created successfully!" })

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // buscar usuários ordenados
    async getUsersOrdering(req: Request, res: Response) {
        try {
            const created_at = req.query.created_at as string
            const order = req.query.order as string

            if (!created_at && !order) {
                const users = await new UserDataBase().getUsers
                res.status(200).send({ users });
            } else if (created_at && order) {
                const users = await new UserDataBase().orderingUsers(created_at, order)
                res.status(200).send({ users });
            }

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // buscar usuário por id
    async getUserById(req: Request, res: Response) {
        try {
            const id = req.params.id as string

            const user = await new UserBusiness().getUserById(id)
            res.status(200).send({ user });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // deletar usuário por id
    async deleteUserById(req: Request, res: Response) {
        try {
            const id = req.params.id as string
            const user = await new UserBusiness().deleteUserById(id)
            res.status(200).send({ message: 'User successfully deleted!', user });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // atualizar usuário por id
    async updateUserbyId(req: Request, res: Response) {
        try {
            const id = req.params.id as string
            const { name, email, password } = req.body

            const user = await new UserBusiness().updateUserById(id, name, email, password)
            const message = `changes made successfully!`

            res.status(200).send({ message, user });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // usuários filtrados
    async filterUsers(req: Request, res: Response) {
        try {
            const ativo = req.query.ativo as string

            const user = await new UserBusiness().filterUsers(ativo)
            res.status(200).send({ user });

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // pegando todos os usuários
    async getUsers(req: Request, res: Response) {
        try {
            const users = await new UserBusiness().getUsers()
            res.status(200).send({ users })
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // listando usuários deletados
    async getDeletedUsers(req: Request, res: Response) {
        try {
            ''
            const users = await new UserBusiness().deletedUsers()
            res.status(200).send({ users })

        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // restaurando usuários (tirando um usuário da tabela de removidos e retornando esse usuário para a tabela 'normal')
    async restoreUser(req: Request, res: Response) {
        try {
            const id = req.params.id as string

            if (!id) {
                throw new Error('Please, fill the field id!')
            }

            const user = await new UserBusiness().restoreUsers(id)
            res.status(200).send({ message: 'User successfully restored!', user })
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }
}