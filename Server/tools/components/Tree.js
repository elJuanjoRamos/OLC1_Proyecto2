
class Tree {
    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instructions AST generado por la gramatica
     */
    constructor(instructions) {
        this.instructions = instructions;
        this.excepciones = new Array();
        this.console = new Array();
    }
}
exports.Tree = Tree;
