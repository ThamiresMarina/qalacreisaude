
class CadastroPage {
  visit() {

    cy.visit("/saude/paciente/cadastrar/");
  }

  

  nome() {
    
    return cy.get('input[placeholder*="nome civil"]');
  }

  sobrenome() {
    
    return cy.get('input[placeholder*="sobrenome"]');
  }

  email() {
    
    return cy.get('input[type="email"]').first();
  }

  emailConfirm() {
    
    return cy.get('input[type="email"]').eq(1);
  }

  senha() {
    
    return cy.get('input[type="password"]').first();
  }

  senhaConfirm() {
    
    return cy.get('input[type="password"]').eq(1);
  }

  aceitarTermos() {
   
    return cy.contains('label', /Termos/i).prev('input');
  }

  maiorIdade() {
    
    return cy.contains('label', /18 anos/i).prev('input');
  }

  submeter() {
    
    return cy.contains('button, [role="button"]', /Cadastrar/i);
  }
}

module.exports = new CadastroPage();