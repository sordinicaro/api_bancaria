import { z } from "zod";

const User = z.object({
    fullname: z.string({
        required_error: 'Full name is requered',
    }),
    email: z.string({
        required_error: 'Email is requered',
    }).email(),
    password: z.string({ required_error: 'Password is requered', })
        .min(8),
});

const validateUser = (userData: any) => User.safeParse(userData);
const validatePartialUser = (userData: any) =>
    User.partial().safeParse(userData);

export { validateUser, validatePartialUser };

