"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixBooleans = void 0;
function toBoolean(input) {
    switch (input) {
        case "false":
        case "False":
        case "FALSE":
        case "no":
        case "No":
        case "NO":
        case "0":
        case 0:
        case false:
            return false;
        default:
            return true;
    }
}
exports.default = toBoolean;
// fixes boolean configs
const fixBooleans = (input, booleans) => {
    const output = Object.assign({}, input);
    booleans.forEach(_var => {
        if (input[_var]) {
            output[_var] = toBoolean(input[_var]);
        }
    });
    return output;
};
exports.fixBooleans = fixBooleans;
//# sourceMappingURL=toBoolean.js.map