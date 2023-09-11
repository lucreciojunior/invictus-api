///<reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Validando e cadastrando cliente', () => {
    let cpf = Math.random().toFixed(11).substring(2)
    let rg = Math.random().toFixed(7).substring(2)
    let firstName = faker.person.firstName() 
    let lastName = faker.person.firstName()
    let token

    before(() =>{
        cy.Login('testejr@qacoders.com', 'Teste@123').then(tkn => { token = tkn })
    })

    it.only('Cadastro com sucesso', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:21165/api/client',
            headers: {authorization: token},
            failOnStatusCode: false,
            body: {
                "clientCode": faker.person.firstName(),
                "fullName": `${firstName} ${lastName}`,
                "birthDate": "20/03/2000",
                "mail": faker.internet.email(firstName),
                "phone": faker.phone.number('## ## ##### ####'),
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
                        "zipCode": faker.location.zipCode('#####-###'),
                        "city": faker.location.city(),
                        "state": faker.location.street(),
                        "district": 'Brazil',
                        "street": faker.location.street(),
                        "number": faker.location.buildingNumber(),
                        "complement": '363 casa'
                    }
                ],
                "status": true,
                "audit": [
                    {
                        "registrationDate": "newDate()",
                        "loginUser": "loginUser"
                    }]
            },
        }).then((Response) => {
            expect(Response.status).to.eq(201)
        })
        
    });

    it('E-mail já cadastrado', () => {
        cy.api({
            method: 'POST',
            url: 'http://localhost:21165/api/client',
            headers: {authorization: token},
            failOnStatusCode: false,
            body: {
                "clientCode": faker.person.firstName(),
                "fullName": `${firstName} ${lastName}`,
                "birthDate": "20/03/2000",
                "mail": 'testejr@qacoders.com',
                "phone": faker.phone.number('## ## ##### ####'),
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
                        "zipCode": faker.location.zipCode('#####-###'),
                        "city": faker.location.city(),
                        "state": faker.location.street(),
                        "district": 'Brazil',
                        "street": faker.location.street(),
                        "number": faker.location.buildingNumber(),
                        "complement": '363 casa'
                    }
                ],
                "status": true,
                "audit": [
                    {
                        "registrationDate": "newDate()",
                        "loginUser": "loginUser"
                    }]
            },
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body.alert[0]).to.eq('E-mail já cadastrado.')
          });
          
        
    });

    it.only('teste', () => {

        cy.fixture('users').then(function(users){
            const userDate = users.CadastroSucess
            
            cy.api({
                method: 'POST',
                url: 'http://localhost:21165/api/client',
                headers: {authorization: token},
                failOnStatusCode: false, 
                body: userDate
            })
            
        })

        
        
    })
})

