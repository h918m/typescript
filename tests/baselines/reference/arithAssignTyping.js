var f = (function () {
    function f() {
    }
    return f;
})();

f += ''; // error
f += 1; // error
f -= 1; // error
f *= 1; // error
f /= 1; // error
f %= 1; // error
f &= 1; // error
f |= 1; // error
f <<= 1; // error
f >>= 1; // error
f >>>= 1; // error
f ^= 1; // error
