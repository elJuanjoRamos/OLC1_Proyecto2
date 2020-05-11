class Assignation {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param id nombre de la variable
     * @param data valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(i, d, l, c) {
        this.name = "Assignation";
        this.id = i;
        this.data = d;
        this.line = l;
        this.column = c;
    }
}
exports.Assignation = Assignation;
