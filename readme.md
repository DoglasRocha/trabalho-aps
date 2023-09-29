# Trabalho de Análise e Projeto de Sistemas

- Olá queridos amigos

  ## Frontend

- Ao acessar o frontend pela primeira vez, navegue até a pasta `./frontend` e digite:

  ```sh
  npm i
  ```

- Para rodar o frontend, acesse a pasta `./frontend` e digite na linha de comando:

  ```sh
  npm run dev
  ```

## Backend

- Estou usando o python na versão 3.11, quando instalarem, prestem atenção para instalar o pip junto

- Ao acessar o backend pela primeira vez, navegue até a pasta `./backend` e digite:

  ```sh
  python3 -m venv .venv # chequem se ele instalou como python3, pode ter sido só
  # python ou python3.11. N muda nada, só o nome que tá associado ao binário

  # No linux:
  . ./venv/bin/activate
  # No windows cmd:
  ./Scripts/activate.bat
  # No windows powershell:
  ./Scripts/Activate.ps1
  ```

- Isso serve pra criar o ambiente virtual do python, para isolar as dependências

- Depois de criarem o ambiente virtual, digitem:

  ```sh
  pip install requirements.txt
  ```

- Daí para rodar, digitem:

  ```sh
  flask run
  ```

- Quando forem rodar o servidor, chequem sempre se estão com o ambiente virtual ativo
