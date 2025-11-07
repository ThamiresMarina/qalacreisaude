# Desafio de QA – Lacrei Saúde (Staging)

[![CI - Cypress E2E](https://github.com/ThamiresMarina/qalacreisaude/actions/workflows/ci.yml/badge.svg)](https://github.com/ThamiresMarina/qalacreisaude/actions/workflows/ci.yml)

Este repositório apresenta a análise de qualidade, execução de testes manuais, registro de bugs, testes de acessibilidade, desempenho, responsividade e automação do fluxo de **Cadastro de Pessoa Usuária** da plataforma Lacrei Saúde (ambiente de staging).


##  Ambiente
Staging: https://paciente-staging.lacreisaude.com.br/  
Viewport: **Mobile** (Samsung S20 Ultra, 412×915) via Chrome DevTools.

##  Testes Manuais (Mobile)
Casos de teste (Gherkin): `documentacao/testes-manuais/`

### Resultados de Execução
| ID | Cenário | Resultado | Evidência | Observações |
|---|---|---|---|---|
| CAD-001 | Cadastro com dados válidos | **Bloqueado** | screenshot-cadastro.png | Ver **CRIT-001** |
| CAD-002 | Pós-cadastro | **Não testado** | — | Bloqueado por CAD-001 |
| PRF-001 | Edição de perfil | **Não testado** | — | Requer sessão autenticada |
| BUS-001 | Buscar profissional (autenticado) | **Não testado** | — | Depende de login |
| RST-001 | Recuperação de palavra-passe | **Inconclusivo** | — | Serviço de e-mail indisponível |

##  Bugs
Ver pasta `documentacao/bugs/`.  
Principal: **CRIT-001 – Fluxo de cadastro bloqueado** (sem e-mail de verificação).

## Evidência:
Ver pastas `documentacao/evidencias/screenshots/cadastro.bloqueado.png`
            `documentacao/evidencias/video`

## Acessibilidade / Desempenho / Responsividade

##  Teste de Desempenho (JMeter)

Objetivo:
Avaliar o tempo de resposta e a estabilidade da página de cadastro no ambiente de staging.

Ferramenta:
Apache JMeter 5.6.3

Cenário de Teste:
- 30 utilizadores simultâneos
- Ramp-up: 10 segundos
- 1 iteração
- Método: GET
- Endpoint: https://paciente-staging.lacreisaude.com.br/cadastro

### Resultados:
| Métrica | Valor | Interpretação |
|---|---|---|
| Tempo médio (Average) | ~280ms | Dentro do esperado para ambiente de staging |
| Erros (Error %) | 0% | Estável sob carga |
| Amostras | 60 | Carga distribuída corretamente |

### Conclusão:
A página de cadastro manteve tempo de resposta estável e baixo (< 500ms) sob carga moderada de 30 utilizadores.  
Comportamento adequado para ambiente de staging.  
Não foram identificados sinais de instabilidade ou degradação de desempenho.

## Evidência:
Ver pasta `documentacao/evidencias/screenshots/teste.de.desempenho.screenshot.png`

##  Teste de Acessibilidade (Lighthouse)

**Página avaliada:** Página de Cadastro  
**URL:** https://paciente-staging.lacreisaude.com.br/saude/paciente/cadastrar  
**Ambiente:** Staging  
**Dispositivo simulado:** Mobile (Chrome DevTools)  
**Ferramenta:** Lighthouse (Chrome DevTools)

### Resultado
- **Acessibilidade:** 96 / 100 

### Pontos Positivos Identificados
- Estrutura semântica consistente.
- Labels associadas corretamente aos campos de formulário.
- Navegação via teclado disponível.
- Boa hierarquia visual dos elementos, favorecendo leitura e fluxo de preenchimento.

### Sugestão de Melhoria
- Alguns elementos utilizam atributos **ARIA redundantes**, potencialmente desnecessários em contextos onde já existe semântica HTML adequada.
- Sugestão: Revisar ARIA roles para evitar sobreposição com tags semânticas padrão.

### Evidência
Ver pasta `documentacao/evidencias/screenshots/acessibilidade-cadastro-lighthouse.png`

##  Teste de Responsividade

### Cenários Avaliados
| Tipo | Resolução Utilizada | Resultado | Observações |
|---|---|---|---|
| Mobile | 412 x 915 (Samsung S20 Ultra) | Adequado | Layout adaptado corretamente; boa legibilidade e alinhamento. |
| **Mobile (landscape)** | **915 × 412** |  **Melhoria** | Ilustração ocupa área excessiva e empurra o formulário. Ver **RESP-001**. |
| Desktop |  ≥ 1440 px (Navegador em tela cheia) |  Adequado | Componentes mantêm proporção; sem sobreposição ou quebras. |


**Evidências** 
Ver pasta `documentacao/evidencias/screenshots/responsividade`

##  Teste Automatizado (Cypress + Cucumber)

O fluxo de **cadastro** foi automatizado considerando o comportamento real do ambiente de staging.  
Como o e-mail de verificação **não é enviado no staging**, o **critério de sucesso adotado** foi:

 **Redirecionamento para a página de Login após submissão do cadastro**

###  Requisitos
- Node.js 18+
- Google Chrome instalado

## Instalar Dependências
cd automacao
npm install

## Executar com interface (modo visual)
npx cypress open

## Selecionar: 
E2E Testing → Chrome → cadastro.feature

## Evidência da Execução

Ver pasta: `automacao\cypress\screenshots\cadastro-sucesso.png`
           `automacao/cypress/screenshots/evidencia-video.md`
           
### Como Clonar
bash
git clone <https://github.com/ThamiresMarina/qalacreisaude>
cd <automacao>

## CI/CD – GitHub Actions

Este projeto possui pipeline configurado para:

Evento Ação
push Executa testes
pull_request Executa testes
Resultado Aparece no separador Actions do GitHub

Workflow: .github/workflows/ci.yml

## Tecnologias
Finalidade	Ferramenta
Automação Web	Cypress + Cucumber
Geração de dados	Alias Gmail
Teste de Performance	Apache JMeter
Acessibilidade	Lighthouse
CI/CD	GitHub Actions

## Autora

Thamires Santos — QA em formação, apaixonada por melhoria contínua e qualidade em produtos digitais.


## Documentação Completa no Notion

A documentação detalhada do processo de testes, incluindo tabela completa, bug report ilustrado e evidências, encontra-se disponível no Notion:

 https://www.notion.so/Execu-o-de-Testes-Manuais-Lacrei-Sa-de-2a2bb9621317803e9be3ed8a0872d2a7
