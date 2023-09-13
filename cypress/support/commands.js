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


Cypress.Commands.add('POST', () => {
  cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: {
        "clientCode": faker.person.firstName(),
        "fullName": `${firstName} ${lastName}`,
        "birthDate": "20032000",
        "mail": faker.internet.email(firstName),
        "phone": faker.phone.number('#############'),
        "currentRole": faker.person.jobType(),
        "documents": [
            {
                "cpf": cpf,
                "rg": rg
            }
        ],
        "address": [
            {
                "country": faker.location.country(),
                "zipCode": faker.location.zipCode('########'),
                "city": faker.location.city(),
                "state": "PE",
                "district": 'Brazil',
                "street": faker.location.street(),
                "number": faker.location.buildingNumber(),
                "complement": '363 casa'
            }
        ]     
    },
}).then((Response) => {
    expect(Response.status).to.eq(201)
})
})
  