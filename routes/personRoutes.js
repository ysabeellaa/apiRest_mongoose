const router = require('express').Router() //importa o express e usa o método Router() para criar uma instância de roteamento
const Person = require('../modules/Person') //importa a entidade Person para ser usada no arquivo index.js


//criação de dados
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body //desestruturação do objeto
    const person = { name, salary, approved } //cria uma nova pessoa com os dados recebidos
    
    if (!name){
        res.status(422).json({error: "Nome é obrigatório!"}) 
        return
    }
    try{
        //criando dados
        await Person.create(person)
        res.status(201).json({message: "Pessoa criada com sucesso!"}) //envia respostata com status de sucesso 201 e também um JSOn com a mensagem de sucesso
    } catch (error){
        res.status(500).json({error: error}) //envia respostata com status de erro 500 e também um JSOn com a mensagem de erro
    }

})

//leitura de dados
router.get('/', async (req, res) => {
    try{
        const people = await Person.find() //busca todos os dados da entidade Person (garante que todos os dados da entidade venham)
        res.status(200).json(people) //envia respostata com status de sucesso 200 e também um JSOn com os dados
    } catch (error){
        res.status(500).json({error: error}) //envia respostata com status de erro 500 e também um JSOn com a mensagem de erro
    }
})

router.get('/:id', async (req,res) =>{
    //extrair o dado na requisição pela url= req.params
    const id = req.params.id
    try{
        const person = await Person.findOne({_id: id}) 

        if(!person){
            res.status(422).json({error: "Pessoa não encontrada!"}) 
            return
        }

        res.status(200).json(person) 
    } catch (error){
        res.status(500).json({error: error}) //envia respostata com status de erro 500 e também um JSOn com a mensagem de erro
    }
})


//atualização de dados (put:objeto completo; patch: alguns campos apenas)
router.patch("/:id", async (req, res) => {
    //ul vir com o id do usuário e dados vem com o body
    const id = req.params.id
    const { name, salary, approved } = req.body 
    const person = { name, salary, approved } 

    try{
        const updatePerson = await Person.updateOne({_id:id}, person)
        if(updatePerson.matchedCount === 0){
            res.status(422).json({error: "Pessoa não encontrada!"})
            return 
        }

        res.status(200).json(person) 
    }catch{
        res.status(500).json({error: error}) //envia respostata com status de erro 500 e também um JSOn com a mensagem de erro
    }

})

//deletar dados

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({message: "Pessoa não encontrada!"})
            return 
        }
        await Person.deleteOne({_id: id})
        res.status(200).json({message: "Pessoa deletada com sucesso!"})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router //exporta o módulo para ser usado em outros arquivos