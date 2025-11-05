# CRIT-001 – Fluxo de cadastro bloqueado (staging)

**Severidade:** Crítico  
**Estado:** Reportado  
**Ambiente:** https://paciente-staging.lacreisaude.com.br/ (Mobile – Samsung S20 Ultra em Chrome DevTools)

## Passos para reproduzir
1. Aceder à página inicial e seleccionar **Criar conta**
2. Preencher dados válidos, aceitar termos e submeter
3. Redirecção automática para a página de login
4. Introduzir e-mail e senha criados
5. Mensagem: “Por favor, verifique seu email antes de realizar essa operação”
6. **Nenhum e-mail de verificação é recebido**

## Resultado actual
Utilizadora fica impedida de iniciar sessão e prosseguir para pós-cadastro, edição de perfil e busca.

## Resultado esperado
Receber e-mail de verificação OU existir alternativa de verificação no onboarding em staging.

## Evidências
- `documentacao/evidencias/screenshot-cadastro.png`
- `documentacao/evidencias/screenshot-login-bloqueado.png`

## Impacto
Bloqueio total dos fluxos principais do desafio.

## Sugestão
Restaurar serviço de e-mail no staging ou permitir verificação in-app.
