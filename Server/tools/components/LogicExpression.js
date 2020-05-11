
class LogicExpression {
    /**
     * @constructor 
     * @param left Nodo expresion izquierdo
     * @param right Nodo expresion derecho
     * @param operator Operador
     * @param line linea de la operacion
     * @param column columna de la operacion
     */
    constructor(lft, rgt, op, l, c) {
        this.name = "LogicExpression";
        this.line  = l;
        this.column = c;
        this.left = lft;
        this.right = rgt;
        this.operator = op;
    }
}
exports.LogicExpression = LogicExpression;
