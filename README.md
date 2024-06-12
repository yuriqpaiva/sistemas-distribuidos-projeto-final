# Como rodar esse projeto?

Crie um arquivo .env na raiz do projeto com as seguintes variáveis (valores de exemplo):
``` 
DATABASE_URL="mysql://root:docker@localhost:3306/db-name"
JWT_SECRET="secret_key_value"
```

Instale as dependências
```
npm install
```

Com o Banco rodando, inicie a estrutura do Banco de Dados:
```
npm run db:push
```

Inicie o servidor
```
npm run dev
```