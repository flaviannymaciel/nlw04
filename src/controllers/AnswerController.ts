import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

      // http://localhost:3333/answers/10?u=6207a574-1556-415e-96e9-1cd7968349ef
    // Router params -> obrigado a passar
    // routes.get(/answers/:values) -> esse value é o que precisaremos buscar
    // se tivesse mais um parametro, bastaria colocar : e identifica-lo
    // /answers/10/5/4 -> :values/:nota/:batata (exemplo)
    // query params -> não são obrigatorios. usado em busca, paginação (chave=valor)

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
    };

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  };
};

export { AnswerController };
