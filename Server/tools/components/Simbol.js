"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones
 */
class Simbol {
    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param type Tipo de la varible o funcion
     * @param identifier Nombre de la variable o funcion
     * @param value Valor de la variable u objeto completo de la función
     */
    constructor(type, identifier, value) {
        this.name = "Simbol"
        this.type = type;
        this.identifier = identifier;
        this.value = value;
    }
}
exports.Simbol = Simbol;
