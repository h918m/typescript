/// <reference path='fourslash.ts'/>

//// // this comment is required to not break the fourslash framework
//// // both these lines should be removed before re-enabling the test
//*//function f(a,b,c,d){/*1*/
//*//for(var i=0;i<10;i++){/*2*/
//*//var a=0;/*3*/
//*//var b=a+a+a*a%a/2-1;/*4*/
//*//b+=a;/*5*/
//*//++b;/*6*/
//*//f(a,b,c,d);/*7*/
//*//if(1===1){/*8*/
//*//var m=function(e,f){/*9*/
//*//return e^f;/*10*/
//*//}/*11*/
//*//}/*12*/
//*//}/*13*/
//*//}/*14*/
//*//
//*//for (var i = 0   ; i < this.foo(); i++) {/*15*/
//*//}/*16*/

//format.document();
//goTo.marker("1");
//verify.currentLineContentIs("function f(a, b, c, d) {");
//goTo.marker("2");
//verify.currentLineContentIs("    for (var i = 0; i < 10; i++) {");
//goTo.marker("3");
//verify.currentLineContentIs("        var a = 0;");
//goTo.marker("4");
//verify.currentLineContentIs("        var b = a + a + a * a % a / 2 - 1;");
//goTo.marker("5");
//verify.currentLineContentIs("        b += a;");
//goTo.marker("6");
//verify.currentLineContentIs("        ++b;");
//goTo.marker("7");
//verify.currentLineContentIs("        f(a, b, c, d);");
//goTo.marker("8");
//verify.currentLineContentIs("        if (1 === 1) {");
//goTo.marker("9");
//verify.currentLineContentIs("            var m = function(e, f) {");
//goTo.marker("10");
//verify.currentLineContentIs("                return e ^ f;");
//goTo.marker("11");
//verify.currentLineContentIs("            }");
//goTo.marker("12");
//*// The expected scenario is failing due to bug 696158 - [TypeScript] Bad formatting on if statement containing function assignment expression.
//*//verify.currentLineContentIs("        }");
//verify.currentLineContentIs("}");
//goTo.marker("13");
//verify.currentLineContentIs("    }");
//goTo.marker("14");
//verify.currentLineContentIs("}");
//goTo.marker("15");
//verify.currentLineContentIs("for (var i = 0; i < this.foo(); i++) {");
//goTo.marker("16");
//verify.currentLineContentIs("}");