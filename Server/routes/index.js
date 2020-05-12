var express = require('express');
var router = express.Router();

var controller = require('../controller/LexicalCotroller');
var analizerController = require('../controller/AnalizerController');

var lexController = new controller();
var anController = new analizerController();
const Table_1 = require("../tools/components/Table");

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


router.post('/analizar', function (req, res, next) {
  
  const { entrada, consola } = req.body;
  lexController.clear();
  anController.clear();
  var array = [];

  lexer.setInput(entrada);
  while (!lexer.done) {
    token = lexer.lex();
    colum = lexer.yylloc.first_column;
    line = lexer.yylloc.first_line;
    if(token === "LEXICAL_ERROR"){
      lexController.addError(lexer.yytext, 'LEXICAL_ERROR', line, colum);
      array.push("ERROR LEXICO: Simbolo desconocido, " + lexer.yytext + " Linea:" + line + ", Columna:" + colum);
    } else {
      lexController.addToken(lexer.yytext, token, line, colum);
    }
  }

  if (lexController.getError()) {
    res.json({ entrada: entrada, consola: array, ast: { "instructions": [{ "name": "No Tree" }] }, type : "lexico" })
  } else {
    
    //HACE EL PARSER
    var tree = parser.parse(entrada);
    
    console.log(tree.instructions[0])


    //HAGO UN FOREACH EN LAS ISTRUCCIONES PARA VER SI HAY ALGUN ERROR
    tree.instructions[0].list.forEach(element => {
        if(element.name == "Exception"){
          //SE AGREGA EL ERROR AL ARRAY
          array.push(element.description)
        } else {
          

          //SI EN LAS INSTRUCCIONES EXISTEN INSTRUCCIONES ANIDADAS 
          // SE ENVIA A UN METODO RECURSIVO PARA BUSCAR ERRORESS
          if(element.name == "For"|| element.name == "Switch" || element.name == "Case" || element.name == "Do"
                 || element.name == "While"  || element.name == "If"|| element.name == "Else"){
                                    
                  if(element.name == "If"){
                      anController.armarExcepciones(element.list)
                      anController.armarExcepciones(element.ElseList);
                  } else {
                      anController.armarExcepciones(element.list) 
                  }
            }
        }
    });

    //SE HACE UN FOREACH AL ARRAY QUE RETORNA EL CONTROLADOR QUE BUSCO 
    //LOS ERRORES EN LAS INSTRUCCIONES ANIDADAS
    anController.getArray().forEach(element => {
        array.push(element);
    });

    res.json({ entrada: entrada, consola: array, ast: tree, type : "sintactico" })
  }
});





module.exports = router;

