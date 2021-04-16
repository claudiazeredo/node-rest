const mongoose = require("mongoose");

//Produto

/*
	Nome
	Fabricante
	Preço

*/
//Formato de Modelo com o Node
mongoose.model("Produto",{
	nome:{type:String},
	fabricante:{type:String},
	preco:{type:Number}

});