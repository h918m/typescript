///<reference path='References.ts' />

interface ISyntaxList extends ISyntaxElement {
    count(): number;
    syntaxNodeAt(index: number): SyntaxNode;
    toArray(): SyntaxNode[];

    firstToken(): ISyntaxToken;
    lastToken(): ISyntaxToken;
}