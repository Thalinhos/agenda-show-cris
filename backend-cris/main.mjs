// deno-lint-ignore-file
import express from 'express';
import cors from "cors"


import { router } from './router/router.mjs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
// app.use(cors());
app.use(cors({
  // origin: "https://agenda-show-cris-fjc3.onrender.com",  // Permite apenas requisições do seu frontend React
}));

app.use(router);

//this route means when expressjs dosnt found a route, it will return the index.html file
//and the react-router will handle the route
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}/`);
});
