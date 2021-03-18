import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../app/controllers/ProfileController';
import ensureAuthenticated from '../app/middleware/ensureAuthenticated';

// http://localhost:3334/profile
const profileRouter = Router();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', ProfileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('password')).required(),
      }),
      telephone: Joi.string().max(11).min(9),
      cref: Joi.string(),
      address: Joi.string(),
      number: Joi.when('address', {
        is: Joi.exist(),
        then: Joi.number().required(),
      }),
      city: Joi.string(),
      uf: Joi.string().length(2),
    },
  }),
  ProfileController.update,
);

export default profileRouter;
