class Switch  {
    /**
     * @constructor 
     * @param condition Condicion del switch
     * @param caselist Lista de casos
     * @param default Default 
     * @param line Linea de la sentencia 
     * @param column Columna de la sentencia

     **/
    constructor(cond, lst, def, l, c) {
        this.name = "Switch"
        this.line = l;
        this.column = c;
        this.condition = cond;
        this.caselist = lst;
        this.default = def;
    }
}
exports.Switch = Switch;
