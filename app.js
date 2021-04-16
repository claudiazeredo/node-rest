/*
	Seguindo o tutorial de como fazer uma aplicação com NodeJS, MongoDB, Postman e Rest

	https://www.youtube.com/playlist?list=PLt3tq0MBSMpkuhBKQcr2qHTwXz6WJ3Ncv


*/

const app =  require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // ajuda a cadastrar os dados do produto


//Configurar o Body parser
app.use(bodyParser.json());

//Configuração do MongoDB
mongoose.connect("mongodb+srv://root:q1w2e3@produtos.jqsaz.mongodb.net/test",{
	useNewurlParser: true
},() => {
	console.log("Banco de dados conectado!");
});

// Carregando model de produto
require("./models/Produto");

const Produto = mongoose.model("Produto");


// Endpoints

	//Cadastrar Produtos
	app.post("/produto",(req,res) => {
		
		if(req.body.nome != undefined && req.body.fabricante != undefined && req.body.preco != undefined){
			var produto =  new Produto({
				nome:		req.body.nome,
				fabricante: req.body.fabricante,
				preco:		req.body.preco
			});


			//retornar sempre os codigos de status http
			produto.save().then(() => {
				//dado salvo com sucesso
				res.statusCode = 201;
				res.send("Qualquer dado");
			})
			.catch((erro) => {
			
				//Aconteceu alguma falha
				if(erro){
					throw erro;
				}
				res.statusCode = 417;
				res.send();

			})
		}else{
			res.statusCode = 406;
			res.send();
		}
	});		

	//Listar Produtos
	app.get("/produtos",(req,res) => {
	
		Produto.find({}, (erro, dados) => {
			if(erro){
				res.statusCode = 417;
				res.send();
			}

			res.json(dados);
		});
		
	})
	
	//Listar Produtos por id
	app.get("/produto/:id", (req,res) =>{
		
		Produto.findById(req.params.id).then((produto) => {
			res.statusCode = 200;
			res.json(produto);
		
		}).catch((erro) =>{
			if(erro){
				res.statusCode = 417;
				res.send();
				throw erro;
			}
		
		});
	});

	//Deletar produto
	app.delete("/produto/:id",(req,res) => {
	
		Produto.findByIdAndRemove(req.params.id).then((produto) => {
			console.log(produto);
			if(produto){
				res.statusCode = 200;
				res.send();
			}else{
				res.statusCode = 404;
				res.send();
			}
		}).catch((erro) => {
		
			if(erro){
				res.statusCode = 417;
				throw erro;
			}
		});
	});

app.listen(8080,() =>{
	console.log("API rodando...");
})