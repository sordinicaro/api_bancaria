import { createHash } from 'node:crypto';

const getSHA512OfPassword = (password: string) =>
    createHash('sha512').update(password).digest('hex');

export { getSHA512OfPassword };