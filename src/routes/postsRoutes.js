// Importa o framework Express para criar a aplicação web
import express from "express";

// Importa o módulo Multer para lidar com uploads de arquivos
import multer from "multer";

// Importa funções controladoras para posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para arquivos carregados (usa o disco)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo utilizando o nome original
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Linux ou macOS: define a rota para manipular as rotas da aplicação
// (Comentado pois não faz parte da configuração ativa)
// const upload = multer({ dest: "./uploads" , storage})

// Define as rotas da aplicação (função que recebe o objeto app do Express)
const routes = (app) => {
  // Habilita o uso de JSON para interpretar dados da requisição
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (delega para a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (delega para a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa middleware upload.single("imagem") 
  // e delega para a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para uso em outros arquivos do projeto
export default routes;