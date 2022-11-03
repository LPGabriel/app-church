import { Prisma } from '@prisma/client'
import prisma from "../../lib/prisma"

const bcrypt = require('bcryptjs');


export default async function handler(req, res) {   
    if (req.method === 'POST') {
        const { name, email, password } = req.body
        try {
            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password, 8)
                }
            })
            res.json(user)
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    res.json(error)
                }
            }
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' })
    }
}