import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function authenticate(email: string, password: string){
    const user = await prisma.user.findFirstOrThrow({where: { email: email}});
    const passwordMatch = await bcrypt.compare(password, user.password as string);
    if(!user || !passwordMatch){
      throw 'E-mail ou senha incorreto';
    }
    if(!process.env.AUTH_SECRET){
        throw new Error('env não definido.')
    }
    const token = jwt.sign(
        { 
          userId: user.id,
          email: user.email,
          role: user.role
        },
        process.env.AUTH_SECRET,
        { expiresIn: '30d' }
      );

    return {
      ...user,
      token
    };
  }

export async function create(data: User) {
    const takenUser = await prisma.user.findFirst({ where: { email: data.email } })
    if (takenUser) throw 'Usuário já registrado'
    if (!data.password) throw 'A senha é obrigatória'

    const hash = await bcrypt.hashSync(data.password, 12)
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hash,
            image: data.image,
        }
    })
}
export async function update(id: string, newData: User) {
    const user = await prisma.user.findFirst({ where: { id: id } });
    if (!user) throw 'Usuário não encontrado'

    const emailMatch = await prisma.user.findFirst({ where: { email: newData.email } });
    if (newData.email != user.email && emailMatch) throw 'Email já registrado'

    if (newData.password) newData.password = await bcrypt.hashSync(newData.password, 12)

    return await prisma.user.update({
        where: { id: id },
        data: {
            name: newData.name,
            email: newData.email,
            password: newData.password,
            image: newData.image,
        }
    })
}

export async function getAll() {
    return await prisma.user.findMany({ orderBy: { name: 'asc' } })
}

export async function getById(id: string) {
    return await prisma.user.findUniqueOrThrow({ where: { id: id } })
}

export async function _delete(id: string) {
    return await prisma.user.delete({ where: { id: id, } });
}