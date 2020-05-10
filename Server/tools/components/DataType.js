class DataType{
    type;

    /**
     * 
     * @constructor Crea un nuevo tipo con el tipo primitivo 
     * @param type Tipo seleccionado para la variable
     * 
     */
    constructor(t){
        this.type = t;
    }
    toString(){
        if(this.type === 'boolean'){
            return 'boolean';
        }else if(this.type === 'int'){
            return 'int';
        }else if(this.type === 'string'){
            return 'string';
        }
        else if(this.type === 'char'){
            return 'char';
        }
        else if(this.type === 'double'){
            return 'double';
        }
    }
}

exports.DataType = DataType;
