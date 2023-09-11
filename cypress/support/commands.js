Cypress.Commands.add('Login', (email, senha) => {
    cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/login',
        failOnStatusCode: false,
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


  
  