class Import {
    /**
     * @constructor 
     * @param identifier nombre de la variable
     * @param line Linea de la sentencia 
     * @param column Columna de la sentencia if
     */
    constructor(identifier, line, column) {
        this.name = "Import"
        this.identifier = identifier;
        this.line = line;
        this.column = column;
    }
}
exports.Import = Import;
