import { UserDataBase } from './../database/UserDataBase';
import { UserBusiness } from './../business/UserBusiness';
import { InputUser } from './../database/models/User';
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
            res.status(200).send({ user });
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
}