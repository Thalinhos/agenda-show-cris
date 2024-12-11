import jwt from 'npm:jsonwebtoken';

const SECRET = Deno.env.get("SECRET")

export const setToken = ((user) => {

    const token = jwt.sign({ username: user }, SECRET, { expiresIn: '15min' });

    return token;

});