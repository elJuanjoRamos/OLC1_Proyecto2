class Expression {
    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param data Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(t, v, l, c) {
        this.name = "Expression";
        this.line = l;
        this.data = v;
        this.type = t;
        this.column = c;
    }
    /**
     * Devuelve el valor inicial e.g. 4
     * @param table Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(table, tree) {
        return this.data;
    }
}
exports.Expression = Expression;
