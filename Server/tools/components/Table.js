
class Table {
    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */
    constructor(Previous) {
        this.Previous = Previous;
        this.Variables = new Map();
    }
    
    setVariable(simbol) {
        let env;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === simbol.identifier) {
                    return `La variable ${key} ya fue declarada.`;
                }
            }
        }
        this.Variables.set(simbol.identifier, simbol);
        return null;
    }
    getVariable(identifier) {
        let env;
        for (env = this; env != null; env = env.Previous) {
            for (let key of Array.from(env.Variables.keys())) {
                if (key === identifier) {
                    return env.Variables.get(key);
                }
            }
        }
        return null;
    }
}
exports.Table = Table;
