///<reference types="cypress"/>
import { en, faker } from '@faker-js/faker';
import json from '../../pages/json'

describe('Validando e cadastrando cliente', () => {
    let token
    before(() =>{
        cy.Login('sysadmin@qacoders.com', '1234@Test').then(tkn => { token = tkn })
    })

it('Cadastro com sucesso', () => {
    let dados = json.cleint()
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: dados
    }).then((Response) => {
        expect(Response.status).to.eq(201)
    })      
});

context('Validando campo FULLNAME', () => {

    it('FullName é obrigatorio', () => {
        let dados = json.cleint()
        dados.fullName = ''

        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: dados
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O campo Nome Completo é obrigatório.'])
            cy.log(Response.body)
        })      
    });

    it('FullName deve conter "Nome e sobrenome"', () => {
        let dados = json.cleint()
        dados.fullName = 'junior'

        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: dados
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O campo Nome Completo deve conter entre 8 e 100 caracteres.'])
        })      
    });

    it('FullName letras e espaços', () => {
        let dados = json.cleint()
        dados.fullName = '12121$$#@@! !@!@!@!'

        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: dados
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O campo Nome Completo deve conter apenas letras e espaços em branco.'])
            cy.log(Response.body)
        })      
    });

    it('FullName limite de caracteres', () => {
        let dados = json.cleint()
        dados.fullName = 'asdfgpoiuyasdfgpoiuyasdfgpoiuyasdfgpoiuyasdfgpoiuyibdflaishjbfedljashbefljhasbljdfhbalsdhvfljashvdfjhasvdljfhvalsjdhfvljashdvfljashvdfljvsaldjhajifasgdiahadsasasdasdasdasdasdasdasdasdasdsasdasdasdasdasdasdaksdbjalksdblksdbliahbsgdkas'

        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: dados
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O campo Nome Completo deve conter entre 8 e 100 caracteres.'])
            cy.log(Response.body)
        })
    }); 
})
 
context('Validando campo DATA NASCIMENTO', () => {
        it('Data de Nascimento é obrigatoria', () => {
        let dataNasc = json.cleint()
        dataNasc.birthDate = ''
    
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: dataNasc
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O campo Data de Nascimento é obrigatório.', 'A Data de Nascimento deve conter apenas dígitos numéricos.'])
            cy.log(Response.body)
        })      
    });

    it('Data de nascimento com apenas numeros', () => {
        let dataNasc = json.cleint()
        dataNasc.birthDate = '!@!@E#@'
    
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: dataNasc
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['A Data de Nascimento deve conter apenas dígitos numéricos.'])
            cy.log(Response.body)
        })      
    });
    
    it('Data de nascimento limite de caractere', () => {
        let dataNasc = json.cleint()
        dataNasc.birthDate = '12165465462165'
        
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: dataNasc
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['Limite de caracteres excedido. É pemitido apenas 8 caracteres no campo Data de Nascimento.'])
            cy.log(Response.body)
        })      
    });
})

context('Validando campo E-MAIL', () => {
it('E-MAIL é obrigatoria', () => {
    let Email = json.cleint()
    Email.mail = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: Email
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['O campo Email é obrigatório.'])
        cy.log(Response.body)
    })      
});

it('E_MAIL já cadastrado', () => {
    let Email = json.cleint()
    Email.mail = 'sysadmin@qacoders.com'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: Email
    }).then((Response) => {
        expect(Response.status).to.eq(409);
        expect(Response.body.alert).to.deep.eq(['E-mail já cadastrado.'])
        cy.log(Response.body)
    })      
});

it('E-MAIL formato invalido', () => {
    let Email = json.cleint()
    Email.mail = 'teste.com'
    
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: Email
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['O e-mail informado é inválido.'])
        cy.log(Response.body)
    })      
});
})

context('Validando campo TELEFONE', () => {
    it('Telefone é obrigatoria', () => {
        let cel = json.cleint()
        cel.phone = ''
    
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: cel
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O campo Telefone é obrigatório.'])
            cy.log(Response.body)
        })      
    });
    
    it('Telefone apenas numeros', () => {
        let cel = json.cleint()
        cel.phone = 'aisdjg!@#aisd'
    
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: cel
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O Número de telefone deve conter apenas dígitos numéricos.'])
            cy.log(Response.body)
        })      
    });
    
    it('Telefone limite de caracteres', () => {
        let cel = json.cleint()
        cel.phone = '132665649846846844'
        
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: cel
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O telefone deve possuir de 9 a 15 caracteres.'])
            cy.log(Response.body)
        })      
    });
})

