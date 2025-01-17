"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user = {
    name: "mann",
    email: "this@gmail.com"
};
function createUser(_a) {
    var name = _a.name, email = _a.email;
    console.log("User created with name: ".concat(name, " and email: ").concat(email));
}
createUser(user);
