class Function {
    /**
     * @constructor Retorna el objeto break creado
     * @param type tipo de la funcion
     * @param id nombre de la funcion
     * @param parameter Parametros de la funcion
     * @param list Columna del break
     * @param column Columna del break
     * @param line del break
     
     */
    constructor(t, i,params , lst,  c, l) {
        this.type = t;
        this.id = i;
        this.list = lst;
        this.column = c;
        this.line = l;
        this.parameter = params;
    }
}
exports.Function = Function;
