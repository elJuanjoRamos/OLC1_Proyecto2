class AnalizerController {
    

    arrayErrores = [];

    constructor(){
        console.log("Analizer Controller");
    }


    armarExcepciones(list){
        console.log("la lista que llego es")
        console.log(list)

        if(list != undefined){
            
            //Recorro y guardo los errores
            list.forEach(e => {
                if(e.name == "Exception"){
                    this.arrayErrores.push(e.description)
                } else {
                    if(e.name == "For"|| e.name == "Switch" || e.name == "Case" 
                    || e.name == "Do" || e.name == "While" || e.name == "Else"){
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
        this.arrayErrores = [];
    }
}
module.exports = AnalizerController