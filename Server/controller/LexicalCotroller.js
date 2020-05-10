
var tok = require('../model/Token');
class LexicalController {
    
    arrayToken = [];
    arrayError = [];


    constructor(){
        console.log("Lexical Controller");
    }

    addToken(id, des, line, col){
        this.arrayToken.push(new tok(id, des, line, col));
    }

    addError(id, des, line, col){
        this.arrayError.push(new tok(id, des, line, col));
    }

    getError(){
        if(this.arrayError.length >= 1){
            return true;
        }
        return false;
    }

    hello(){
        console.log("hola");
    }
    
}


module.exports = LexicalController