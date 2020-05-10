class Assignation {
    /**
     * @constructor Crea el nodo instruccion para la sentencia Declaracion
     * @param id nombre de la variable
     * @param data valor de la variable
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     */
    constructor(i, d, l, c) {
        this.id = i;
        this.data = d;
        this.line = l;
        this.column = c;
    }
    execute(table, tree) {
       /* const result = this.value.execute(table, tree);
        if (result instanceof Exception_1.Exception) {
            return result;
        }
        if (this.type.type != this.value.type.type) {
            const error = new Exception_1.Exception('Semantico', `No se puede declarar la variable porque los tipos no coinciden.`, this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        let simbol;
        simbol = new Simbol_1.Simbol(this.type, this.identifier, result);
        const res = table.setVariable(simbol);
        if (res != null) {
            const error = new Exception_1.Exception('Semantico', res, this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
        }*/
        return null;
    }
}
exports.Assignation = Assignation;
