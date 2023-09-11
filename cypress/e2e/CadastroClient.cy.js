///<reference types="cypress"/>
import { faker } from '@faker-js/faker';

describe('Validando e cadastrando cliente', () => {
    let cpf = Math.random().toFixed(11).substring(2)
    let rg = Math.random().toFixed(7).substring(2)
    let firstName = faker.person.firstName() 
    let lastName = faker.person.firstName()
    let token

    before(() =>{
        cy.Login('sysadmin@qacoders.com', '1234@Test').then(tkn => { token = tkn })
    })

    context.only('Validando campo FullName', () => {
        it('FullName é obrigatorio', () => {
            cy.api({
                method: 'POST',
                url: 'https://develop.qacoders-academy.com.br/api/client',
                headers: {authorization: token},
                failOnStatusCode: false,
                body: {
                    "fullName": "",
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
                expect(Response.status).to.eq(400);
                expect(Response.body).to.deep.eq(['O campo Nome Completo é obrigatório.'])
                cy.log(Response.body)
            })
            
        });
        it('FullName deve conter "Nome e sobrenome"', () => {
            cy.api({
                method: 'POST',
                url: 'https://develop.qacoders-academy.com.br/api/client',
                headers: {authorization: token},
                failOnStatusCode: false,
                body: {
                    "fullName": "Teste",
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
                expect(Response.status).to.eq(400);
                expect(Response.body).to.deep.eq(['O campo Nome Completo deve conter entre 8 e 100 caracteres.'])
                cy.log(Response.body)
            })
            
        });
        it('FullName letras e espaços', () => {
            cy.api({
                method: 'POST',
                url: 'https://develop.qacoders-academy.com.br/api/client',
                headers: {authorization: token},
                failOnStatusCode: false,
                body: {
                    "fullName": "12121$$#@@! !@!@!@!",
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
                expect(Response.status).to.eq(400);
                expect(Response.body).to.deep.eq(['O campo Nome Completo deve conter apenas letras e espaços em branco.'])
                cy.log(Response.body)
            })
            
        });
        it('FullName limite de caracteres', () => {
            cy.api({
                method: 'POST',
                url: 'https://develop.qacoders-academy.com.br/api/client',
                headers: {authorization: token},
                failOnStatusCode: false,
                body: {
                    "fullName": "asdfgpoiuyasdfgpoiuyasdfgpoiuyasdfgpoiuyasdfgpoiuyibdflaishjbfedljashbefljhasbljdfhbalsdhvfljashvdfjhasvdljfhvalsjdhfvljashdvfljashvdfljvsaldjhajifasgdiahadsasasdasdasdasdasdasdasdasdasdsasdasdasdasdasdasdaksdbjalksdblksdbliahbsgdkas",
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
                expect(Response.status).to.eq(400);
                expect(Response.body).to.deep.eq(['O campo Nome Completo deve conter entre 8 e 100 caracteres.'])
                cy.log(Response.body)
            })
            
        });
        
    })
    

    it('Cadastro com sucesso', () => {
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
        
    });

    it('E-mail já cadastrado', () => {
        cy.api({
            method: 'POST',
            url: 'https://develop.qacoders-academy.com.br/api/client',
            headers: {authorization: token},
            failOnStatusCode: false,
            body: {
                "clientCode": faker.person.firstName(),
                "fullName": `${firstName} ${lastName}`,
                "birthDate": "20032000",
                "mail": "teste@qacoders.com",
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
            expect(Response.status).to.eq(409);
            expect(Response.body.alert[0]).to.eq('E-mail já cadastrado.')
          });
          
        
    });

    it('teste', () => {

        cy.fixture('users').then(function(users){
            const userDate = users.CadastroSucess
            
            cy.api({
                method: 'POST',
                url: 'https://develop.qacoders-academy.com.br/api/client',
                headers: {authorization: token},
                failOnStatusCode: false, 
                body: userDate
            })
            
        })

        
        
    })
})



