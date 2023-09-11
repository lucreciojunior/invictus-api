///<reference types="cypress"/>

describe('Validando um login do usuario', () => {
  it('Login com sucesso', () => {
    cy.api({
      method: 'POST',
      url: 'https://develop.qacoders-academy.com.br/api/login',
      failOnStatusCode: false,
      body: {
        "mail": 'sysadmin@qacoders.com',
        "password": '1234@Test'
          }
  }).then((Response) => {
    expect(Response.status).to.eq(200);
    })
  })
})







