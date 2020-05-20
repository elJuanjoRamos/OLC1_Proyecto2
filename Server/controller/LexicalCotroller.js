
var tok = require('../model/Token');
class LexicalController {
    
    arrayToken = new Array();
    arrayError = new Array();
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
        this.hayError = false;
        this.arrayError = new Array();
        this.arrayToken = new Array();
    }    
}


module.exports = LexicalController