// deno-lint-ignore-file
import express from 'npm:express';
import cors from "npm:cors"
import bcrypt from 'npm:bcrypt';


import { postCollection, userCollection } from './mongodb/db.js';

import { setToken } from './jwt/setToken.js';
import { verifyToken } from './jwt/verifyToken.js';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.post('/handleLogin', async (req, res) => {
  const { usuario, senha } = req.body;

  const user = await userCollection.findOne({nome: usuario});

  if(!user){ return res.status(404).json({errorMessage: "Usuário não encontrado."}); }

  const senhaVerify = await bcrypt.compare(senha, user.senha);

  if(!senhaVerify){ return res.status(404).json({errorMessage: "Credenciais inválidas."}); }

  const token = setToken(user.nome);

  return res.status(200).json({token: token}); 
});

// app.get('/seeder', async (req, res) => {
//   const events = await postCollection.find().toArray();
//   if (events <= 0) {
//     return res.status(404).json({errorMessage: "Sem eventos disponíveis."})
//   }
//     return res.json({message: events})
// }) OK!



app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}/`);
});
//deno --watch --env-file -A .\main.js