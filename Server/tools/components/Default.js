class Default  {
    /**
     * @constructor 
     * @param list Lista de instrucciones 
     * @param line Linea de la sentencia 
     * @param column Columna de la sentencia
     */
    constructor(lst, l, c) {
        this.name = "Default";
        this.line = l;
        this.column = c;
        this.list = lst;
    }
}
exports.Default = Default;
