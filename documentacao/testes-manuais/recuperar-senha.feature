#language: pt

Funcionalidade: Recuperação de palavra-passe
  Cenário: RST-001 Pedido de recuperação com e-mail registado (inconclusivo)
    Dado que acedo a "Esqueci minha senha"
    Quando submeto um e-mail registado
    Então devo ver confirmação de envio
    # Observação: Sem serviço de e-mail em staging → cenário fica "Inconclusivo"
