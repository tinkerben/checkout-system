"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Size;
(function (Size) {
    Size[Size["SMALL"] = 0] = "SMALL";
    Size[Size["MEDIUM"] = 1] = "MEDIUM";
    Size[Size["LARGE"] = 2] = "LARGE";
})(Size = exports.Size || (exports.Size = {}));
;
var CustomerEnum;
(function (CustomerEnum) {
    CustomerEnum[CustomerEnum["MICROSOFT"] = 0] = "MICROSOFT";
    CustomerEnum[CustomerEnum["AMAZON"] = 1] = "AMAZON";
    CustomerEnum[CustomerEnum["FACEBOOK"] = 2] = "FACEBOOK";
})(CustomerEnum = exports.CustomerEnum || (exports.CustomerEnum = {}));
;
;
exports.getPizzaPriceFromSource = (size, availablePizzas) => {
    try {
        return availablePizzas.filter(a => { return a.size == size; })[0].retailPrice;
    }
    catch (e) {
        throw new Error(`error: getPizzaPriceFromSource - ${e.message}`);
    }
};
