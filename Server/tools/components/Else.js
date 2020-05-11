class Else  {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param list Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     * @param name
     *      */
    constructor(lst, l, c) {
        this.name = "Else"
        this.line = l;
        this.column = c;
        this.list = lst;
    }
}
exports.Else = Else;
