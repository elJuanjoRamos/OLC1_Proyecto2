class Case  {
    /**
     * @constructor 
     * @param expression expresion del case
     * @param list Lista de instrucciones 
     * @param line Linea de la sentencia 
     * @param column Columna de la sentencia
     */
    constructor(cond, lst, l, c) {
        this.name = "Case";
        this.line = l;
        this.column = c;
        this.condition = cond;
        this.list = lst;
    }
}
exports.Case = Case;
