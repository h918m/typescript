var m4 = require("m4")
exports.x4 = m4.x;
exports.d4 = m4.d;
exports.f4 = m4.foo();
(function (m1) {
    m1.x2 = m4.x;
    m1.d2 = m4.d;
    m1.f2 = m4.foo();
    var x3 = m4.x;
    var d3 = m4.d;
    var f3 = m4.foo();
})(0.m1 || (0.m1 = {}));
var m1 = 0.m1;
var glo_m4 = require("glo_m4")
exports.useGlo_m4_x4 = glo_m4.x;
exports.useGlo_m4_d4 = glo_m4.d;
exports.useGlo_m4_f4 = glo_m4.foo();
var fncOnly_m4 = require("fncOnly_m4")
exports.useFncOnly_m4_f4 = fncOnly_m4.foo();
var private_m4 = require("private_m4")
(function (usePrivate_m4_m1) {
    var x3 = private_m4.x;
    var d3 = private_m4.d;
    var f3 = private_m4.foo();
})(0.usePrivate_m4_m1 || (0.usePrivate_m4_m1 = {}));
var usePrivate_m4_m1 = 0.usePrivate_m4_m1;
var m5 = require("m5")
exports.d = m5.foo2();
var multiImport_m4 = require("m4")
exports.useMultiImport_m4_x4 = multiImport_m4.x;
exports.useMultiImport_m4_d4 = multiImport_m4.d;
exports.useMultiImport_m4_f4 = multiImport_m4.foo();
////[0.d.ts]
export var x4: d;
export var d4: d;
export var f4: d;
export module m1 {
    var x2: d;
    var d2: d;
    var f2: d;
}
export var useGlo_m4_x4: d;
export var useGlo_m4_d4: d;
export var useGlo_m4_f4: d;
export var useFncOnly_m4_f4: d;
export module usePrivate_m4_m1 {
}
export var d: d;
export var useMultiImport_m4_x4: d;
export var useMultiImport_m4_d4: d;
export var useMultiImport_m4_f4: d;