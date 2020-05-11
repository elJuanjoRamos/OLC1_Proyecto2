var express = require('express');
var router = express.Router();

var controller = require('../controller/LexicalCotroller');
var lexController = new controller();

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
    console.log("entro aqui");
    var tree = parser.parse(entrada);
    console.log(tree)
    tree.instructions.forEach(element => {
      if (element.name == "Exception") {
        array.push(element.description)
      }
    });

    res.json({ entrada: entrada, consola: array, ast: tree, type : "sintactico" })
  }
});





module.exports = router;

