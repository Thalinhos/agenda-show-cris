import { ObjectId } from "mongodb";
import { setToken } from "../jwt/setToken.mjs";
import { postCollection, userCollection } from "../mongodb/db.mjs";
import { seeder } from "../mongodb/seeder.mjs";

import moment from 'moment-timezone';
import bcrypt from 'bcrypt';
import express from 'express';
import { verifyToken } from "../jwt/verifyToken.mjs";

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

router.post('/verify', verifyToken, (req, res) => {
  return res.status(200).json({message: req.decoded});
})



router.get('/getAllPosts', async (req, res) => {
  try {
    const events = await postCollection.find().toArray();

    events.forEach(event => {
      const [day, month, year] = event.data.split('/');
      event.parsedDate = new Date(`${month}/${day}/${year}`);
    });

    events.sort((a, b) => a.parsedDate - b.parsedDate);

    if (events.length <= 0) {
      return res.status(404).json({ errorMessage: "Sem eventos disponíveis." });
    }

    return res.json({ message: events });
  } catch (error) {
    console.error("Erro ao buscar os eventos:", error);
    return res.status(500).json({ errorMessage: "Erro ao buscar os eventos." });
  }
});


//////////////////////////////////////////////////////////////////////////////
router.post('/addPost', verifyToken ,async (req, res) => {
  const { descricao, data, hora } = req.body;

  if (!descricao || !data || !hora) {
    return res.status(400).json({ errorMessage: "Valores precisam ser inseridos." });
  }

  // Validando se a data está no formato correto
  const parsedDate = moment(data, "DD/MM/YYYY", true);

  if (!parsedDate.isValid()) {
    return res.status(400).json({ errorMessage: "Formato de data inválido. Use DD/MM/YYYY." });
  }

  // Converter para o fuso horário de São Paulo
  const brasiliaDate = data

  const postToAdd = {
    descricao: descricao,
    data: brasiliaDate,
    hora: hora
  };

  try {
    await postCollection.insertOne(postToAdd);
    return res.status(200).json({ message: "Evento inserido com sucesso!" });
  } catch (error) {
    return res.status(400).json({ errorMessage: "Erro ao inserir valores. Erro: " + error });
  }
});
/////////////////////////////////////////////////////////////////////////////////


router.delete('/deletePost/:postId', verifyToken, async (req, res) => {
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

router.post('/updatePost/:postId', verifyToken, async (req, res) => {
  const postId = req.params.postId;
  const { descricao, data, hora } = req.body;

  if(!descricao || !data || !hora || !postId){
    return res.status(400).json({errorMessage: "Valores precisam ser inseridos."});
  }

  const parsedDate = moment(data, "DD/MM/YYYY", true);

  if (!parsedDate.isValid()) {
    return res.status(400).json({ errorMessage: "Formato de data inválido. Use DD/MM/YYYY." });
  }

  const postToUpdate = {
    descricao: descricao,
    data: data,
    hora: hora
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


router.get('/getPostFromDate/:dateValue', async (req, res) => {
  const dateValue = req.params.dateValue;
  // console.log(dateValue);

  if (!dateValue) {
    return res.status(400).json({ errorMessage: "Valores precisam ser inseridos." });
  }
  
  const dateMoment = moment(dateValue, "DD-MM-YYYY", true);
  // console.log(dateMoment);
  
  if (!dateMoment.isValid()) {
    return res.status(400).json({ errorMessage: "Formato de data inválido. Use DD-MM-YYYY." });
  }
  
  const dataParsedToQuery = dateValue.replaceAll('-', '/');
  // console.log("Data formatada para busca:", dataParsedToQuery);
  
  try {
    const dataToFind = await postCollection.find({ data: dataParsedToQuery }).toArray();
    // console.log(dataToFind);
    if (dataToFind.length > 0) {
      // console.log(dataToFind);
      return res.status(200).json({ message: dataToFind });
    } else {
      return res.status(400).json({ errorMessage: "Data não encontrada no sistema." });
    }
  } catch (error) {
    console.error("Erro ao consultar posts:", error);
    return res.status(500).json({ errorMessage: "Erro ao consultar posts." });
  }
})  



router.get('/seeder', async (req, res) => {
  try {
    await seeder();
    return res.status(200).json({message: "Seeder atualizado com sucesso!"});
  } catch (error) {
    return res.status(404).json({errorMessage: `Falha ao fazer seeder. ${error}.`});
  }
})
