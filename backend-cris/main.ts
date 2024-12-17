// deno-lint-ignore-file
import express from 'npm:express';
import cors from "npm:cors"

import { router } from './router/router.ts';

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