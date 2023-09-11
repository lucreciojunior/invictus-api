///<reference types="cypress"/>

describe('Validando um login do usuario', () => {
  it('Login com sucesso', () => {
    cy.Login('testejr@qacoders.com', 'Teste@123').then((Response) => {
      expect(Response.status).to.eq(200)
      
    })
  
  })
})