context('Validando campo FUNÇÃO ATUAL', () => {
    it('Função atual é obrigatoria', () => {
    let func = json.cleint()
    func.currentRole = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: func
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['O campo Função atual é obrigatório.'])
        cy.log(Response.body)
    })      
});

it('Função atual limite de caracteres', () => {
    let func = json.cleint()
    func.currentRole = 'iosfhçaiubdfçiajsbdfçiuasbdçfosbdfobasouefdbaçwiufebdçijwbefçiwuqbefçjeuwbeuiowbfeçolkjbasdlkfjbs'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: func
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['A função atual deve possuir até 50 caracteres.'])
        cy.log(Response.body)
    })      
});

})

context('Validando campo RG', () => {
        it('RG é obrigatoria', () => {
        let docRG = json.cleint()
        docRG.documents[0].rg = ''
    
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: docRG
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O campo RG é obrigatório.'])
            cy.log(Response.body)
        })      
    });

    it('RG com apenas numeros', () => {
        let docRG = json.cleint()
        docRG.documents[0].rg = 'ojhajswd'
    
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: docRG
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['O RG deve conter apenas dígitos numéricos.'])
            cy.log(Response.body)
        })      
    });
    
    it('RG limite de caractere', () => {
        let docRG = json.cleint()
        docRG.documents[0].rg = '3213546498646516'
        
        cy.api({
        method: 'POST',
        url: 'https://develop.qacoders-academy.com.br/api/client',
        headers: {authorization: token},
        failOnStatusCode: false,
        body: docRG
        }).then((Response) => {
            expect(Response.status).to.eq(400);
            expect(Response.body).to.deep.eq(['A quantidade de dígitos do RG ideal é de 7.'])
            cy.log(Response.body)
        })      
    });
})

context('Validando campo CPF', () => {
    it('CPF é obrigatoria', () => {
    let docCPF = json.cleint()
    docCPF.documents[0].cpf = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: docCPF
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['O campo CPF é obrigatório.'])
        cy.log(Response.body)
    })      
});

it('CPF já cadastrado', () => {
    let docCPF = json.cleint()
    docCPF.documents[0].cpf = '11111111111'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: docCPF
    }).then((Response) => {
        expect(Response.status).to.eq(409);
        expect(Response.body.alert).to.deep.eq(['CPF já cadastrado.'])
        cy.log(Response.body)
    })      
});

it('CPF com apenas numeros', () => {
    let docCPF = json.cleint()
    docCPF.documents[0].cpf = '!@!@E#@'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: docCPF
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['O CPF deve conter apenas dígitos numéricos.'])
        cy.log(Response.body)
    })      
});

it('CPF limite de caractere', () => {
    let docCPF = json.cleint()
    docCPF.birthDate = '12165465462165'
    
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: docCPF
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['Limite de caracteres excedido. É pemitido apenas 8 caracteres no campo Data de Nascimento.'])
        cy.log(Response.body)
    })      
});
})

context('Validando campo PAÍS', () => {
    it('PAÍS obrigatoria', () => {
    let end = json.cleint()
    end.address[0].country = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['O campo País é obrigatório.'])
        cy.log(Response.body)
    })      
});

it('PAÍS com limite de caracteres', () => {
    let end = json.cleint()
    end.address[0].country = 'ajfhliasdjhfliasuhdfliasuhdfliausdlfiuawgsldajlsdfliabjsdfhliajsbdflisabdlfibas'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(['O campo País permite até 50 caracteres.'])
        cy.log(Response.body)
    })      
});

})

context('Validando campo CEP', () => {
    it('CEP é obrigatoria', () => {
    let end = json.cleint()
    end.address[0].zipCode = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'CEP' é obrigatório."])
        cy.log(Response.body)
    })      
});

it('CEP com apenas numeros', () => {
    let end = json.cleint()
    end.address[0].zipCode = 'ojhajswd'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'CEP' só pode conter números"])
        cy.log(Response.body)
    })      
});

it('CEP limite de caractere', () => {
    let end = json.cleint()
    end.address[0].zipCode = '3213546498646516'
    
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'CEP' deve conter 8 dígitos"])
        cy.log(Response.body)
    })      
});
})

context('Validando campo CIDADE', () => {
    it('CIDADE é obrigatoria', () => {
    let end = json.cleint()
    end.address[0].city = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'cidade' é obrigatório."])
        cy.log(Response.body)
    })      
});

