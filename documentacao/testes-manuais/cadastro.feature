#language: pt

Funcionalidade: Cadastro de pessoa utilizadora
  Como pessoa que acede à Lacrei Saúde
  Quero criar uma conta no ambiente de staging
  Para poder usar os serviços da plataforma

  Contexto:
    Dado que estou na página inicial em vista mobile
    E navego para a área de criar conta

  Cenário: CAD-001 Cadastro válido com dados completos
    Quando preencho os campos obrigatórios com dados válidos
    E aceito os termos e políticas
    E submeto o formulário de cadastro
    Então devo ser redirecionada para a página de login
    E deve ser solicitado e-mail verificado antes de entrar
    # Observação: fluxo bloqueado por falta de envio de e-mail (ver CRIT-001)

  Cenário: CAD-003 Validação de campos obrigatórios
    Quando deixo um ou mais campos obrigatórios vazios
    E tento submeter
    Então devo ver mensagens de validação por campo
