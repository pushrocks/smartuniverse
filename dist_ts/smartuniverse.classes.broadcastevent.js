"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastEvent = void 0;
const plugins = __importStar(require("./smartuniverse.plugins"));
/**
 * broadcasts an event to multiple channels
 * also handles subsription
 */
class BroadcastEvent {
    constructor() {
        this.eventSubject = new plugins.smartrx.rxjs.Subject();
    }
    ;
    fire(eventPayloadArg) {
    }
    ;
    subscribe(funcArg) {
        return this.eventSubject.subscribe(funcArg);
    }
}
exports.BroadcastEvent = BroadcastEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnR1bml2ZXJzZS5jbGFzc2VzLmJyb2FkY2FzdGV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnR1bml2ZXJzZS5jbGFzc2VzLmJyb2FkY2FzdGV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBbUQ7QUFFbkQ7OztHQUdHO0FBQ0gsTUFBYSxjQUFjO0lBR3pCO1FBRk8saUJBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBZ0IsQ0FBQztJQUl2RSxDQUFDO0lBQUEsQ0FBQztJQUVLLElBQUksQ0FBQyxlQUE2QjtJQUV6QyxDQUFDO0lBQUEsQ0FBQztJQUdLLFNBQVMsQ0FBQyxPQUF3QztRQUN2RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQWZELHdDQWVDIn0=