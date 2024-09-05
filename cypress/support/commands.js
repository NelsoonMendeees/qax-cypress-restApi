Cypress.Commands.add("postLivro", (payload) => {
  cy.api({
    url: "/livros",
    method: "POST",
    body: payload,
    failOnStatusCode: false,
  }).then((res) => {
    return res;
  });
});
