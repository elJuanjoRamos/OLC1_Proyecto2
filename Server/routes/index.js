var express = require('express');
var router = express.Router();

var controller = require('../controller/LexicalCotroller');






const Table_1 = require("../tools/components/Table");

//PARSER
var parser = require('../tools/grammar.js');
//SCANNER
var lexico = require('../tools/myLexer');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    entrada: '',
    consola: [],
    errores: []
  });
})
router.get('/lexerror', (req, res) => {
  res.render('index', {
    entrada: '',
    consola: [],
    errores: []
  });
})


router.post('/analizar', /*services.verificar,*/ function (req, res, next) {

  const { entrada, consola } = req.body;
  console.log(req.body)
  

  var lexController = new controller();

  col = 0;
  line = 1;
  var array = [];
  for (let index = 0; index < entrada.length; index++) {
    const element = entrada[index];

    if (element == "\n") {
      line++;
      col = 0;
    }
    lexico.setInput(element);

    if (lexico.lex() != "LEXICAL_ERROR") {
      lexController.addToken(element, lexico.lex(), line, col);
    } else {
      lexController.addError(element, 'LEXICAL_ERROR', line, col);
      array.push("ERROR LEXICO: Simbolo desconocido, " + element + " Linea:" + line + ", Columna:" + col);
    }
    col++;
  }


  if (!controller.getError) {
    var tree = parser.parse(entrada);
    console.log(tree)
    res.json({ entrada: entrada, consola :  this.array, ast: tree })
    
  } else {
    console.log("error")
    res.json({ entrada : entrada, consola: this.array, ast : null })
  }
});





module.exports = router;
