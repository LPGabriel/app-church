import prisma from "../../lib/prisma"
const bcrypt = require('bcryptjs');


export default async function handle(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body

        const user = await prisma.user.findFirst({
            where: { email: username },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            }
        });

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            
            console.log("Senha correeta "+ checkPassword)

            if (checkPassword === true){
                res.json(user);
            }
            else {
                res.status(202).json({ message: 'Email ou senha incorretos!' })
            }
        }

        if (!user) {
            res.status(202).json({ message: 'Usuário não encontrado' })
        }

    } else {
        res.status(405).json({ message: 'Método não permitido' })
    }
}