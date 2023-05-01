const mongoose = require('mongoose');


// criar entidade para fornecer métodos para manipular os dados no banco de dados

const Person = mongoose.model('Person',{
    name: String,
    salary: Number,
    approved: Boolean
})

module.exports = Person; //exporta a entidade para ser usada em outros arquivos