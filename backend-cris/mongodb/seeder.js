import { MongoClient } from "mongodb";
import bcrypt from 'npm:bcrypt';


const mongoUri = Deno.env.get("MONGO_URI");
const adminSenha = Deno.env.get("SENHA_ADMIN");

if (!mongoUri || !adminSenha) {
  throw new Error("Env value not found.");
}

const client = await MongoClient.connect(mongoUri);
const userCollection = client.db('cris_db').collection('users');
const postCollection = client.db('cris_db').collection('events');

async function seeder() {
  try {
    const verifyUser = await userCollection.findOne({ nome: "admin" });
    if (verifyUser) {
      console.log("Usuário já consta no sistema");
      return;
    }

    const eventVerify = await postCollection.findOne({ descricao: "festa de aniversario do thalisson" });
    if (eventVerify) {
      console.log("Evento já consta no sistema");
      return;
    }

    const adminUser = {
      nome: "admin",
      senha: await bcrypt.hash(adminSenha, 10),
    };

    const eventTest = {
      descricao: "festa de aniversario do thalisson",
      data: "15/12 às 14 horas",
    };

    await userCollection.insertOne(adminUser);
    await postCollection.insertOne(eventTest);

    console.log('Sucesso ao fazer seed');

  } catch (error) {
    console.log(error);
    throw new Error("Erro: " + error);
  } finally {
    await client.close();
  }
}

seeder();
