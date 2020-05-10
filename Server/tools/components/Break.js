class Break {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     * @param identifier Columna del break
     */
    constructor(id, l, c) {
        this.identifier = id;
        this.line = l;
        this.column= c;
    }
    execute(table, tree) {
        return this;
    }
}
exports.Break = Break;
