class Token {
    id;
    line;
    column;
    description;
    constructor(i,des, l, c){
        this.id = i;
        this.line = l;
        this.column = c;
        this.description = des;
    }
}


module.exports = Token;