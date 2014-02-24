var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// all the following should be valid
function fn1() {
    return 1;
}
function fn2() {
    return '';
}
function fn3() {
    return undefined;
}
function fn4() {
    return;
}
function fn5() {
    return true;
}
function fn6() {
    return new Date(12);
}
function fn7() {
    return null;
}
function fn8() {
    return;
}

var C = (function () {
    function C() {
    }
    C.prototype.dispose = function () {
    };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);
function fn10() {
    return { id: 12 };
}

function fn11() {
    return new C();
}
function fn12() {
    return new D();
}
function fn13() {
    return null;
}
