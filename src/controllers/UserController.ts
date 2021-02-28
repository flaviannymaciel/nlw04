// onde ficam as regras e server o chama (com isso server menos poluido)
// alt + shift + o apagar imports não utilizados
// repositorio permite manipulação de dados (cada entidade possui repositorio especifico)
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório!"),
      email: yup.string().email().required("Email incorreto!"),
    });

    // if (!(await schema.isValid(request.body))) {
    //   return response.status(400).json({ error: "Validation Failed!" });
    // };

    // try {
    //   await schema.validate(request.body, { abortEarly: false });
    // } catch (err) {
    //   return response.status(400).json({ error: err });
    // };

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    };

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    };

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  };

  async show(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const all = await usersRepository.find();

    return response.json(all);
  }

  async update(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const { id } = request.params;

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório!"),
      email: yup.string().email().required("Email incorreto!"),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    };

    const user = await usersRepository.findOne(id);

    usersRepository.merge(user, request.body);
    const results = await usersRepository.save(user);
    return response.status(200).json(results);
  };

  async exclude(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const { id } = request.params;

    if (!id) return response.status(400).json({ message: "User not found"});

    await usersRepository.delete(id);

    return response.status(200).json({ message: "Deleted User" });
  };
};

export { UserController };
