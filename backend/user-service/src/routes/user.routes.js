import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '../app/controllers/UserController';

// http://localhost:3333/users
const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      birthday: Joi.date().required(),
      telephone: Joi.string().max(11).min(9).required(),
      city: Joi.string().required(),
      uf: Joi.string().length(2).required(),
    },
  }),
  UserController.store,
);

export default usersRouter;
