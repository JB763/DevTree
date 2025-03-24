import { Request, Response } from 'express';
import {validationResult} from 'express-validator';
import slug from 'slug';
import User from "../models/User";
import {hashPassword} from "../utils/auth";

interface CreateAccountBody {
    handle: string;
    name: string;
    email: string;
    password: string;
}

export const createAccount = async(req: Request<{}, {}, CreateAccountBody>, res: Response)=>{

    //manejar errores
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
        return;
    }


    const {email, password} = req.body;

    const userExists = await User.findOne({email: email});
    if(userExists) {
        const error = new Error("Un usuario con este correo ya existe");
        res.status(400).send({error : error.message});
        return;
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({handle: handle});
    if(handleExists){
        const error = new Error("Nombre de usuario no disponible");
        res.status(409).send({error : error.message});
        return;
    }


    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();

    res.status(201).send('Usuario registrado');
}

export const login = async(req: Request<{}, {}, CreateAccountBody>, res: Response) =>{

    //manejar errores
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
        return;
    }

    const { email, password } = req.body;
    //revisar si el usuario existe
    const user = await User.findOne({email: email});
    if(!user){
        const error = new Error("El usuario no existe");
        res.status(404).send({error : error.message});
        return;
    }
    // validar contraseña


}
