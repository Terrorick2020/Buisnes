const express = require("express");
const clientController = require("../controllers/clientController.js");
const clientRouter = express.Router();
const { body } = require('express-validator');
const verifyToken = require('../middlewares/verifyToken.js')
const {isInUse, notInUse} = require('../services/emailValidation.js')
 
clientRouter.post('/register', [
    body('firstname').notEmpty().withMessage('Введите имя'),
    body('phone').notEmpty().withMessage('Введите email').isEmail().custom(isInUse),
    body('password').notEmpty().withMessage('Введите пароль').isLength({ min: 6 }).withMessage('Минимальная длина пароля - 6 символов'),
    body('repass').custom((value, {req}) => value === req.body.password).withMessage('Пароли не совпадают')  
  ], 
  clientController.register)

clientRouter.post('/login', [
    body('email').notEmpty().withMessage('Введите email').isEmail().withMessage('Введите валидный email').custom(notInUse),
    body('password').notEmpty().withMessage('Введите пароль'),
 ],
 clientController.login)

 
module.exports = clientRouter;