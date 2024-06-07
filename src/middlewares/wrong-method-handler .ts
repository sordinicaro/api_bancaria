import { Request, Response, NextFunction } from "express";

const handler405Error = (req: Request, res: Response) =>
    res.status(405).json({ error: ' Method not allowed' });


export { handler405Error };