// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='..\references.ts' />

module TypeScript {
    export module PullInstantiationHelpers {
        // This class helps in creating the type argument map
        // But it creates another copy only if the type argument map is changing
        // helping in not modifying entried in the existing map
        export class MutableTypeArgumentMap {
            public createdDuplicateTypeArgumentMap = false;
            constructor(public typeParameterArgumentMap: PullTypeSymbol[]) {
            }
            public ensureTypeArgumentCopy() {
                if (!this.createdDuplicateTypeArgumentMap) {
                    var passedInTypeArgumentMap = this.typeParameterArgumentMap;
                    this.typeParameterArgumentMap = [];
                    for (var typeParameterID in passedInTypeArgumentMap) {
                        if (passedInTypeArgumentMap.hasOwnProperty(typeParameterID)) {
                            this.typeParameterArgumentMap[typeParameterID] = passedInTypeArgumentMap[typeParameterID];
                        }
                    }
                    this.createdDuplicateTypeArgumentMap = true;
                }
            }
        }

        export function instantiateTypeArgument(resolver: PullTypeResolver, symbol: InstantiableSymbol,
            mutableTypeParameterMap: MutableTypeArgumentMap) {
            if (symbol.getIsSpecialized()) {
                // Get the type argument map from the signature and update our type argument map
                var rootTypeArgumentMap = symbol.getTypeParameterArgumentMap();
                var newTypeArgumentMap: PullTypeSymbol[] = [];
                var allowedTypeParameters = symbol.getAllowedToReferenceTypeParameters();
                for (var i = 0; i < allowedTypeParameters.length; i++) {
                    var typeParameterID = allowedTypeParameters[i].pullSymbolID;
                    var typeArg = rootTypeArgumentMap[typeParameterID];
                    if (typeArg) {
                        newTypeArgumentMap[typeParameterID] = resolver.instantiateType(typeArg, mutableTypeParameterMap.typeParameterArgumentMap);
                    }
                }

                // We are repeating this loop just to make sure we arent poluting the typeParameterArgumentMap passed in
                // when we are insantiating the type arguments
                for (var i = 0; i < allowedTypeParameters.length; i++) {
                    var typeParameterID = allowedTypeParameters[i].pullSymbolID;
                    if (newTypeArgumentMap[typeParameterID] && mutableTypeParameterMap.typeParameterArgumentMap[typeParameterID] != newTypeArgumentMap[typeParameterID]) {
                        mutableTypeParameterMap.ensureTypeArgumentCopy();
                        mutableTypeParameterMap.typeParameterArgumentMap[typeParameterID] = newTypeArgumentMap[typeParameterID];
                    }
                }
            }
        }

        export function cleanUpTypeArgumentMap(symbol: InstantiableSymbol, mutableTypeArgumentMap: MutableTypeArgumentMap) {
            var allowedToReferenceTypeParameters = symbol.getAllowedToReferenceTypeParameters();
            for (var typeParameterID in mutableTypeArgumentMap.typeParameterArgumentMap) {
                if (mutableTypeArgumentMap.typeParameterArgumentMap.hasOwnProperty(typeParameterID)) {
                    if (!ArrayUtilities.any(allowedToReferenceTypeParameters, (typeParameter) => typeParameter.pullSymbolID == typeParameterID)) {
                        mutableTypeArgumentMap.ensureTypeArgumentCopy();
                        delete mutableTypeArgumentMap.typeParameterArgumentMap[typeParameterID];
                    }
                }
            }
        }

        export function getAllowedToReferenceTypeParametersFromDecl(decl: PullDecl): PullTypeParameterSymbol[] {
            var allowedToReferenceTypeParameters: PullTypeParameterSymbol[] = [];

            var allowedToUseDeclTypeParameters = false;
            var getTypeParametersFromParentDecl = false;

            switch (decl.kind) {
                case PullElementKind.Method:
                    if (hasFlag(decl.flags, PullElementFlags.Static)) {
                        // Static method/property cannot use type parameters from parent
                        allowedToUseDeclTypeParameters = true;
                        break;
                    }
                // Non static methods, construct and call signatures have type paramters
                // and can use type parameters from parent decl too
                case PullElementKind.FunctionType:
                case PullElementKind.ConstructorType:
                case PullElementKind.ConstructSignature:
                case PullElementKind.CallSignature:
                case PullElementKind.FunctionExpression:
                case PullElementKind.Function:
                    allowedToUseDeclTypeParameters = true;
                    getTypeParametersFromParentDecl = true;
                    break;

                case PullElementKind.Property:
                    if (hasFlag(decl.flags, PullElementFlags.Static)) {
                        // Static method/property cannot use type parameters from parent 
                        break;
                    }
                // Dont have own type parameters, but can get it from parents
                case PullElementKind.Parameter:
                case PullElementKind.GetAccessor:
                case PullElementKind.SetAccessor:
                case PullElementKind.ConstructorMethod:
                case PullElementKind.IndexSignature:
                case PullElementKind.ObjectType:
                case PullElementKind.ObjectLiteral:
                case PullElementKind.TypeParameter:
                    getTypeParametersFromParentDecl = true;
                    break;

                case PullElementKind.Class:
                case PullElementKind.Interface:
                    allowedToUseDeclTypeParameters = true;
                    break;
            }

            if (getTypeParametersFromParentDecl) {
                allowedToReferenceTypeParameters = allowedToReferenceTypeParameters.concat(
                    getAllowedToReferenceTypeParametersFromDecl(decl.getParentDecl()));
            }

            if (allowedToUseDeclTypeParameters) {
                var typeParameterDecls = decl.getTypeParameters();
                for (var i = 0; i < typeParameterDecls.length; i++) {
                    allowedToReferenceTypeParameters.push(<PullTypeParameterSymbol>typeParameterDecls[i].getSymbol());
                }
            }

            return allowedToReferenceTypeParameters;
        }
    }
}