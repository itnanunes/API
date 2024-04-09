/// <reference types = "cypress"/>


describe('Teste de API - Produtos', () => {

  let token
  beforeEach (() =>{
    cy.token('itit@gmail.com', 'teste').then(tkn => {token = tkn})
  })

    it('Listar Produtos - GET', () => {
      cy.request({
        method: 'GET',
        url: 'produtos'
      }).should((response) => {
        expect(response.status).equal(200)
        expect(response.body).to.have.property('produtos')
    })
  })

  it('Cadastrar Produto - POST', () => {
    //TODO: Criar token dinamicamente
    //let token =   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml0aXRAZ21haWwuY29tIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTcxMjYyMzU3NiwiZXhwIjoxNzEyNjI0MTc2fQ.8mfzsKz31WDQ3o5Ffy9aBIbZq_yvewULQevQavz1CTI"
    //TODO: Criar produto dinamicamente
    let produto =  'Produto EBAC ' + Math.floor(Math.random() * 100
  )
    cy.request ({
      method: 'POST',
      url: 'produtos',
      headers: {authorization: token},
      body: {
   
        "nome": produto,
        "preco": 30,
        "descricao": "Cabo USB",
        "quantidade": 25
      }
    }).should((response) => {
     expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    });
  });

  it('Deve validar mensagem de produto cadastrado anteriormente', () => {
    cy.request ({
      method: 'POST',
      url: 'produtos',
      headers: {authorization: token},
      body: {
   
        "nome": 'Mouse Logi blue',
        "preco": 30,
        "descricao": "Cabo USB",
        "quantidade": 25
      }
      // Validar statuscode de erro
      , failOnStatusCode: false

    }).should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).to.equal('Já existe produto com esse nome')
    });
  });  

  it.only('Deve validar mensagem de produto cadastrado anteriormente usando comandos customizados', () => {
   cy.cadastrarProduto(token, 'Mouse Logi blue', 25, 'Mouse', 59)
    .should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).to.equal('Já existe produto com esse nome')
    })
  });  

});
