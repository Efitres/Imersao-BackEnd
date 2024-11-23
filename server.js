import express from "express"; // Framework para criar a aplicação web
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria a aplicação Express
app.use(express.static("uploads"));
routes(app);

app.listen(3000, () => { // Inicia o servidor na porta 3000
    console.log("Servidor escutando...");
});