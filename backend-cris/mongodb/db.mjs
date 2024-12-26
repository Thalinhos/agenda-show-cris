import { MongoClient } from "mongodb";

// const mongoUri = Deno.env.get("MONGO_URI");
const mongoUri = process.env.MONGO_URI;

if(!mongoUri){
    throw new Error("Env value not found.");
}

const client = await MongoClient.connect(mongoUri);
const userCollection = client.db('cris_db').collection('users');
const postCollection = client.db('cris_db').collection('events');

export { userCollection, postCollection};