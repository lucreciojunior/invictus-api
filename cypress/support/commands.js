Cypress.Commands.add('Login', (email, senha) => {
    cy.api({
        method: 'POST',
        url: 'http://localhost:21165/api/login',
        body: {
          "mail": email,
          "password": senha
            }
    }).then((Response) => {
        return Response.body.token
        // cy.log(Response.body.token)
      })
    //   .then(tkn => { token  = tkn})
})


  
  