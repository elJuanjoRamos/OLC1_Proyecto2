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
        this.line = l;
        this.column = c;
        this.condition = cond;
        this.caselist = lst;
        this.default = def;
    }
    execute(table, tree) {
        /*const newtable = new Table_1.Table(table);
        let result;
        result = this.condition.execute(newtable, tree);
        if (result instanceof Exception_1.Exception) {
            return result;
        }
        if (this.condition.type.type !== Type_1.types.BOOLEAN) {
            const error = new Exception_1.Exception('Semantico', `Se esperaba una expresion booleana para la condicion`, this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
        if (result) {
            for (let i = 0; i < this.IfList.length; i++) {
                const res = this.IfList[i].execute(newtable, tree);
                if (res instanceof Continue_1.Continue || res instanceof Break_1.Break) {
                    return res;
                }
            }
        }
        else {
            for (let i = 0; i < this.ElseList.length; i++) {
                const res = this.ElseList[i].execute(newtable, tree);
                if (res instanceof Continue_1.Continue || res instanceof Break_1.Break) {
                    return res;
                }
            }
        }
        return null;*/
    }
}
exports.Switch = Switch;
