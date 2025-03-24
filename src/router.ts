import {Router} from 'express';
import {body} from 'express-validator';
import {createAccount, login} from "./handlers";

const router = Router();

/** Autenticacion y registro **/
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle es requerido'),
    body('name')
        .notEmpty()
        .withMessage('El nombre es requerido'),
    body('email')
        .isEmail()
        .withMessage('El E-mail no es valido'),
    body('password')
        .isLength({min: 8, max: 8})
        .withMessage('La contraseña debe tener 8 caracteres'),
    createAccount);

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El E-mail no es valido'),
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    login);



export default router;