const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const livrosRoutes = require("./routes/livros");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5000;
// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Middleware para parsing do body das requisições
app.use(bodyParser.json());

// Rotas da API
app.use("/api", livrosRoutes);

// Tratamento de erros gerais
app.use((err, req, res, next) => {
  res.status(500).send({ error: "Erro no servidor: " + err.message });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
