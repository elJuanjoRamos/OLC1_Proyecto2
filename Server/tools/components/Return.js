class Return {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param list lista de retorno
     * @param column Columna del break
     * @param identifier Columna del break
     */
    constructor(id, par, l, c) {
        this.name = "Return"
        this.identifier = id;
        this.list = par;
        this.line = l;
        this.column= c;
    }
    
}
exports.Return = Return;
