import express from "express";
import {SubmitFeedbackUseCase} from "./use-cases/submit-feedback-use-case";
import {PrismaFeedbackRepository} from "./repositories/Prisma/prisma-feedback-repository";
import {NodemailerMailAdapter} from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

    const {type, comment, screenshot} = req.body;

    const prismaFeedbackrepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase( prismaFeedbackrepository, nodemailerMailAdapter )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })

    return res.status(201).send();
});