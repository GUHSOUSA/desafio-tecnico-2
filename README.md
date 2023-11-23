# Desafio tecnico 2
> Api Restful com express.

# Endpoints

createUser:
```sh
 https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/signup
```
loginUser:
```sh
 https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/signin
```
getUser:
createUser:
```sh
 https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/
```


Para testar essa api, siga esses passos.

![](header.png)

## Mac & Linux

CreateUser:

```sh
curl -X POST -H "Content-Type: application/json" -d '{
    "nome": "Nome do Usuário",
    "email": "exemplo@email.com",
    "password": "senha123",
    "telefone": {
        "ddd": "11",
        "numero": "999999999"
    }
}' https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/signup

```

LoginUser:

```sh
curl -X POST -H "Content-Type: application/json" -d '{
    "email": "exemplo@email.com",
    "password": "senha123",
}' https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/signup
```

GetUser:

```sh
curl -X GET -H "Authorization: Bearer SEU_TOKEN_AQUI"  https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/

```

## Windows:

CreateUser:
```sh
Invoke-WebRequest -Uri https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/signup -Method POST -Body @{
    nome="Nome do Usuário";
    email="exemplo@email.com";
    password="senha123";
    telefone=@{ddd="11";numero="999999999"}
} -ContentType "application/json"

```

LoginUser:
```sh
Invoke-WebRequest -Uri https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/signin -Method POST -Body @{
    email="exemplo@email.com";
    password="senha123";
} -ContentType "application/json"

```

GetUser:
```sh
$headers = @{
    "Authorization" = "Bearer SEU_TOKEN_AQUI"
}

Invoke-WebRequest -Uri https://desafio-tecnico-dois-dbdb43a4d93e.herokuapp.com/api/ -Method GET -Headers $headers

``` 

## Para usar na sua maquina

crie um arquivo .env e adicione:

```sh
MONGODB_URI="sua url mongodb"
```

```sh
JWT_SECRET="qualquersenha"
```

## Depois instale os modulos
```sh
npm i
```

## Agora inicie o server

```sh
npm run dev
```
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
