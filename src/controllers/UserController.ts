// onde ficam as regras e server o chama (com isso server menos poluido)
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async create (req: Request, res: Response) {
    const { name, email } = req.body;

    // repositorio permite manipulação de dados (cada entidade possui repositorio especifico)
    const usersRepository = getRepository(User);
    // SELECT * FROM USERS WHERE EMAIL = 'EMAIL'
    const   userAlreadyExist = usersRepository.findOne({
      email
    })
    // Validate
    if (userAlreadyExist) {
      return res.status(400).json({
        error: "User already exists!"  
      })
    }

    const user = usersRepository.create({
      name, email
    })

    await usersRepository.save(user);

    return res.send(user);
  }
}

export { UserController };