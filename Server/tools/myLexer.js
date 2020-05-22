var fs = require("fs");
var JisonLex = require('jison-lex');

// or load from a file
var symbols = fs.readFileSync('./tools/lexer.jison', 'utf8');

// generate source

// create a parser in memory
var lexer = new JisonLex(symbols);


module.exports = lexer;