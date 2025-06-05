![image](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue) ![image](https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

# Objetivo

Este repositório é a minha solução para o seguinte desafio proposto: https://github.com/Elevential/desafio-elevential

# como rodar localmente

primeiramente: clone o respositório com o comando: git clone https://github.com/LucasMartelloNogueira/solucao_desafio_elevential.git

Em seguida, abra o projeto

## 1: Requisitos

* Python: 3.12.5 (ou maior)
* Node: v22.14.0 (ou maior)

## 2: baixando dependências

### frontend

    cd frontend
    npm i


### backend

para garantir uma boa configuração do ambiente, utilizei o uv que é um package manager no qual faz tudo que o pip faz e mais algumas coisas. Para instalá-lo, use:

    pip install uv

feito isso, podemos instalar as dependências com os seguintes comandos:

    cd backend
    uv venv
    uv add -r requirements.txt


### Banco de dados

Para voltar o banco de dados com os pokemons originais, precisamos rodar o arquivo: "backend/src/persistence.py". Entretanto, o python possui algumas limitações quanto a imports (para mais informações veja: https://www.youtube.com/watch?v=Mgp6-ZMEcE0&ab_channel=GusCavanaugh). Primeiramente precisamos resolver o problema dos imports com o seguinte comando

    cd backend
    uv pip install -e .

Note que isso faz com o projeto todo vire uma depedência (que pode ser visto com o comando uv pip list), o que resolve o problema de imports. Feito isso, podemos restaurar o banco de dados ao seu estado inicial com os comandos:

    cd backend
    uv run python src/persistence.py


Note que a restauração do banco pode ser feita enquanto os sistemas estão no ar


## 3: Rodando sistemas


### backend

    cd backend
    uv run fastapi dev src/main.py


o api pode ser acessada na url: http://localhost:8000. para ver as docs dos endpoints, acesse http://localhost:8000/docs


### frontend

    cd frontend
    npm run dev

O projeto pode ser encontrado na url: http://localhost:5173

### Disclaimer:

Ao dar ctrl+c no backend para encerrar a API, caso o terminal fique preso e não esteja habilitado para um comando (onde apertar crtl+c várias vezes não faz nada enão libera o terminal), a próxima vez que a API subir, nenhum endpoint receberá uma resposta. Não achei nenhuma solução para este bug ainda, mas reiniciar o PC resolve essa questão

