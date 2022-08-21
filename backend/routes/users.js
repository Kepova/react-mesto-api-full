const UserRouter = require('express').Router();
const { isObjectIdOrHexString } = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar, getСurrentUser,
} = require('../controllers/users');
const regexUrl = require('../constants/constants');

const validationId = (value) => {
  if (isObjectIdOrHexString(value)) {
    return value;
  }
  throw new Error('Передан некорректный _id пользователя');
};

UserRouter.get('/', getUsers); // возвращает всех пользователей
UserRouter.get('/me', getСurrentUser); // возвращает текущего пользователя
UserRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().custom(validationId),
    }),
  }),
  getUser,
); // возвращает пользователя по _id
UserRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
); // обновляет профиль
UserRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(regexUrl),
    }),
  }),
  updateAvatar,
); // обновляет аватар

module.exports = UserRouter;
