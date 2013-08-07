///<reference path="..\..\..\..\src\harness\harness.ts" />

describe("Setup compiler for samples", () => {
    Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
});

describe('Compiling samples', function ()
{
    var harnessCompiler = Harness.Compiler.getCompiler(Harness.Compiler.CompilerInstance.RunTime);

    function loadSample(path: string): string
    {
        return IO.readFile(Harness.userSpecifiedroot + 'samples/' + path, /*codepage:*/null).contents;
    }

    function addUnitsAndCompile(units: string[], includeWin8Libs = false) {
        var filesToAdd = units.map(unit => {
            return {
                unitName: 'tests/cases/unittests/samples/' + unit,
                content: loadSample(unit)
            };
        });
        harnessCompiler.addInputFiles(filesToAdd);

        if (includeWin8Libs) {
            var winrt = "typings/winrt.d.ts";
            var winjs = "typings/winjs.d.ts";
            harnessCompiler.addInputFile({ unitName: winrt, content: IO.readFile(winrt, null).contents });
            harnessCompiler.addInputFile({ unitName: winjs, content: IO.readFile(winjs, null).contents });
        }

        harnessCompiler.compile(!includeWin8Libs);
    }

    // d3
    it('compiles the d3 sample without error', function ()
    {
        // clean the world before our first sample runs
        //Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
        //harnessCompiler.reset();

        var units = ["d3/data.ts", "d3/d3.d.ts"];
        addUnitsAndCompile(units);
        var errLines = harnessCompiler.reportCompilationErrors();
        assert.equal(errLines.length, 0);
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
    });

    // greeter
    it('compiles greeter without error', function ()
    {
        var src = loadSample("greeter/greeter.ts");
        Harness.Compiler.compileString(src, 'greeter.ts', function (result)
        {
            assert.equal(result.errors.length, 0);
        });
    });

    // imageboard
    it('compiles the imageboard sample without error', function ()
    {
        var units = ["node\\node.d.ts", "imageboard\\app.ts", "imageboard\\db.ts", "imageboard\\express.d.ts", "imageboard\\mongodb.ts", "imageboard\\routes\\index.ts"];
    
        addUnitsAndCompile(units);
        var errLines = harnessCompiler.reportCompilationErrors();
        assert.equal(errLines.length, 0);
    });

    //// interfaces
    it('compiles the interfaces sample without error', function ()
    {
        var interfaces = loadSample("interfaces/interfaces.ts");

        Harness.Compiler.compileString(interfaces, 'interfaces.ts', function (result)
        {
            assert.equal(result.errors.length, 0);
        });

        // Necessary because of some compiler bug that will make the raytracer test fail
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
        harnessCompiler.reset();
    });

    // jquery
    it('compiles the jquery sample without error', function ()
    {
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
        var units = ["jquery/parallax.ts", "jquery/jquery.d.ts"];
        addUnitsAndCompile(units);
        var errLines = harnessCompiler.reportCompilationErrors();
        assert.equal(errLines.length, 0);
    });

    // mankala
    it('compiles the mankala sample without error', function ()
    {
        var units = ["mankala/Base.ts", "mankala/Driver.ts", "mankala/Features.ts", "mankala/Game.ts", "mankala/Geometry.ts", "mankala/Position.ts" ];
        addUnitsAndCompile(units);
        var errLines = harnessCompiler.reportCompilationErrors();
        assert.equal(errLines.length, 0);
    });

    // node
    it('compiles the node sample-1 without error', function ()
    {
        var units = ["node/HttpServer.ts", "node/node.d.ts"];
        addUnitsAndCompile(units);
        var errLines = harnessCompiler.reportCompilationErrors();        
        assert.equal(errLines.length, 0);
    });

    it('compiles the node sample-2 without error', function ()
    {
        var units = ["node/TcpServer.ts", "node/node.d.ts"];
        addUnitsAndCompile(units);
        var errLines = harnessCompiler.reportCompilationErrors();
        assert.equal(errLines.length, 0);
    });

    // raytracer
    it('compiles raytracer without error', function ()
    {
        var src = loadSample("raytracer/raytracer.ts");
        Harness.Compiler.compileString(src, 'raytracer.ts', function (result)
        {
            assert.equal(result.errors.length, 0);
        });
    });

    // simple
    it('compiles simple without error', function ()
    {
        var src = loadSample("simple/animals.ts");
        Harness.Compiler.compileString(src, 'animals.ts', function (result)
        {
            assert.equal(result.errors.length, 0);
        });
    });

    // todomvc
    it('compiles the todo mvc sample without error', function ()
    {
        var src = loadSample("todomvc/js/todos.ts");
        Harness.Compiler.compileString(src, 'todos.ts', function (result)
        {
            assert.equal(result.errors.length, 0);
        });

        // Necessary because both todomvc and warship declare var $
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
        harnessCompiler.reset();
    });  

    // warship
    it('compiles warship combat without error', function ()
    {
        var units = ["warship/warship.ts", "warship/jquery.d.ts", "warship/jqueryui.d.ts"];
        addUnitsAndCompile(units);
        var errLines = harnessCompiler.reportCompilationErrors();
        assert.equal(errLines.length, 0);
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
        harnessCompiler.reset();  
    });

    // win8
    it('compiles the win8 sample without error', function ()
    {
       var units = [
           "win8/encyclopedia/Encyclopedia/js/data.ts",
           "win8/encyclopedia/Encyclopedia/js/default.ts",
           "win8/encyclopedia/Encyclopedia/js/groupDetailPage.ts",
           "win8/encyclopedia/Encyclopedia/js/groupedItemsPage.ts",
           "win8/encyclopedia/Encyclopedia/js/itemDetailPage.ts",
           "win8/encyclopedia/Encyclopedia/js/navigator.ts",
           "win8/encyclopedia/Encyclopedia/js/topic.ts",
           "win8/encyclopedia/Encyclopedia/js/win.ts"
       ]

       Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, false);
       harnessCompiler.reset();       
       addUnitsAndCompile(units, true);
       var errLines = harnessCompiler.reportCompilationErrors();
       errLines.forEach(err => IO.printLine(err));
       assert.equal(errLines.length, 0);
    });
});

describe("Clean up samples", () => {
    Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, true);
});
