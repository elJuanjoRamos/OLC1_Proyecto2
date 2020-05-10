class CallFunction  {
    /**
     * @constructor 
     * @param identifier expresion del case
     * @param list Lista de parametros 
     * @param line Linea de la sentencia 
     * @param column Columna de la sentencia
     */
    constructor(id, lst, l, c) {
        this.line = l;
        this.column = c;
        this.identifier = id;
        this.list = lst;
    }
    
}
exports.CallFunction = CallFunction;
