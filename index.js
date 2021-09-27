//servidor 
var express = require("express")
var app = express()

//config database com acesso ao mongoDBAtlas
var mongoose = require('mongoose')
var conexao = ()=>{
    var caminho = mongoose.connect('mongodb+srv://awesome:iago2005@cluster0.vl6oz.mongodb.net/mongoatlas?retryWrites=true&w=majority')
}

var schema = mongoose.Schema 
var depoimentos = new schema({
    nome:String,
    cargo:String,
    mensagem:String
})
var documentos = mongoose.model('depoimentos', depoimentos)
//fim das configurações do database

var porta = process.env.PORT || 3030

// configurações 

app.set("view engine",'ejs')
app.use(express.static('./'))

//rota para abrir o arquivo index.ejs
app.get('/',(req,res)=>{
    conexao()
    documentos.find().limit(3).sort({'_id':-1})
    .then((documentos)=>{
        console.log(documentos)
        res.render('index',{documentos})

    })
    
})

//ligar o servidor 
app.listen(porta)
  