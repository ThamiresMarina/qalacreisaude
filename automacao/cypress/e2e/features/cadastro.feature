#language: pt
Funcionalidade: Cadastro de utilizador (staging)

  @mobile @cadastro
  Cenário: Cadastro válido redireciona para login
    Dado que estou na página de cadastro em modo mobile
    Quando preencho o formulário com dados válidos
    E submeto o cadastro
    Então devo ser redirecionada para a página de login

