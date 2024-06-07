import { Request, Response } from "express";
import MovementModel from "../models/movement";
import { validateMovement } from "../schemas/movements";


abstract class MovementController {
    static async createNew(req: Request, res: Response) {
        const validatedData = validateMovement(req.body);

        if (!validatedData.success)
            return res.status(400).json(validatedData.error);

        const { userId } = res.locals.userData;

        const response = await MovementModel.createNew({
            ...validatedData.data,
            userId,
        });
        return res.status(201).json(response);

    }
    static async getAll(req: Request, res: Response) {
        const { userId } = res.locals.userData;
        const userMovements = await MovementModel.getAll(userId);

        return res.json({ accountInfo: userMovements });
    }
}

export default MovementController;


