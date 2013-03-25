/// <reference path='..\..\Services\es5compat.ts' />

///<reference path='References.ts' />
///<reference path='Emitter.ts' />
///<reference path='PrettyPrinter.ts' />
///<reference path='Test262.ts' />
///<reference path='Top1000.ts' />
///<reference path='tests\IncrementalParserTests.ts' />
///<reference path='..\Core\Environment.ts' />
///<reference path='..\..\Harness\Diff.ts' />
///<reference path='..\SyntaxTreeToAstVisitor.ts' />

var timer = new TypeScript.Timer();

var specificFile =
    // "0_004152.ts";
    undefined;

var generate = false;

var htmlReport = new Diff.HtmlBaselineReport("fidelity-report.html");
htmlReport.reset();

class Program {
    runAllTests(verify: bool): void {
        Environment.standardOut.WriteLine("");

        // Environment.standardOut.WriteLine("Testing against fuzz.");
        // this.runTests("C:\\temp\\fuzz",
        //    fileName => this.runParser(fileName, LanguageVersion.EcmaScript5, /*verify:*/ false, /*generateBaselines:*/ generate), 2000);

        if (true) {
            // return;
        }

        Environment.standardOut.WriteLine("Testing Incremental 2.");
        if (specificFile === undefined) {
            TypeScript.IncrementalParserTests.runAllTests();
        }

        Environment.standardOut.WriteLine("Testing emitter 1.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\emitter\\ecmascript5",
            fileName => this.runEmitter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate, /*justText:*/ false));

        Environment.standardOut.WriteLine("Testing parser.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\parser\\ecmascript5",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        Environment.standardOut.WriteLine("Testing against monoco.");
        this.runTests("C:\\temp\\monoco-files",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, /*verify:*/ false, /*generateBaselines:*/ generate));

