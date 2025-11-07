const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");


function emailAlias() {
  const ts = Date.now();
  return `marinathamires0+lacrei${ts}@gmail.com`;
}
const passwordValida = "Qa!2025xx1";


function typeFirst(selector, text, fallbackIndex) {
  cy.get(selector).then(($els) => {
    if ($els.length) {
      cy.wrap($els.first()).clear().type(text, { delay: 0 });
    } else {
      cy.get("form input:visible").eq(fallbackIndex).clear().type(text, { delay: 0 });
    }
  });
}


function marcarCheckboxPorLabel(regex) {
  cy.get("label:visible").then(($labels) => {
    const alvo = [...$labels].find((l) => regex.test(l.innerText || ""));
    if (!alvo) { cy.log(`(checkbox opcional) não encontrei label com: ${regex}`); return; }

    const $label = Cypress.$(alvo);
    const forAttr = $label.attr("for");
    if (forAttr) {
      cy.get(`#${forAttr}`, { timeout: 4000 }).should("exist").check({ force: true });
    } else if ($label.find('input[type="checkbox"]').length) {
      cy.wrap($label.find('input[type="checkbox"]').get(0)).check({ force: true });
    } else {
      cy.wrap($label.parent()).find('input[type="checkbox"]:visible', { timeout: 4000 }).first().check({ force: true });
    }
  });
}

Given("que estou na página de cadastro em modo mobile", () => {
  cy.viewport(412, 915);
  cy.visit("/saude/paciente/cadastrar/");

  
  cy.contains(/Crie sua conta|Cria a tua conta|Cadastrar/i, { timeout: 15000 }).should("exist");

  
  cy.window().then((win) => {
    const doc = win.document;
    ['[class*="vlibras"]', "[id*='vlibras']", "[vw]", ".vpw-container", ".vpw-plugin-wrapper"].forEach((sel) => {
      const el = doc.querySelector(sel);
      if (el) el.style.display = "none";
    });
  });

  cy.scrollTo("top");
});

When("preencho o formulário com dados válidos", () => {
  const mail = emailAlias();

  typeFirst('input[placeholder*="nome civil"], input[placeholder*="nome social"]', "Thamires", 0);
  typeFirst('input[placeholder*="sobrenome"]', "Santos", 1);

  cy.get('input[type="email"]:visible', { timeout: 8000 }).then(($e) => {
    if ($e.length >= 2) {
      cy.wrap($e.eq(0)).clear().type(mail);
      cy.wrap($e.eq(1)).clear().type(mail);
    } else {
      cy.get("form input:visible").eq(2).clear().type(mail);
      cy.get("form input:visible").eq(3).clear().type(mail);
    }
  });

  cy.get('input[type="password"]:visible', { timeout: 8000 }).then(($p) => {
    if ($p.length >= 2) {
      cy.wrap($p.eq(0)).clear().type(passwordValida, { log: false });
      cy.wrap($p.eq(1)).clear().type(passwordValida, { log: false });
    } else {
      cy.get("form input:visible").eq(4).clear().type(passwordValida, { log: false });
      cy.get("form input:visible").eq(5).clear().type(passwordValida, { log: false });
    }
  });

  
  marcarCheckboxPorLabel(/Termos|uso|privacidade/i);
  marcarCheckboxPorLabel(/18 anos|maior de idade/i);
});

When("submeto o cadastro", () => {
  
  cy.contains("button, [role='button']", /^Cadastrar$/)
    .scrollIntoView()
    .should("be.visible")
    .and("not.be.disabled")
    .click({ force: true });
});

Then("devo ser redirecionada para a página de login", () => {
  
  cy.url({ timeout: 15000 }).should((url) => {
    expect(url).to.match(/login|lacreisaude\.com\.br\/?$/i);
  });

  
  cy.get('input[type="email"]', { timeout: 10000 }).should("be.visible");


  cy.screenshot("pos-cadastro-login");
});



