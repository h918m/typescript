// delete  operator on boolean type
var BOOLEAN;

function foo() {
    return true;
}

var A = (function () {
    function A() {
    }
    A.foo = function () {
        return false;
    };
    return A;
})();
var M;
(function (M) {
    M.n;
})(M || (M = {}));

var objA = new A();

// boolean type var
var ResultIsBoolean1 = delete BOOLEAN;

// boolean type literal
var ResultIsBoolean2 = delete true;
var ResultIsBoolean3 = delete { x: true, y: false };

// boolean type expressions
var ResultIsBoolean4 = delete objA.a;
var ResultIsBoolean5 = delete M.n;
var ResultIsBoolean6 = delete foo();
var ResultIsBoolean7 = delete A.foo();

// multiple delete  operator
var ResultIsBoolean8 = delete delete BOOLEAN;

// miss assignment operators
delete true;
delete BOOLEAN;
delete foo();
delete true, false;
delete objA.a;
delete M.n;
