import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco usando a string de conexão

export async function getTodosPosts() { // Busca todos os posts no banco de dados
    const db = conexao.db("imersao-instabyte"); // Seleciona o banco de dados
    const colecao = db.collection("posts"); // Seleciona a coleção de posts
    return colecao.find().toArray(); // Retorna todos os documentos da coleção
};

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}