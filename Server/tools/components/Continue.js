class Continue {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     * @param identifier Columna del break
     */
    constructor(id,  l, c) {
        this.name = "Continue";
        this.identifier = id;
        this.line = l;
        this.column= c;
    }

}
exports.Continue = Continue;
