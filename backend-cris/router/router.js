import { ObjectId } from "mongodb";
import { setToken } from "../jwt/setToken.js";
import { postCollection, userCollection } from "../mongodb/db.js";
import { seeder } from "../mongodb/seeder.js";

import bcrypt from 'npm:bcrypt';
import express from 'npm:express';
export const router = express.Router();

router.post('/handleLogin', async (req, res) => {
  const { usuario, senha } = req.body;

  const user = await userCollection.findOne({nome: usuario});

  if(!user){ return res.status(404).json({errorMessage: "Usuário não encontrado."}); }

  const senhaVerify = await bcrypt.compare(senha, user.senha);

  if(!senhaVerify){ return res.status(404).json({errorMessage: "Credenciais inválidas."}); }

  const token = setToken(user.nome);

  return res.status(200).json({token: token}); 
});


router.get('/getAllPosts', async (req, res) => {
  const events = await postCollection.find().toArray();
  if (events <= 0) {
    return res.status(404).json({errorMessage: "Sem eventos disponíveis."})
  }
    return res.json({message: events})
});


router.post('/addPost', async (req, res) => {
  const { descricao, data } = req.body;

  if(!descricao || !data){
    return res.status(400).json({errorMessage: "Valores precisam ser inseridos."});
  }

  const postToAdd = {
    descricao,
    data
  };

  try {
    await postCollection.insertOne(postToAdd);
    return res.status(200).json({message: "Evento inserido com sucesso!"}); 
  } catch (error) {
    return res.status(400).json({errorMessage: "Erro ao inserir valores. Erro: " + error}); 
  }
})


router.delete('/deletePost/:postId', async (req, res) => {
  const postId = req.params.postId;

  if(!postId){
    return res.status(400).json({errorMessage: "Valores precisam ser inseridos."});
  }

  try{
    const postVerify = await postCollection.findOne({_id: new ObjectId(postId)})
    if(!postVerify){
      return res.status(404).json({errorMessage: "Evento inexistente. Falha ao excluir."})
    }
  }catch (error){
    return res.status(404).json({errorMessage: "Não foi possivel excluir o valor: " + error})
  }

  try {
    await postCollection.deleteOne({_id: new ObjectId(postId)});
    return res.status(200).json({message: "Evento excluído com sucesso!"}); 
  } catch (error) {
    return res.status(404).json({errorMessage: "Falha ao excluir: " + error});
  }
});

router.post('/updatePost/:postId', async (req, res) => {
  const postId = req.params.postId;
  const { descricao, data } = req.body;

  if(!descricao || !data || !postId){
    return res.status(400).json({errorMessage: "Valores precisam ser inseridos."});
  }

  const postToUpdate = {
    descricao,
    data
  };

  try{
    const postVerify = await postCollection.findOne({_id: new ObjectId(postId)})
    if(!postVerify){
      return res.status(404).json({errorMessage: "Evento inexistente. Falha ao excluir."})
    }
  }catch (error){
    return res.status(404).json({errorMessage: "Não foi possivel excluir o valor: " + error})
  }

  try {
    await postCollection.deleteOne({_id: new ObjectId(postId)});
    await postCollection.insertOne(postToUpdate);
    return res.status(200).json({message: "Evento atualizado com sucesso!"});

  } catch (error) {
    return res.status(404).json({errorMessage: "Falha ao atualizar: " + error});
  }
});

router.get('/seeder', async (req, res) => {
  try {
    await seeder();
    return res.status(200).json({message: "Seeder atualizado com sucesso!"});
  } catch (error) {
    return res.status(404).json({errorMessage: `Falha ao fazer seeder. ${error}.`});
  }
})
