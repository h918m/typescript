// No inference is made from function typed arguments which have multiple call signatures
var C = (function () {
    function C() {
    }
    return C;
})();
var D = (function () {
    function D() {
    }
    return D;
})();
var a;

function foo4(cb) {
    var u;
    return u;
}

var r = foo4(a);

var b;

var r2 = foo4(b); // T is {} (candidates boolean and {}), U is any (candidates any and {})
