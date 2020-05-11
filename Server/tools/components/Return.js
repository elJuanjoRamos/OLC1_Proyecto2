class Return {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param param Linea del break
     * @param column Columna del break
     * @param identifier Columna del break
     */
    constructor(id, par, l, c) {
        this.name = "Return"
        this.identifier = id;
        this.param = par;
        this.line = l;
        this.column= c;
    }
    execute(table, tree) {
        return this;
    }
}
exports.Return = Return;
