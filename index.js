
require('dotenv').config() //importa o módulo dotenv para ler as variáveis de ambiente do arquivo .env

const personRoutes = require('./routes/personRoutes')
const mongoose = require('mongoose');
const express = require('express'); //procura o modulo e importa a dependencia
const app = express(); //executa a função express

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

app.use(express.json()) //consegue enviar e receber respostas em json

//ler JSON (usar midwares: recursos requisitadoes entre requisições e respostasz)
//criar middlewares (aap.use) inicia configuração de leitura de JSOn
app.use(
    express.urlencoded({
        extended: true
    })
)



app.use('/person', personRoutes) //usa o módulo personRoutes para criar as rotas da API (middleware)

//criação de rota (endpoint inicial) para acessar através do imsonia. Possibilidade para o express ler tudo que tem na requisição e acesso a resposta também
app.get('/', function (req, res) {
    res.json({ message: 'Oi, tudo bem?' })

})

//estabelecer a conexão do servidor Node.js com o banco de dados MongoDB utilizando o Mongoose
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.iilm1ib.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(3000) //disponibiliza as informações do express  para serem lidas na porta 3000
        console.log("Conectado ao mongoDb com sucesso!")
    })
    .catch((err) => {
        console.log(err)
    })