        Environment.standardOut.WriteLine("Testing against 262.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\test262",
            fileName => this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, /*verify:*/ true, /*generateBaselines:*/ generate));

        Environment.standardOut.WriteLine("Testing pretty printer.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\prettyPrinter\\ecmascript5",
            fileName => this.runPrettyPrinter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        Environment.standardOut.WriteLine("Testing findToken.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\findToken\\ecmascript5",
            fileName => this.runFindToken(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        Environment.standardOut.WriteLine("Testing Incremental Perf.");
        this.testIncrementalSpeed(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\SyntaxNodes.generated.ts");

        Environment.standardOut.WriteLine("Testing trivia.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\trivia\\ecmascript5",
            fileName => this.runTrivia(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));

        Environment.standardOut.WriteLine("Testing scanner.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\scanner\\ecmascript5",
            fileName => this.runScanner(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate));
            
        Environment.standardOut.WriteLine("Testing Incremental 1.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\parser\\ecmascript5",
            fileName => this.runIncremental(fileName, TypeScript.LanguageVersion.EcmaScript5));
            
        Environment.standardOut.WriteLine("Testing emitter 2.");
        this.runTests(Environment.currentDirectory() + "\\src\\compiler\\Syntax\\tests\\emitter2\\ecmascript5",
            fileName => this.runEmitter(fileName, TypeScript.LanguageVersion.EcmaScript5, verify, /*generateBaselines:*/ generate, /*justText:*/ true));
    }

    private static reusedElements(oldNode: TypeScript.SourceUnitSyntax, newNode: TypeScript.SourceUnitSyntax, key: any): { originalElements: number; reusedElements: number; } {
        var allOldElements = TypeScript.SyntaxElementsCollector.collectElements(oldNode);
        var allNewElements = TypeScript.SyntaxElementsCollector.collectElements(newNode);

        for (var i = 0; i < allOldElements.length; i++) {
            var oldElement = allOldElements[i];
            oldElement[key] = key;
        }

        var reused = 0;
        for (var j = 0; j < allNewElements.length; j++) {
            var newElement = allNewElements[j];
            if (newElement[key] === key) {
                reused++;
            }
        }

        return { originalElements: allOldElements.length, reusedElements: reused };
    }

    private testIncrementalSpeed(fileName: string): void {
        if (specificFile !== undefined) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);
        // Environment.standardOut.WriteLine(fileName);

        var text = TypeScript.TextFactory.createText(contents);
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), TypeScript.LanguageVersion.EcmaScript5);

        var totalIncrementalTime = 0;
        var count = 1000;
        var timer = new TypeScript.Timer();

        for (var i = 0; i < count; i++) {
            timer.start();
            
            var changeLength = i * 2;
            var tree2 = TypeScript.Parser.incrementalParse(tree,
                new TypeScript.TextChangeRange(new TypeScript.TextSpan((text.length() / 2) - i, changeLength), changeLength), text);
            
            timer.end();

            totalIncrementalTime += timer.time;

            TypeScript.Debug.assert(tree.structuralEquals(tree2));

            //if (i % 100 === 0) {
            //    var info = Program.reusedElements(tree.sourceUnit(), tree2.sourceUnit(), i);
            //    Environment.standardOut.WriteLine("Total Elements : " + info.originalElements);
            //    Environment.standardOut.WriteLine("Reused Elements: " + info.reusedElements);
            //}

            tree = tree2;
        }
        
        var rateBytesPerMillisecond = (contents.length * count) / totalIncrementalTime;
        var rateBytesPerSecond = rateBytesPerMillisecond * 1000;
        var rateMBPerSecond = rateBytesPerSecond / (1024 * 1024);

        Environment.standardOut.WriteLine("Incremental time: " + totalIncrementalTime);
        Environment.standardOut.WriteLine("Incremental rate: " + rateMBPerSecond + " MB/s");
    }

    private handleException(fileName: string, e: Error): void {
        Environment.standardOut.WriteLine("");
        if ((<string>e.message).indexOf(fileName) < 0) {
            Environment.standardOut.WriteLine("Exception: " + fileName + ": " + e.message);
        }
        else {
            Environment.standardOut.WriteLine(e.message);
        }
    }

    private runTests(
        path: string,
        action: (fileName: string) => void) {

        var testFiles = Environment.listFiles(path, null, { recursive: true });
        var indexNum = 0;

        testFiles.forEach(fileName => {
            if (specificFile !== undefined && fileName.indexOf(specificFile) < 0) {
                return;
            }

            // Environment.standardOut.WriteLine(fileName);
            try {
                action(fileName);
            }
            catch (e) {
                this.handleException(fileName, e);
            }
        });
    }

    private checkResult(fileName: string, result: any, verify: bool, generateBaseline: bool, justText: bool): void {
        var actualResult: string;
        var expectedFile: string;

        if (generateBaseline) {
            actualResult = justText ? result : JSON2.stringify(result, null, 4);
            expectedFile = fileName + ".expected";

            // Environment.standardOut.WriteLine("Generating baseline for: " + fileName);
            Environment.writeFile(expectedFile, actualResult, /*useUTF8:*/ true);
        }
        else if (verify) {
            actualResult = justText ? result : JSON2.stringify(result, null, 4);
            expectedFile = fileName + ".expected";

            var actualFile = fileName + ".actual";

            var expectedResult = null;
            if (!Environment.fileExists(expectedFile)) {
                Environment.writeFile(expectedFile, "", false);
            }
            else {
                expectedResult = Environment.readFile(expectedFile, /*useUTF8:*/ true);
            }

            if (expectedResult !== actualResult) {
                Environment.standardOut.WriteLine(" !! Test Failed. Results written to: " + actualFile);
                Environment.writeFile(actualFile, actualResult, /*useUTF8:*/ true);

                if (!generate) {
                    var includeUnchangedRegions = expectedResult.length < 10240 && actualResult.length < 10240;
                    htmlReport.addDifference("", expectedFile, actualFile, expectedResult, actualResult, includeUnchangedRegions);
                }
            }
            else {
                if (Environment.fileExists(actualFile)) {
                    Environment.deleteFile(actualFile);
                }
            }
        }
    }
    
    runEmitter(fileName: string,
        languageVersion: TypeScript.LanguageVersion,
               verify: bool,
               generateBaseline: bool,
               justText: bool): void {
        if (true) {
            // return;
        }

        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);
        // Environment.standardOut.WriteLine(fileName);

        totalSize += contents.length;

        var text = TypeScript.TextFactory.createText(contents);

        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), languageVersion);
        var emitted = TypeScript.Emitter1.emit(<TypeScript.SourceUnitSyntax>tree.sourceUnit());

        var result = justText
            ? <any>emitted.fullText()
            : { fullText: emitted.fullText().split("\r\n"), sourceUnit: emitted };
        this.checkResult(fileName, result, verify, generateBaseline, justText);
    }

    runPrettyPrinter(fileName: string,
        languageVersion: TypeScript.LanguageVersion,
        verify: bool,
        generateBaseline: bool): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);
        // Environment.standardOut.WriteLine(fileName);

        totalSize += contents.length;

        var text = TypeScript.TextFactory.createText(contents);
        
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), languageVersion);
        var result = TypeScript.PrettyPrinter.prettyPrint(tree.sourceUnit());

        this.checkResult(fileName, result, verify, generateBaseline, true);

        totalTime += timer.time;
    }

    runParser(fileName: string,
        languageVersion: TypeScript.LanguageVersion,
        verify: bool,
              generateBaseline?: bool = false): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);
        // Environment.standardOut.WriteLine(fileName);

        totalSize += contents.length;

        var text = TypeScript.TextFactory.createText(contents);

        timer.start();
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), languageVersion);
        timer.end();

        TypeScript.Debug.assert(tree.sourceUnit().fullWidth() === contents.length);

        TypeScript.SyntaxTreeToAstVisitor.checkPositions = true;
        TypeScript.SyntaxTreeToAstVisitor.visit(tree, "", new TypeScript.CompilationSettings());

        this.checkResult(fileName, tree, verify, generateBaseline, false);

        totalTime += timer.time;
    }

    runIncremental(fileName: string,
        languageVersion: TypeScript.LanguageVersion): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);
        // Environment.standardOut.WriteLine(fileName);

        var text = TypeScript.TextFactory.createText(contents);

        var tree1 = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), languageVersion);
        var tree2 = TypeScript.Parser.incrementalParse(
            new TypeScript.SyntaxTree(TypeScript.Syntax.emptySourceUnit(), TypeScript.isDTSFile(fileName), [], fileName, null, languageVersion, tree1.parseOptions()),
            new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, 0), text.length()),
            text);

        TypeScript.Debug.assert(tree1.structuralEquals(tree2));
    }

    runFindToken(fileName: string,
        languageVersion: TypeScript.LanguageVersion, verify: bool, generateBaseline: bool): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts") && !TypeScript.StringUtilities.endsWith(fileName, ".js")) {
            return;
        }

        if (fileName.indexOf("RealSource") >= 0) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);
        // Environment.standardOut.WriteLine(fileName);

        var text = TypeScript.TextFactory.createText(contents);
        var tree = TypeScript.Parser.parse(fileName, text, TypeScript.isDTSFile(fileName), languageVersion);
        var sourceUnit = tree.sourceUnit();

        TypeScript.Debug.assert(tree.sourceUnit().fullWidth() === contents.length);

        var tokens = {};
        var tokensOnLeft = {};
        var leftToRight = [];
        var rightToLeft = [];

        for (var i = 0; i <= contents.length; i++) {
            var token = sourceUnit.findToken(i).token();

            var left = sourceUnit.findTokenOnLeft(i);
            var tokenOnLeft = left === null ? null : left.token();

            TypeScript.Debug.assert(token.isToken());
            if (i === contents.length) {
                TypeScript.Debug.assert(token.kind() === TypeScript.SyntaxKind.EndOfFileToken);
            }
            else {
                TypeScript.Debug.assert(token.width() > 0 || token.kind() === TypeScript.SyntaxKind.EndOfFileToken);
                TypeScript.Debug.assert(token.fullWidth() > 0);
            }

            tokens[i] = token;
            tokensOnLeft[i] = tokenOnLeft;
        }

        var positionedToken = sourceUnit.findToken(0);
        while (positionedToken !== null) {
            leftToRight.push(positionedToken.token());
            positionedToken = positionedToken.nextToken();
        }

        positionedToken = sourceUnit.findToken(contents.length);
        while (positionedToken !== null) {
            rightToLeft.push(positionedToken.token());
            positionedToken = positionedToken.previousToken();
        }

        var result = {
            tokens: tokens,
            tokensOnLeft: tokensOnLeft,
            leftToRight: leftToRight,
            rightToLeft: rightToLeft,
        };

        this.checkResult(fileName, result, verify, generateBaseline, /*justText:*/ false);
    }

    runTrivia(fileName: string,
        languageVersion: TypeScript.LanguageVersion, verify: bool, generateBaseline: bool): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts")) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);

        var text = TypeScript.TextFactory.createText(contents);
        var scanner = new TypeScript.Scanner1(fileName, text, languageVersion);

        var tokens: TypeScript.ISyntaxToken[] = [];
        var textArray: string[] = [];
        var diagnostics: TypeScript.SyntaxDiagnostic[] = [];

        while (true) {
            var token = scanner.scan(diagnostics, /*allowRegularExpression:*/ false);
            tokens.push(token);

            if (token.tokenKind === TypeScript.SyntaxKind.EndOfFileToken) {
                break;
            }
        }

        this.checkResult(fileName, tokens, verify, generateBaseline, false);
    }

    runScanner(fileName: string, languageVersion: TypeScript.LanguageVersion, verify: bool, generateBaseline: bool): void {
        if (!TypeScript.StringUtilities.endsWith(fileName, ".ts")) {
            return;
        }

        var contents = Environment.readFile(fileName, /*useUTF8:*/ true);

        var text = TypeScript.TextFactory.createText(contents);
        var scanner = new TypeScript.Scanner1(fileName, text, languageVersion);

        var tokens: TypeScript.ISyntaxToken[] = [];
        var textArray: string[] = [];
        var diagnostics: TypeScript.SyntaxDiagnostic[] = [];

        while (true) {
            var token = scanner.scan(diagnostics, /*allowRegularExpression:*/ false);
            tokens.push(token);

            if (token.tokenKind === TypeScript.SyntaxKind.EndOfFileToken) {
                break;
            }
        }

        if (verify) {
            var tokenText = TypeScript.ArrayUtilities.select(tokens, t => t.fullText()).join("");

            if (tokenText !== contents) {
                throw new Error("Token invariant broken!");
            }
        }

        var result = diagnostics.length === 0 ? <any>tokens : { diagnostics: diagnostics, tokens: tokens };
        this.checkResult(fileName, result, verify, generateBaseline, false);
    }

    parseArguments(): void {
        if (true) {
            return;
        }

        Environment.standardOut.WriteLine("Testing input files.");
        for (var index in Environment.arguments) {
            var fileName: string = Environment.arguments[index];
            if (specificFile !== undefined && fileName.indexOf(specificFile) < 0) {
                continue;
            }

            this.runParser(fileName, TypeScript.LanguageVersion.EcmaScript5, /*verify:*/ false);
        }
    }

    run262(): void {
        var path = "C:\\temp\\test262\\suite";
        var testFiles = Environment.listFiles(path, null, { recursive: true });

        var testCount = 0;
        var failCount = 0;
        var skippedTests:string[] = [];

        for (var index in testFiles) {
            var fileName: string = testFiles[index];

            if (specificFile !== undefined && fileName.indexOf(specificFile) < 0) {
                continue;
            }

            // All 262 files are utf8.  But they dont' have a BOM.  Force them to be read in
            // as UTF8.
            var contents = Environment.readFile(fileName, /*useUTF8:*/ true);

            var isNegative = contents.indexOf("@negative") >= 0

            testCount++;

            try {
                var stringText = TypeScript.TextFactory.createText(contents);
                var tree = TypeScript.Parser.parse(fileName, stringText, TypeScript.isDTSFile(fileName), TypeScript.LanguageVersion.EcmaScript5);

                if (isNegative) {
                    var nameOnly = fileName.substr(fileName.lastIndexOf("\\") + 1);
                    var canParseSuccessfully = <bool>negative262ExpectedResults[nameOnly];

                    if (canParseSuccessfully) {
                        // We expected to parse this successfully.  Report an error if we didn't.
                        if (tree.diagnostics() && tree.diagnostics().length > 0) {
                            Environment.standardOut.WriteLine("Negative test. Unexpected failure: " + fileName);
                            failCount++;
                        }
                    }
                    else {
                        // We expected to fail on this.  Report an error if we don't.
                        if (tree.diagnostics() === null || tree.diagnostics().length === 0) {
                            Environment.standardOut.WriteLine("Negative test. Unexpected success: " + fileName);
                            failCount++;
                        }
                    }
                }
                else {
                    // Not a negative test.  We can't have any errors or skipped tokens.
                    if (tree.diagnostics() && tree.diagnostics().length > 0) {
                        Environment.standardOut.WriteLine("Unexpected failure: " + fileName);
                        failCount++;
                    }
                }
            }
            catch (e) {
                failCount++;
                this.handleException(fileName, e);
            }
        }

        Environment.standardOut.WriteLine("");
        Environment.standardOut.WriteLine("Test 262 results:");
        Environment.standardOut.WriteLine("Test Count: " + testCount);
        Environment.standardOut.WriteLine("Skip Count: " + skippedTests.length);
        Environment.standardOut.WriteLine("Fail Count: " + failCount);

        for (var i = 0; i < skippedTests.length; i++) {
            Environment.standardOut.WriteLine(skippedTests[i]);
        }
    }

    runTop1000(): void {
        Environment.standardOut.WriteLine("Testing top 1000 sites.");

        var path = "C:\\Temp\\TopJSFiles";
        var testFiles = Environment.listFiles(path, null, { recursive: true });

        var testCount = 0;
        var failCount = 0;
        var skippedTests: string[] = [];

        for (var index in testFiles) {
            var fileName: string = testFiles[index];

            if (specificFile !== undefined && fileName.indexOf(specificFile) < 0) {
                continue;
            }

            var canParseSuccessfully = expectedTop1000Failures[fileName.substr(path.length + 1)] === undefined;
            var contents = Environment.readFile(fileName, /*useUTF8:*/ true);

            testCount++;

            try {
                var stringText = TypeScript.TextFactory.createText(contents);
                var tree = TypeScript.Parser.parse(fileName, stringText, false, TypeScript.LanguageVersion.EcmaScript5);

            //Environment.standardOut.WriteLine(fileName);
            // Environment.standardOut.Write(".");

                if (canParseSuccessfully) {
                    if (tree.diagnostics() && tree.diagnostics().length > 0) {
                        Environment.standardOut.WriteLine("Unexpected failure: " + fileName);
                        failCount++;
                    }
                }
                else {
                    // We expected to fail on this.  Report an error if we don't.
                    if (tree.diagnostics() === null || tree.diagnostics().length === 0) {
                        Environment.standardOut.WriteLine("Unexpected success: " + fileName);
                        failCount++;
                    }
                }
            }
            catch (e) {
                failCount++;
                this.handleException(fileName, e);
            }
        }

        Environment.standardOut.WriteLine("");
        Environment.standardOut.WriteLine("Top 1000 results:");
        Environment.standardOut.WriteLine("Test Count: " + testCount);
        Environment.standardOut.WriteLine("Skip Count: " + skippedTests.length);
        Environment.standardOut.WriteLine("Fail Count: " + failCount);

        for (var i = 0; i < skippedTests.length; i++) {
            Environment.standardOut.WriteLine(skippedTests[i]);
        }
    }
}

// (<any>WScript).StdIn.ReadLine();
var totalTime = 0;
var totalSize = 0;
var program = new Program();

// New parser.
if (true) {
    totalTime = 0;
    totalSize = 0;
    program.runAllTests(true);
    program.parseArguments();
    Environment.standardOut.WriteLine("Total time: " + totalTime);
    Environment.standardOut.WriteLine("Total size: " + totalSize);
}

// Test 262.
if (false) {
    totalTime = 0;
    totalSize = 0;
    program.run262();
    Environment.standardOut.WriteLine("Total time: " + totalTime);
    Environment.standardOut.WriteLine("Total size: " + totalSize);
}

// Test Top 1000 sites.
if (false) {
    totalTime = 0;
    totalSize = 0;
    program.runTop1000();
    Environment.standardOut.WriteLine("Total time: " + totalTime);
    Environment.standardOut.WriteLine("Total size: " + totalSize);
}

// Test