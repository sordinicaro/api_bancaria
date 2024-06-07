import { Request, Response, NextFunction } from "express";

const handler404Error = (req: Request, res: Response) =>
    res.status(404).json({ error: ' Resource not found' });


export { handler404Error };