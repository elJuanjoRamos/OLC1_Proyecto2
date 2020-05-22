class If  {
    /**
     * @constructor 
     * @param condition Condicion que debe ser tipo boolean
     * @param list Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param ElseList Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     * @param name
     *      */
    constructor(cond, lst, el, l, c) {
        this.name = "If"
        this.line = l;
        this.column = c;
        this.condition = cond;
        this.list = lst;
        this.ElseList = el;
    }
    
}
exports.If = If;
