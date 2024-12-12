import { MongoClient } from "mongodb";
import bcrypt from 'npm:bcrypt';


const mongoUri = Deno.env.get("MONGO_URI");
const adminSenha = Deno.env.get("SENHA_ADMIN");

if (!mongoUri || !adminSenha) {
  throw new Error("Env value not found.");
}

export async function seeder() {

  const client = await MongoClient.connect(mongoUri);
  const userCollection = client.db('cris_db').collection('users');
  const postCollection = client.db('cris_db').collection('events');


  try {
    const verifyUser = await userCollection.findOne({ nome: "admin" });
    if (verifyUser) {
      throw new Error("Usuário já consta no sistema");
    }

    const eventVerify = await postCollection.findOne({ descricao: "festa de aniversario do thalisson" });
    if (eventVerify) {
      throw new Error("Usuário já consta no sistema");
      return;
    }

    const adminUser = {
      nome: "admin",
      senha: await bcrypt.hash(adminSenha, 10),
    };

    const eventTest = {
      descricao: "festa de aniversario do thalisson",
      data: new Date("2024-12-12"),
    };

    await userCollection.insertOne(adminUser);
    await postCollection.insertOne(eventTest);

    console.log('Sucesso ao fazer seed');

  } catch (error) {
    console.error(error)
    throw new Error(error.message);
  } finally {
    await client.close();
  }
}

// seeder();
