describe('Fazendo um cadastro de usuario', () => {
    it('Login com sucesso', () => {
      cy.api({
        method: 'POST',
        url: 'http://localhost:21165/api/signup',
        body: {
            "fullName":"Lucrecio Junior",
            "mail":"testejr@qacoders.com",
            "idCompany": "28.458.256/0001-99",
            "password": "Teste@123",
            "confirmPassword": "Teste@123",
            "accessProfile": "Admin",
              "audit": [
                {
                    "loginUser": "testejr@qacoders.com"
                }
            ]
        }
      })
    })
  })