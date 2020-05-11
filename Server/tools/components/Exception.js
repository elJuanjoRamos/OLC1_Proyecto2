class Exception {
    /**
     * @param type Tipo de error lexico, sintactico
     * @param description Descripcion del error
     * @param line Fila donde ocurrio el error
     * @param column Columna donde ocurrio el error
     */
    constructor(type, description, line, column) {
        this.name = "Exception"
        this.type = type;
        this.description = description;
        this.line = line;
        this.column = column;
    }
    toString() {
        return `${this.type} ${this.description} ${this.line} ${this.column}`;
    }
}
exports.Exception = Exception;
