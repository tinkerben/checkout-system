"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Size;
(function (Size) {
    Size[Size["SMALL"] = 0] = "SMALL";
    Size[Size["MEDIUM"] = 1] = "MEDIUM";
    Size[Size["LARGE"] = 2] = "LARGE";
})(Size = exports.Size || (exports.Size = {}));
;
;
// Assuming the available advertisements are unique, othewise get the first one
// I don't really like handling error with a try catch but in this scenario is okay because
// - there is no clear explanation of what should we do with the error
// - try catch makes the typing simpler depending on the team, it's can be more readable
exports.getPizzaPriceFromSource = (size, availablePizzas) => {
    try {
        return availablePizzas.filter(a => { return a.size == size; })[0].retailPrice;
    }
    catch (e) {
        throw new Error(`error: getPizzaPriceFromSource - ${e.message}`);
    }
};
