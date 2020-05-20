var express = require('express');
var router = express.Router();

var controller = require('../controller/LexicalCotroller');
var analizerController = require('../controller/AnalizerController');
var lexController = new controller();
var anController = new analizerController();


//PARSER
var parser = require('../tools/grammar.js');
//SCANNER
var lexer = require('../tools/myLexer');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    entrada: '',
    consola: [],
    errores: []
  });
})
router.get('/lexerror', (req, res) => {
  res.json(lexController.getArrayError())
})
router.get('/sinterror', (req, res) => {
  res.json(lexController.getArrayError())
})

router.post('/analizar', function (req, res, next) {
  
  const { entrada, consola } = req.body;
  


  var array = new Array();
  lexController.clear();


  lexer.setInput(entrada);
  while (!lexer.done) {
    token = lexer.lex();
    colum = lexer.yylloc.first_column;
    line = lexer.yylloc.first_line;
    if(token === "LEXICAL_ERROR"){
      lexController.addError(lexer.yytext, 'LEXICAL_ERROR', line, colum);
      array.push("ERROR LEXICO: Simbolo desconocido, " + lexer.yytext + " Linea:" + line + ", Columna:" + colum+"\n");
    } else {
      lexController.addToken(lexer.yytext, token, line, colum);
    }
  }

  if (lexController.getError()) {
    res.json({ entrada: entrada, consola: array, ast: { "name": "No tree", "list": [] }, type : "lexico" })
  } else {
    
    //HACE EL PARSER
    var tree = parser.parse(entrada);
    //console.log(tree.instructions[0])
    
    
    //Se la lista para evaluar las excepciones
    anController.armarExcepciones(tree.instructions[0].list);


    //SE HACE UN FOREACH AL ARRAY QUE RETORNA EL CONTROLADOR QUE BUSCO 
    //LOS ERRORES EN LAS INSTRUCCIONES ANIDADAS
    anController.getArray().forEach(element => {
      lexController.addError(element.description);
      array.push(element);
    });
    res.json({ entrada: entrada, consola: array, ast: tree.instructions[0], type : "sintactico" })
  }
});


router.post('/copia', function(req, res, next) {


  const { entrada, copia } = req.body;

  anController.clear();
  var tree = parser.parse(entrada);
  
  var treecopy = parser.parse(copia);
  


  //console.log(anController.compararClases(tree.instructions[0], treecopy.instructions[0]))

  var claseCopia = anController.compararClases(tree.instructions[0], treecopy.instructions[0]);
  var funcionesCopia = anController.compararFunciones(tree.instructions[0], treecopy.instructions[0], claseCopia.EsCopia)
  var metodosCopia = anController.compararMetodos(tree.instructions[0], treecopy.instructions[0], claseCopia.EsCopia);
  var variablesMetodoCopia = anController.getVariables(metodosCopia);
  var variablesFuncionCopia = anController.getVariables(funcionesCopia)


  res.json({ claseCopia: claseCopia, funcCopia: funcionesCopia, metCopia: metodosCopia, varMtCopia : variablesMetodoCopia, varFuCopia: variablesFuncionCopia })

});




module.exports = router;

