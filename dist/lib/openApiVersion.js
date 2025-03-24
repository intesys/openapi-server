"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (spec) => {
    if (spec.openapi) {
        if (typeof spec.openapi === "string") {
            if (spec.openapi.match(/^3/)) {
                return 1 /* v3 */;
            }
        }
        if (typeof spec.openapi === "number") {
            if (spec.openapi === 3) {
                return 1 /* v3 */;
            }
        }
    }
    if (spec.swagger) {
        if (typeof spec.swagger === "string") {
            if (spec.swagger.match(/^2/)) {
                return 0 /* v2 */;
            }
        }
        if (typeof spec.swagger === "number") {
            if (spec.swagger === 2) {
                return 0 /* v2 */;
            }
        }
    }
    throw new Error("Unsupported openApi schema version");
};
//# sourceMappingURL=openApiVersion.js.map