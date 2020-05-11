class If  {
    /**
     * @constructor Crea el nodo instruccion para la sentencia IF
     * @param condition Condicion que debe ser tipo boolean
     * @param list Lista de instrucciones a ejecutar en caso la condicion sea verdadera
     * @param ElseList Lista de instrucciones a ejecutar en caso la condicion sea falsa
     * @param line Linea de la sentencia if
     * @param column Columna de la sentencia if
     * @param name
     *      */
    constructor(cond, lst, el, l, c) {
        this.name = "If"
        this.line = l;
        this.column = c;
        this.condition = cond;
        this.list = lst;
        this.ElseList = el;
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
exports.If = If;
