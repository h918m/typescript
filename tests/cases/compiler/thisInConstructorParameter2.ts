class P {
    x = this;
    static y = this;

    constructor(public z = this, zz = this) { }

    foo(zz = this) { zz.x; }
    static bar(zz = this) { zz.y; }
}