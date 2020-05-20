class AnalizerController {
    

    arrayErrores = new Array();



    /*Reporte de copia*/
    esCopia = "";
    methodsClass1 = new Array();
    functionClass1 = new Array();
    functionClass2 = new Array();
    methodsClass2 = new Array();


    /*reporte de funciones copia */
    methods = new Array();
    function = new Array();
    functioncopy = new Array();
    methodscopy = new Array();



    /* Reporte de variables copia */
    variables = new Array();
    variablescopy = new Array();



    constructor(){
        console.log("Analizer Controller");
    }


    armarExcepciones(list){
        if(list != undefined && list != []){
            
            //Recorro y guardo los errores
            list.forEach(e => {
                if(e.name == "Exception"){
                    this.arrayErrores.push(e.description)
                } else {
                    if(e.name == "For"|| e.name == "Switch" || e.name == "Case" 
                    || e.name == "DoWhile" || e.name == "While"|| e.name == "Function" || e.name == "Else"){
                        this.armarExcepciones(e.list);
                    }

                    if(e.name== "If"){
                        this.armarExcepciones(e.list);
                        this.armarExcepciones(e.ElseList)
                    }
                }
            }); 
        }
    }

    getArray(){
        return this.arrayErrores;
    }
    clear(){
        this.arrayErrores = new Array();
        this.methodsClass1 = new Array();
        this.functionClass1 = new Array();
        this.functionClass2 = new Array();
        this.methodsClass2 = new Array();
        this.function = new Array();
        this.methods = new Array();
        this.methodscopy = new Array();
        this.functioncopy = new Array();
        this.variables = new Array();
        this.variablescopy = new Array();
    }




    compararClases(tree, treeCopy){

        /* VERIFICACION DE CLASES REPETIDAS*/

        //Verifico si el nombre es igual
        if(tree.id == treeCopy.id){

            //Busco los metodos y funciones de la clase 1
            this.getMethodsAndFunctions(tree.list, this.methodsClass1, this.functionClass1);

            //Busco los metodos y funciones de la clase 2
            this.getMethodsAndFunctions(treeCopy.list, this.methodsClass2, this.functionClass2);


            //verificar si la cantidad de elementos es la misma
            if(this.functionClass1.length == this.functionClass2.length 
                && this.methodsClass1.length == this.methodsClass2.length){

                    //Se ordenan los arreglos
                    this.functionClass1.sort();
                    this.functionClass2.sort();

                    this.methodsClass1.sort();
                    this.methodsClass2.sort();

                    //verificar si las funciones se llaman igual
                    var contadorFunciones = 0;
                    for (let index = 0; index < this.functionClass1.length; index++) {
                        const element = this.functionClass1[index];
                        const element2 = this.functionClass2[index]
                        if(element == element2){
                            contadorFunciones++;
                        }
                    }
                    //verificar si los metodos se llaman igual
                    var contadorMetodos = 0;
                    for (let index = 0; index < this.methodsClass1.length; index++) {
                        const element = this.methodsClass1[index];
                        const element2 = this.methodsClass2[index]
                        if(element == element2){
                            contadorMetodos++;
                        }
                    }


                    //Verifico si la cantidad de funciones y metodos evaluados son los mismos
                    if( (contadorFunciones != this.functionClass1.length)  || (contadorMetodos != this.methodsClass1.length)  ){

                        return this.resultadoClaseCopia(tree.id, treeCopy.id, this.methodsClass1.length, 
                            this.methodsClass2.length, this.functionClass1.length, 
                            this.functionClass2.length, "False", "Las funciones o metodos no se llaman igual");
                    } else {
                        return this.resultadoClaseCopia(tree.id, treeCopy.id, this.methodsClass1.length, 
                            this.methodsClass2.length, this.functionClass1.length, 
                            this.functionClass2.length, "True", "Las clases son copia");
                    }
                    
            //Si no lo es, no es copia        
            } else {
                return this.resultadoClaseCopia(tree.id, treeCopy.id, this.methodsClass1.length, 
                    this.methodsClass2.length, this.functionClass1.length, 
                    this.functionClass2.length, "False", "No tiene la misma cantidad de metodos o funciones");
            }

        //Si no lo es, no es copia
        } else {
            return this.resultadoClaseCopia(tree.id, treeCopy.id, "Indefinido", 
            "Indefinido", "Indefinido", "Indefinido", "False", "Las clases no tienen el mismo nombre")
        }

    }


    getMethodsAndFunctions(list, arrayMethod, arrayFunction){
        //Iterar en las instrucciones de la clase 
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            //Bucar los metodos
            if(element.name == "Method"){
                arrayMethod.push(element.id);
            } 
            //buscar las funciones
            if(element.name == "Function"){
                arrayFunction.push(element.id);
            }                
        }
    }

    resultadoClaseCopia(id1, id2, cantMetod, cantMetod2, cantFunc, cantFunc2, esCopy, des){
        var data = {
            "Clase1" : id1,
            "Clase2" : id2,
            "MetodosClase1" : cantMetod,
            "MetodosClase2" : cantMetod2,
            "FuncionesClase1" : cantFunc,
            "FuncionesClase2" : cantFunc2,
            "EsCopia" : esCopy,
            "Descripcion" : des            
        };
        return data;
    }










    /* SECCION FUNCIONES */

    compararFunciones(tree, treeCopy, result){
        //Verifica que la clase sea copia
        if(result == "True"){

            //Busco los metodos y funciones de la clase 1
            this.getFunctions(tree.list, this.function);

            //Busco los metodos y funciones de la clase 2
            this.getFunctions(treeCopy.list, this.functioncopy);

            
            //Se crea un array que va a almacenar las funciones copia
            var arrayFunctionCopy = new Array();

            //Se itera sobre las funciones de la clase principal
            this.function.forEach(func => {
                
                //Se itera sobre las funciones de la clase copia
                this.functioncopy.forEach(func2 => {
                    
                    //Se verifica si es del mismo tipo
                    if(func.type == func2.type){

                        //Se verifica el nombre
                        //Se verifica que traigan la misma cantidad de parametros
                        if((func.params.length == func2.params.length) && func2.params.length > 0 && func.params.length>0){
                            var arrayParametros = new Array();
                             //se hace un for sobre los parametros para verificar que traigan el mismo tipo y orden
                            for (let i = 0; i < func.params.length; i++) {
                                //elemento en la primera funcion
                                const element = func.params[i];
                                //elemento en la segunda funcion;
                                const element2 = func2.params[i];

                                //Se verifica el tipo de los parametros, int, string, etc
                                if(element.type.type == element2.type.type){
                                    arrayParametros.push(element);
                                }

                            }

                            //Se verifica que la cantidad de parametros que
                            //coincidan, sean iguales a la cantidad total

                            if(arrayParametros.length == func.params.length){

                                //Si es igual, significa que traen los mismos tipos de parametros en el mismo orden
                                //Se verifica el mismo tipo de retorno de la funcion

                                //Si cumple, entonces la funcion es copia
                                if( func.return == func2.return){
                                    var e = {
                                        "Name1" : func.id,
                                        "Name2" : func2.id,
                                        "Class1" : tree.id,
                                        "Class2" : treeCopy.id,
                                        "Type" : func.type,
                                        "Return" : func.return,
                                        "ParamsF1": func.params,
                                        "ParamsF2" : func2.params,
                                        "VariablesF1" : func.variables,
                                        "VariablesF2" : func.variables
                                    }
                                    arrayFunctionCopy.push(e);

                                }
                            }
                        }

                    }
                })

            });
            return arrayFunctionCopy;
        } else {
            return [];
        } 
        

    }


    compararMetodos(tree, treeCopy, result){
        if(result == "True"){

            
            //Busco los metodos y funciones de la clase 1
            this.getMethods(tree.list, this.methods);

            //Busco los metodos y funciones de la clase 2
            this.getMethods(treeCopy.list, this.methodscopy);

            
            //Se crea un array que va a almacenar las funciones copia
            var arrayFunctionCopy = new Array();

            //Se itera sobre las funciones de la clase principal
            this.methods.forEach(func => {
                
                //Se itera sobre las funciones de la clase copia
                this.methodscopy.forEach(func2 => {
                    
                    
                        //Se verifica que traigan la misma cantidad de parametros
                        if((func.params.length == func2.params.length) && func2.params.length > 0 && func.params.length>0){
                            var arrayParametros = new Array();
                             //se hace un for sobre los parametros para verificar que traigan el mismo tipo y orden
                            for (let i = 0; i < func.params.length; i++) {
                                //elemento en la primera funcion
                                const element = func.params[i];
                                //elemento en la segunda funcion;
                                const element2 = func2.params[i];

                                //Se verifica el tipo de los parametros, int, string, etc
                                if(element.type.type == element2.type.type){
                                    arrayParametros.push(element);
                                }

                            }

                            //Se verifica que la cantidad de parametros que
                            //coincidan, sean iguales a la cantidad total

                            if(arrayParametros.length == func.params.length){

                                //Si es igual, significa que traen los mismos tipos de parametros en el mismo orden
                                var e = {
                                    "Name1" : func.id,
                                    "Name2" : func2.id,
                                    "Class1" : tree.id,
                                    "Class2" : treeCopy.id,
                                    "Type" : "Void",
                                    "ParamsF1": func.params,
                                    "ParamsF2" : func2.params,
                                    "VariablesF1" : func.variables,
                                    "VariablesF2" : func2.variables
                                }
                                arrayFunctionCopy.push(e);
                            }
                        }

                    
                })

            });
            return arrayFunctionCopy;

        }else {
            return [];
        }
    }

    getFunctions(list, arrayFunction){
        //Iterar en las instrucciones de la clase 
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            //buscar las funciones
            if(element.name == "Function"){
                
                //Se itera sobre las instrucciones buscando las variables
                var arrayVariable = new Array();
                element.list.forEach(v => {
                    if(v.name == "Declaration"){
                        var e = {
                            "type": v.type.type,
                            "id" : v.id
                        }
                        arrayVariable.push(e);
                    }
                });

                
                var el = {
                    "type" : element.type.type,
                    "id" : element.id,
                    "params" : element.parameter,
                    "return" : element.return.name,
                    "variables" : arrayVariable
                }
                arrayFunction.push(el);
            }                
        }
    }

    getMethods(list, arrayMethod){
        //Iterar en las instrucciones de la clase 
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            //Bucar los metodos
            if(element.name == "Method"){

                //Se itera sobre las instrucciones buscando las variables
                var arrayVariable = new Array();
                element.list.forEach(v => {
                    if(v.name == "Declaration"){
                        var e = {
                            "type": v.type.type,
                            "id" : v.id
                        }
                        arrayVariable.push(e);
                    }
                });

                var el = {
                    "type" : "void",
                    "id" : element.id,
                    "params" : element.parameter,
                    "variables" : arrayVariable
                }
                arrayMethod.push(el)
            }                
        }
    }




    //Recibe el listado de los metodos o funciones copia
    getVariables(arrayMetodosFuncionesCopia){

        var arrayVariablesCopia = new Array();
        for (let i = 0; i < arrayMetodosFuncionesCopia.length; i++) {
            
            //Elemento json dentro del arreglo, este json trae los metodos o funciones que son repetidos
            //viene en pares
            const element = arrayMetodosFuncionesCopia[i];
            //
            var variablesFuncionOriginal = element.VariablesF1;
            var variablesFuncionCopia = element.VariablesF2;
            //Se itera sobre el array mas peque;o
            if(variablesFuncionOriginal.length <= variablesFuncionCopia.length){
                
                for (let j = 0; j < variablesFuncionOriginal.length; j++) {
                    const v = variablesFuncionOriginal[j];
                    
                    for (let k = 0; k < variablesFuncionCopia.length; k++) {
                        const v2 = variablesFuncionCopia[k];
                        
                        if(v.type == v2.type){ 
                            var e = {
                                "original" : v.id,
                                "copia" : v2.id,
                                "type" : v.type,
                                "Name" : element.Name2
                            }
                            arrayVariablesCopia.push(e);
                            variablesFuncionCopia.splice(k, 1);
                            break;
                        }
                    }  
                }
            } else {
                for (let j = 0; j < variablesFuncionCopia.length; j++) {
                    const v = variablesFuncionCopia[j];
                    
                    for (let k = 0; k < variablesFuncionOriginal.length; k++) {
                        const v2 = variablesFuncionOriginal[k];
                        
                        if(v.type == v2.type){
                            var e = {
                                "original" : v.id,
                                "copia" : v2.id,
                                "type" : v.type,
                                "Name" : element.Name1
                            }
                            arrayVariablesCopia.push(e);
                            variablesFuncionOriginal.splice(k, 1);
                            break;
                        }
                    }  
                }
            }

        }
        return arrayVariablesCopia; 
    }




}
module.exports = AnalizerController