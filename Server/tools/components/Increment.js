class Increment {
    /**
     * @constructor 
     * @param identifier Identificador 
     * @param operator Operador +
     * @param operator2 Operador +
     * @param line Linea de la sentencia 
     * @param column Columna de la sentencia 
     */
    constructor(id, op1,op2, l, c) {
        this.name = "Increment"
        this.identifier = id;
        this.operator = op1;
        this.operator2 = op2;
        this.line = l;
        this.column = c;
    }
}
exports.Increment = Increment;
