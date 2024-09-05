describe("/livros", () => {
  context("POST", () => {
    before(() => {
      cy.dropCollection("livros", {
        database: "test",
        failSilently: "true",
      }).then((result) => {
        cy.log(result);
      });
    });

    it("deve cadastrar um novo livro", () => {
      const livro = {
        titulo: "1984",
        autor: "George Orwell",
        editora: "Companhia das Letras",
        anoPublicacao: 1949,
        numeroPaginas: 326,
      };

      cy.postLivro(livro).then((res) => {
        expect(res.status).to.eql(201);
        expect(res.body.titulo).to.eql(livro.titulo);
        expect(res.body.autor).to.eql(livro.autor);
        expect(res.body.editora).to.eql(livro.editora);
        expect(res.body._id).to.not.be.empty;
      });
    });

    it("não deve cadastrar um livro duplicado", () => {
      const livro = {
        titulo: "O Senhor dos Anéis: A Sociedade do Anel",
        autor: "J.R.R. Tolkien",
        editora: "HarperCollins",
        anoPublicacao: 1954,
        numeroPaginas: 423,
      };

      cy.postLivro(livro).then((res) => {
        expect(res.status).to.eql(201);
        cy.postLivro(livro).then((res) => {
          expect(res.status).to.eql(409);
          expect(res.body.message).to.contain("Livro já cadastrado");
        });
      });
    });
  });
});
