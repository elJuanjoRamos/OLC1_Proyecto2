//const Exception_1 = require("../utils/Exception");

class Identifier {
    /**
     * @constructor 
     * @param id nombre
     * @param line Linea
     * @param column Columna
     */
    constructor(identifier, l, c) {
        this.id = identifier;
        this.line = l;
        this.column = c;
    }
    execute(table, tree) {
        /*let variable;
        variable = table.getVariable(this.identifier);
        if (variable == null) {
            const error = new Exception_1.Exception('Semantico', 'No se ha encontrado la variable ' + this.identifier, this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        this.type = variable.type;
        return variable.value;*/
    }
}
exports.Identifier = Identifier;
