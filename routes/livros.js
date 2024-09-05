const express = require("express");
const router = express.Router();
const Livro = require("../models/livro");

// 1. Cadastro de livros
router.post("/livros", async (req, res) => {
  try {
    const { titulo, autor, editora, anoPublicacao, numeroPaginas } = req.body;

    // Validação simples
    if (!titulo || !autor || !editora || !anoPublicacao || !numeroPaginas) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    // Verificação de duplicidade
    const livroExistente = await Livro.findOne({ titulo, autor });
    if (livroExistente) {
      return res.status(409).json({ message: "Livro já cadastrado" });
    }

    const novoLivro = new Livro({
      titulo,
      autor,
      editora,
      anoPublicacao,
      numeroPaginas,
    });

    const livroSalvo = await novoLivro.save();
    res.status(201).json(livroSalvo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar o livro", error: error.message });
  }
});

// 2. Listagem de livros
router.get("/livros", async (req, res) => {
  try {
    const livros = await Livro.find();
    res.status(200).send(livros);
  } catch (error) {
    res.status(500).send({ error: "Erro ao listar livros: " + error.message });
  }
});

// 3. Consulta de livro por ID
router.get("/:id", async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).send({ error: "Livro não encontrado" });
    }
    res.status(200).send(livro);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Erro ao consultar livro: " + error.message });
  }
});

// 4. Remoção de livro
router.delete("/:id", async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) {
      return res.status(404).send({ error: "Livro não encontrado" });
    }
    res.status(200).send({ message: "Livro removido com sucesso" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao remover livro: " + error.message });
  }
});

module.exports = router;
