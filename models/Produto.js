const mongoose = require("mongoose");

//Produto

/*
	Nome
	Fabricante
	Pre�o

*/
//Formato de Modelo com o Node
mongoose.model("Produto",{
	nome:{type:String},
	fabricante:{type:String},
	preco:{type:Number}

});