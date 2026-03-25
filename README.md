# Shipay challenge APP + Asawers

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/WLCPereira/shipay-react-app.git
cd shipay-react-app
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Como executar a aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse a aplicação em `http://localhost:3000` no seu navegador.

## 🧪 Como executar os testes

Para rodar todos os testes:

```bash
npm test
```

Para rodar os testes em modo interativo (para desenvolvimento):

```bash
npm test -- --watch
```

Para rodar apenas um arquivo de teste específico:

```bash
npm test App.test.tsx
```

Para gerar um relatório de cobertura de testes:

```bash
npm test -- --coverage
```

## 🔍 Testes disponíveis

- **App.test.tsx**: Testes da funcionalidade principal (busca, filtros e carregamento de métodos de pagamento)
- **stringUtils.test.ts**: Testes das funções utilitárias de strings

## 🏗️ Build para produção

Para compilar a aplicação para produção:

```bash
npm run build
```

Os arquivos compilados estarão no diretório `dist/`.

## 📦 Outras comandos úteis

- **Lint**: Verificar código com ESLint
  ```bash
  npm run lint
  ```

- **Preview**: Visualizar a build de produção localmente
  ```bash
  npm run preview
  ```

## 📁 Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── constants/      # Constantes da aplicação
  ├── data/          # Arquivos de dados (JSON)
  ├── types/         # Tipos TypeScript
  ├── utils/         # Funções utilitárias
  ├── App.tsx        # Componente principal
  └── main.tsx       # Entrada da aplicação
test/
  ├── App.test.tsx              # Testes do App principal
  ├── utils/stringUtils.test.ts # Testes das utilidades
  └── setupTests.ts             # Configuração dos testes
```

## 🎯 Funcionalidades

- Listar métodos de pagamento
- Buscar e filtrar métodos de pagamento
- Interface responsiva e amigável


## 🧩 Desafio

As respostas para os desafios propostos estão disponíveis no arquivo **Challenge.md**. Recomendo a leitura para entender os pontos de melhoria e as soluções sugeridas para cada desafio.