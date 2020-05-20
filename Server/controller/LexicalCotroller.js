
var tok = require('../model/Token');
class LexicalController {
    
    arrayToken = new Array();
    arrayError = new Array();
    arrayErrorSintactico = new Array();
    
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
    addErrorSintactico(id, des, line, col){
        this.hayError = true;
        this.arrayErrorSintactico.push(new tok(id, des, line, col));
    }
    getArrayErrorLexico(){
        return this.arrayError
    }
    getArrayErrorSintactico(){
        return this.arrayErrorSintactico
    }
    getError(){
        return this.hayError
    }
    clear(){
        this.hayError = false;
        this.arrayError = new Array();
        this.arrayToken = new Array();
        this.arrayErrorSintactico = new Array();
    }    
}


module.exports = LexicalController