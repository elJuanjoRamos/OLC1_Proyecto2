
var tok = require('../model/Token');
class LexicalController {
    
    arrayToken = [];
    arrayError = [];
    hayError = false;
    constructor(){
        console.log("Lexical Controller");
    }

    addToken(id, des, line, col){
        this.arrayToken.push(new tok(id, des, line, col));
    }

    addError(id, des, line, col){
        this.hayError = true;
        this.arrayError.push(new tok(id, des, line, col));
    }
    getArrayError(){
        return this.arrayError
    }
    getError(){
        return this.hayError
    }
    clear(){
        this.arrayError = []
        this.arrayToken = []
    }    
}


module.exports = LexicalController