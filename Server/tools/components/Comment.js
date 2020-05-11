class Comment {
    /**
     * @constructor Retorna el objeto break creado
     * @param line Linea del break
     * @param column Columna del break
     * @param type Columna del break
     */
    constructor(t,  l, c) {
        this.name ="Comment";
        this.type = t;
        this.line = l;
        this.column= c;
    }
}
exports.Comment = Comment;
