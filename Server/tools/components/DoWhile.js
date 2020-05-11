/*const Table_1 = require("../Simbols/Table");
const Exception_1 = require("../utils/Exception");
const Type_1 = require("../utils/Type");
const Continue_1 = require("../Expresiones/Continue");
const Break_1 = require("../Expresiones/Break");
*/

class DoWhile {
    /**
     * @constructor 
     * @param List Lista de instrucciones 
     * @param condition Condicion que debe ser tipo boolean
     * @param line Linea de la sentencia 
     * @param column Columna de la sentencia 
     */
    constructor(List, condition,line, column) {
        this.name = "DoWhile";
        this.line = line;
        this.column = column;
        this.condition = condition;
        this.list = List;
    }
}
exports.DoWhile = DoWhile;
