
class ArithmeticExpression {
    /**
     * @constructor 
     * @param left Nodo expresion izquierdo
     * @param right Nodo expresion derecho
     * @param Operator Operador
     * @param line linea de la operacion
     * @param column columna de la operacion
     * @param type tipo de la operacion
     */
    constructor(lft, rgt, op, l, c) {
        this.name = "ArithmeticExpression";
        this.line  = l;
        this.column = c;
        this.left = lft;
        this.right = rgt;
        this.Operator = op;
    }
}
exports.ArithmeticExpression = ArithmeticExpression;
