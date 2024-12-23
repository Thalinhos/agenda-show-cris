// deno-lint-ignore-file
import express from 'express';
import cors from "cors"

import { router } from './router/router.mjs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}/`);
});
//deno --watch --env-file -A .\main.js