import { z } from "zod";

const Movement = z.object({
    amount: z.number({
        required_error: 'Amount is requered',
    }),
    transactionType: z.string({
        required_error: 'Type is requered',
    }),
    tags: z.string().array(),
});

const validateMovement = (movementData: any) =>
    Movement.safeParse(movementData);


export { validateMovement };

