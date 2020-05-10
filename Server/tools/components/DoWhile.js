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
        this.line = line;
        this.column = column;
        this.condition = condition;
        this.List = List;
    }
    execute(table, tree) {
        /*const newtable = new Table_1.Table(table);
        let result;
        do {
            result = this.condition.execute(newtable, tree);
            if (result instanceof Exception_1.Exception) {
                return result;
            }
            if (this.condition.type.type !== Type_1.types.BOOLEAN) {
                const error = new Exception_1.Exception('Semantico', `Se esperaba una expresion booleana para la condicion`, this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.List.length; i++) {
                    const res = this.List[i].execute(newtable, tree);
                    if (res instanceof Continue_1.Continue) {
                        break;
                    }
                    else if (res instanceof Break_1.Break) {
                        return;
                    }
                }
            }
        } while (result);
        return null;*/
    }
}
exports.DoWhile = DoWhile;