it('CIDADE com limite de caracteres', () => {
    let end = json.cleint()
    end.address[0].city = 'liasdliasdflisahdlfiuaslidfugslidfualsiudgfpwusgdfepisaublidbaslidfbliasdgflisuagdllsadvflishvd'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'cidade' deve possuir no máximo 50 caracteres."])
        cy.log(Response.body)
    })      
});

it('CIDADE não permiti caracteres especiais', () => {
    let end = json.cleint()
    end.address[0].city = '!!!@#$@#%@#%@#'
    
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'cidade' só pode conter letras e os caracteres especiais 'ª', 'º', '‘' e '-'."])
        cy.log(Response.body)
    })      
});
})

context('Validando campo ESTADO', () => {
    it('ESTADO é obrigatoria', () => {
    let end = json.cleint()
    end.address[0].state = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'estado' é obrigatório."])
        cy.log(Response.body)
    })      
});

it('ESTADO com limite de caracteres', () => {
    let end = json.cleint()
    end.address[0].state = 'SFSJ'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'estado' deve possuir 2 caracteres."])
        cy.log(Response.body)
    })      
});

it('ESTADO não permiti caracteres especiais', () => {
    let end = json.cleint()
    end.address[0].state = 'as'
    
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'estado' só pode conter letras maiúsculas"])
        cy.log(Response.body)
    })      
});
})

context('Validando campo BAIRRO', () => {
    it('BAIRRO é obrigatoria', () => {
    let end = json.cleint()
    end.address[0].district = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'bairro' é obrigatório."])
        cy.log(Response.body)
    })      
});

it('BAIRRO com limite de caracteres', () => {
    let end = json.cleint()
    end.address[0].district = 'hajosdfhasoijdfhçasojdfhçoashdfçoasuhdfpioaudfpioausbdfpcioausdbpbfpsiubdfpiasubdfpiasubdp'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'bairro' deve possuir no máximo 50 caracteres."])
        cy.log(Response.body)
    })      
});

it('BAIRRO não permiti caracteres especiais', () => {
    let end = json.cleint()
    end.address[0].district = '!@#!@%!@#!'
    
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'bairro' só pode conter letras, números e os caracteres especiais 'ª', 'º', '‘' e '-'"])
        cy.log(Response.body)
    })      
});
})

context('Validando campo RUA', () => {
    it('RUA é obrigatoria', () => {
    let end = json.cleint()
    end.address[0].street = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'logradouro' é obrigatório."])
        cy.log(Response.body)
    })      
});

it('RUA com limite de caracteres', () => {
    let end = json.cleint()
    end.address[0].street = 'hajosdfhasoijdfhçasojdfhçoashdfçoasuhdfpioaudfpioausbdfpcioausdbpbfpsiubdfpiasubdfpiasubdp'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'logradouro' deve possuir no máximo 80 caracteres."])
        cy.log(Response.body)
    })      
});

it('RUA não permiti caracteres especiais', () => {
    let end = json.cleint()
    end.address[0].street = '!@#!@%!@#!'
    
    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'logradouro' só pode conter letras, números e os caracteres especiais 'ª', 'º', '‘' e '-'"])
        cy.log(Response.body)
    })      
});
})

context('Validando campo NUMERO', () => {
    it('NUMERO é obrigatoria', () => {
    let end = json.cleint()
    end.address[0].number = ''

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'número' é obrigatório."])
        cy.log(Response.body)
    })      
});

it('NUMERO com limite de caracteres', () => {
    let end = json.cleint()
    end.address[0].number = '123046548796465'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'número' deve possuir no máximo 10 caracteres."])
        cy.log(Response.body)
    })      
});
})

context('Validando campo COMPLEMENTO', () => {
    it('COMPLEMENTO limite de caracteres', () => {
    let end = json.cleint()
    end.address[0].complement = 'ofhoçasdhfçqshdefpoiqhsçdfouashdfçoiubhsçaduofgqwçiugfeqwiçugfeiçqwufeijdfbsaiohdfbiashbdfosiau'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'complemento' deve possuir no máximo 80 caracteres."])
        cy.log(Response.body)
    })      
});

it('COMPLEMENTO caracteres especiais', () => {
    let end = json.cleint()
    end.address[0].complement = '!@@!##$#@#!@'

    cy.api({
    method: 'POST',
    url: 'https://develop.qacoders-academy.com.br/api/client',
    headers: {authorization: token},
    failOnStatusCode: false,
    body: end
    }).then((Response) => {
        expect(Response.status).to.eq(400);
        expect(Response.body).to.deep.eq(["O campo 'complemento' só pode conter letras, números e os caracteres especiais 'ª', 'º', '‘' e '-'"])
        cy.log(Response.body)
    })      
});
})





})

