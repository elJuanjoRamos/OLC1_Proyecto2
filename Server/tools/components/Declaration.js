
/**
 * @class Inserta una nueva variable en la tabla de simbolos
 */
class Declaration {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param type Tipo de la variable
     * @param id nombre de la variable
     * @param data valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(t, i, d, l, c) {
        this.name = "Declaration" 
        this.id = i;
        this.data = d;
        this.type = t;
        this.line = l;
        this.column = c;
    }
    execute(table, tree) {
        return null;
    }
}
exports.Declaration = Declaration;
