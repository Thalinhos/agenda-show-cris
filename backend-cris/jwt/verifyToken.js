import jwt from 'npm:jsonwebtoken';

const SECRET = Deno.env.get("SECRET")

export const verifyToken = ((req, res, next) => {
    const rawToken = req.headers.cookie
    const token = rawToken?.split('=')[1]

    if(!token){ return res.render('login', {errorMessage: 'Sessão expirada, faça login novamente'}) } 


    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) { return res.render('login', {errorMessage: 'Sessão expirada, faça login novamente'}) }
        
          req.user = decoded;
          next()
    });
})