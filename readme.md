# como rodar localmente

## 1: baixando dependências

### frontend

    cd frontend
    npm i


### backend

    cd backend
    uv pip install -r requirements.txt


## 2: Rodando sistemas


### backend

    cd backend
    uv run fastapi dev src/main.py


### frontend

    cd frontend
    npm run dev


### Disclaimer:

Ao dar ctrl+c no backend para encerrar a API, caso o terminal fique preso e não esteja habilitado para um comando (onde apertar crtl+c várias vezes não faz nada), a próxima vez que a API subir, nenhum endpoint receberá uma resposta. Não achei nenhuma solução para este bug ainda, mas reiniciar o PC resolve essa questão

