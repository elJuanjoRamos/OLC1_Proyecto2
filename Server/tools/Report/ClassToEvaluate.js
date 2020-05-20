class ClassToEvaluate{
    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo 
     * @param id IDENTIFICADOR DE LA CLASE
     * @param list Lista de instrucciones internas, ifs, fors, variables etc
     * 
     */
    constructor(t, l){
        this.name = t;
        this.list = l;
    }
}

exports.ClassToEvaluate = ClassToEvaluate;
