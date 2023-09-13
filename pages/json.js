///<reference types="cypress"/>
import { faker } from '@faker-js/faker';

let cpf = Math.random().toFixed(11).substring(2)
let rg = Math.random().toFixed(7).substring(2)
let firstName = faker.person.firstName() 
let lastName = faker.person.firstName()


export default { 

    cleint: function() {
        var data = {
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
        }

        return data

    }
}