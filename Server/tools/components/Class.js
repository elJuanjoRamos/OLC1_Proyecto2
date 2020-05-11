class Class{
    id;
    list;
    importList;
    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo 
     * @param id IDENTIFICADOR DE LA CLASE
     * @param list Lista de instrucciones internas, ifs, fors, variables etc
     * 
     */
    constructor(t, l, il){
        this.id = t;
        this.list = l;
        this.importList = il;
    }
}

exports.Class = Class;
