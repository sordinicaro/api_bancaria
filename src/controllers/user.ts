import { Request, Response } from "express";
import UserModel from "../models/user";
import { validateUser, validatePartialUser } from "../schemas/user";


abstract class UserController {
    static async createNew(req: Request, res: Response) {
        // Validar datos con zod
        const validatedData = validateUser(req.body);

        if (!validatedData.success) return res.status(404).json(validatedData.error);

        const response = await UserModel.createNew(validatedData.data);
        return res.status(201).json(response);

    }
    static async getInfo(req: Request, res: Response) {
        const { userId } = res.locals.userData;
        const user = await UserModel.getInfo(userId);

        return res.json(user);
    }

    static async login(req: Request, res: Response) {
        const validatedData = validatePartialUser(req.body);

        if (!validatedData.success) return res.status(404).json(validatedData.error);

        const { email, password } = validatedData.data as any;
        const user = await UserModel.login({ email, password });

        return res.json(user);


    }
}

export default UserController;


