// @Filename: underscoreTest1_underscore.ts
interface Dictionary<T> {
    [x: string]: T;
}

interface Iterator<T, U> {
    (value: T, index: any, list: any): U;
}

interface Reducer<T, U> {
    (accumulator: U, value: T, index: any, list: any): U;
}

interface Tuple2<T0, T1> extends Array<any> {
    0: T0;
    1: T1;
}

interface Tuple3<T0, T1, T2> extends Array<any> {
    0: T0;
    1: T1;
    2: T2;
}

interface Tuple4<T0, T1, T2, T3> extends Array<any> {
    0: T0;
    1: T1;
    2: T2;
    3: T3;
}

module Underscore {
    export interface WrappedObject<T> {
        keys(): string[];
        values(): any[];
        pairs(): any[][];
        invert(): any;
        functions(): string[];
        methods(): string[];
        extend(...sources: any[]): T;
        pick(...keys: string[]): T;
        omit(...keys: string[]): T;
        defaults(...defaults: any[]): T;
        clone(): T;
        tap(interceptor: (object: T) => void): T;
        has(key: string): boolean;
        isEqual(other: T): boolean;
        isEmpty(): boolean;
        isElement(): boolean;
        isArray(): boolean;
        isObject(): boolean;
        isArguments(): boolean;
        isFunction(): boolean;
        isString(): boolean;
        isNumber(): boolean;
        isFinite(): boolean;
        isBoolean(): boolean;
        isDate(): boolean;
        isRegExp(): boolean;
        isNaN(): boolean;
        isNull(): boolean;
        isUndefined(): boolean;
        value(): T;
    }

    export interface WrappedFunction<T extends Function> extends WrappedObject<T> {
        bind(object: any): T;
        bind(object: any, ...args: any[]): Function;
        bindAll(...methodNames: string[]): T;
        partial(...args: any[]): Function;
        memoize(hashFunction?: Function): T;
        delay(wait: number, ...args: any[]): number;
        defer(...args: any[]): number;
        throttle(wait: number): T;
        debounce(wait: number, immediate?: boolean): T;
        once(): T;
        wrap(wrapper: (func: T, ...args: any[]) => any): T;
        compose(...funcs: Function[]): Function;
    }

    export interface WrappedArray<T> extends WrappedObject<Array<T>> {
        each(iterator: Iterator<T, void>, context?: any): void;
        forEach(iterator: Iterator<T, void>, context?: any): void;
        map<U>(iterator: Iterator<T, U>, context?: any): U[];
        collect<U>(iterator: Iterator<T, U>, context?: any): U[];
        reduce(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduce<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldl(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldl<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        inject(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        inject<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        reduceRight(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduceRight<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldr(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldr<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        find(iterator: Iterator<T, boolean>, context?: any): T;
        detect(iterator: Iterator<T, boolean>, context?: any): T;
        filter(iterator: Iterator<T, boolean>, context?: any): T[];
        select(iterator: Iterator<T, boolean>, context?: any): T[];
        where(properties: Object): T[];
        findWhere(properties: Object): T;
        reject(iterator: Iterator<T, boolean>, context?: any): T[];
        every(iterator?: Iterator<T, boolean>, context?: any): boolean;
        all(iterator?: Iterator<T, boolean>, context?: any): boolean;
        some(iterator?: Iterator<T, boolean>, context?: any): boolean;
        any(iterator?: Iterator<T, boolean>, context?: any): boolean;
        contains(value: T): boolean;
        include(value: T): boolean;
        invoke(methodName: string, ...args: any[]): any[];
        pluck(propertyName: string): any[];
        max(iterator?: Iterator<T, any>, context?: any): T;
        min(iterator?: Iterator<T, any>, context?: any): T;
        sortBy(iterator: Iterator<T, any>, context?: any): T[];
        sortBy(propertyName: string): T[];
        groupBy(iterator?: Iterator<T, any>, context?: any): Dictionary<T[]>;
        groupBy(propertyName: string): Dictionary<T[]>;
        countBy(iterator?: Iterator<T, any>, context?: any): Dictionary<number>;
        countBy(propertyName: string): Dictionary<number>;
        shuffle(): T[];
        toArray(): T[];
        size(): number;
        first(): T;
        first(count: number): T[];
        head(): T;
        head(count: number): T[];
        take(): T;
        take(count: number): T[];
        initial(): T;
        initial(count: number): T[];
        last(): T;
        last(count: number): T[];
        rest(index?: number): T[];
        compact(): T[];
        flatten<U>(shallow?: boolean): U[];
        without(...values: T[]): T[];
        union(...arrays: T[][]): T[];
        intersection(...arrays: T[][]): T[];
        difference(...others: T[][]): T[];
        uniq(isSorted?: boolean): T[];
        uniq<U>(isSorted: boolean, iterator: Iterator<T, U>, context?: any): U[];
        unique(isSorted?: boolean): T[];
        unique<U>(isSorted: boolean, iterator: Iterator<T, U>, context?: any): U[];
        zip(...arrays: any[][]): any[][];
        object(): any;
        object(values: any[]): any;
        indexOf(value: T, isSorted?: boolean): number;
        lastIndexOf(value: T, fromIndex?: number): number;
        sortedIndex(obj: T, propertyName: string): number;
        sortedIndex(obj: T, iterator?: Iterator<T, any>, context?: any): number;
        // Methods from Array
        concat(...items: T[]): T[];
        join(separator?: string): string;
        pop(): T;
        push(...items: T[]): number;
        reverse(): T[];
        shift(): T;
        slice(start: number, end?: number): T[];
        sort(compareFn?: (a: T, b: T) => number): T[];
        splice(start: number): T[];
        splice(start: number, deleteCount: number, ...items: T[]): T[];
        unshift(...items: T[]): number;
    }

    export interface WrappedDictionary<T> extends WrappedObject<Dictionary<T>> {
        each(iterator: Iterator<T, void>, context?: any): void;
        forEach(iterator: Iterator<T, void>, context?: any): void;
        map<U>(iterator: Iterator<T, U>, context?: any): U[];
        collect<U>(iterator: Iterator<T, U>, context?: any): U[];
        reduce(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduce<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldl(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldl<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        inject(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        inject<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        reduceRight(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduceRight<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldr(iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldr<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        find(iterator: Iterator<T, boolean>, context?: any): T;
        detect(iterator: Iterator<T, boolean>, context?: any): T;
        filter(iterator: Iterator<T, boolean>, context?: any): T[];
        select(iterator: Iterator<T, boolean>, context?: any): T[];
        where(properties: Object): T[];
        findWhere(properties: Object): T;
        reject(iterator: Iterator<T, boolean>, context?: any): T[];
        every(iterator?: Iterator<T, boolean>, context?: any): boolean;
        all(iterator?: Iterator<T, boolean>, context?: any): boolean;
        some(iterator?: Iterator<T, boolean>, context?: any): boolean;
        any(iterator?: Iterator<T, boolean>, context?: any): boolean;
        contains(value: T): boolean;
        include(value: T): boolean;
        invoke(methodName: string, ...args: any[]): any[];
        pluck(propertyName: string): any[];
        max(iterator?: Iterator<T, any>, context?: any): T;
        min(iterator?: Iterator<T, any>, context?: any): T;
        sortBy(iterator: Iterator<T, any>, context?: any): T[];
        sortBy(propertyName: string): T[];
        groupBy(iterator?: Iterator<T, any>, context?: any): Dictionary<T[]>;
        groupBy(propertyName: string): Dictionary<T[]>;
        countBy(iterator?: Iterator<T, any>, context?: any): Dictionary<number>;
        countBy(propertyName: string): Dictionary<number>;
        shuffle(): T[];
        toArray(): T[];
        size(): number;
    }

    export interface ChainedObject<T> {
        keys(): ChainedArray<string>;
        values(): ChainedArray<any>;
        pairs(): ChainedArray<any[]>;
        invert(): ChainedObject<any>;
        functions(): ChainedArray<string>;
        methods(): ChainedArray<string>;
        extend(...sources: any[]): ChainedObject<T>;
        pick(...keys: string[]): ChainedObject<T>;
        omit(...keys: string[]): ChainedObject<T>;
        defaults(...defaults: any[]): ChainedObject<T>;
        clone(): ChainedObject<T>;
        tap(interceptor: (object: T) => void): ChainedObject<T>;
        has(key: string): ChainedObject<boolean>;
        isEqual(other: T): ChainedObject<boolean>;
        isEmpty(): ChainedObject<boolean>;
        isElement(): ChainedObject<boolean>;
        isArray(): ChainedObject<boolean>;
        isObject(): ChainedObject<boolean>;
        isArguments(): ChainedObject<boolean>;
        isFunction(): ChainedObject<boolean>;
        isString(): ChainedObject<boolean>;
        isNumber(): ChainedObject<boolean>;
        isFinite(): ChainedObject<boolean>;
        isBoolean(): ChainedObject<boolean>;
        isDate(): ChainedObject<boolean>;
        isRegExp(): ChainedObject<boolean>;
        isNaN(): ChainedObject<boolean>;
        isNull(): ChainedObject<boolean>;
        isUndefined(): ChainedObject<boolean>;
        value(): T;
    }

    export interface ChainedArray<T> extends ChainedObject<Array<T>> {
        each(iterator: Iterator<T, void>, context?: any): ChainedObject<void>;
        forEach(iterator: Iterator<T, void>, context?: any): ChainedObject<void>;
        map<U>(iterator: Iterator<T, U>, context?: any): ChainedArray<U>;
        collect<U>(iterator: Iterator<T, U>, context?: any): ChainedArray<U>;
        reduce(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        reduce<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        foldl(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        foldl<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        inject(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        inject<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        reduceRight(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        reduceRight<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        foldr(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        foldr<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        find(iterator: Iterator<T, boolean>, context?: any): ChainedObject<T>;
        detect(iterator: Iterator<T, boolean>, context?: any): ChainedObject<T>;
        filter(iterator: Iterator<T, boolean>, context?: any): ChainedArray<T>;
        select(iterator: Iterator<T, boolean>, context?: any): ChainedArray<T>;
        where(properties: Object): ChainedArray<T>;
        findWhere(properties: Object): ChainedObject<T>;
        reject(iterator: Iterator<T, boolean>, context?: any): ChainedArray<T>;
        every(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        all(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        some(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        any(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        contains(value: T): ChainedObject<boolean>;
        include(value: T): ChainedObject<boolean>;
        invoke(methodName: string, ...args: any[]): ChainedArray<any>;
        pluck(propertyName: string): ChainedArray<any>;
        max(iterator?: Iterator<T, any>, context?: any): ChainedObject<T>;
        min(iterator?: Iterator<T, any>, context?: any): ChainedObject<T>;
        sortBy(iterator: Iterator<T, any>, context?: any): ChainedArray<T>;
        sortBy(propertyName: string): ChainedArray<T>;
        // Should return ChainedDictionary<T[]>, but expansive recursion not allowed
        groupBy(iterator?: Iterator<T, any>, context?: any): ChainedDictionary<any[]>;
        groupBy(propertyName: string): ChainedDictionary<any[]>;
        countBy(iterator?: Iterator<T, any>, context?: any): ChainedDictionary<number>;
        countBy(propertyName: string): ChainedDictionary<number>;
        shuffle(): ChainedArray<T>;
        toArray(): ChainedArray<T>;
        size(): ChainedObject<number>;
        first(): ChainedObject<T>;
        first(count: number): ChainedArray<T>;
        head(): ChainedObject<T>;
        head(count: number): ChainedArray<T>;
        take(): ChainedObject<T>;
        take(count: number): ChainedArray<T>;
        initial(): ChainedObject<T>;
        initial(count: number): ChainedArray<T>;
        last(): ChainedObject<T>;
        last(count: number): ChainedArray<T>;
        rest(index?: number): ChainedArray<T>;
        compact(): ChainedArray<T>;
        flatten<U>(shallow?: boolean): ChainedArray<U>;
        without(...values: T[]): ChainedArray<T>;
        union(...arrays: T[][]): ChainedArray<T>;
        intersection(...arrays: T[][]): ChainedArray<T>;
        difference(...others: T[][]): ChainedArray<T>;
        uniq(isSorted?: boolean): ChainedArray<T>;
        uniq<U>(isSorted: boolean, iterator: Iterator<T, U>, context?: any): ChainedArray<U>;
        unique(isSorted?: boolean): ChainedArray<T>;
        unique<U>(isSorted: boolean, iterator: Iterator<T, U>, context?: any): ChainedArray<U>;
        zip(...arrays: any[][]): ChainedArray<any[]>;
        object(): ChainedObject<any>;
        object(values: any[]): ChainedObject<any>;
        indexOf(value: T, isSorted?: boolean): ChainedObject<number>;
        lastIndexOf(value: T, fromIndex?: number): ChainedObject<number>;
        sortedIndex(obj: T, propertyName: string): ChainedObject<number>;
        sortedIndex(obj: T, iterator?: Iterator<T, any>, context?: any): ChainedObject<number>;
        // Methods from Array
        concat(...items: T[]): ChainedArray<T>;
        join(separator?: string): ChainedObject<string>;
        pop(): ChainedObject<T>;
        push(...items: T[]): ChainedObject<number>;
        reverse(): ChainedArray<T>;
        shift(): ChainedObject<T>;
        slice(start: number, end?: number): ChainedArray<T>;
        sort(compareFn?: (a: T, b: T) => number): ChainedArray<T>;
        splice(start: number): ChainedArray<T>;
        splice(start: number, deleteCount: number, ...items: T[]): ChainedArray<T>;
        unshift(...items: T[]): ChainedObject<number>;
        // Methods from ChainedObject with promoted return types
        extend(...sources: any[]): ChainedArray<T>;
        pick(...keys: string[]): ChainedArray<T>;
        omit(...keys: string[]): ChainedArray<T>;
        defaults(...defaults: any[]): ChainedArray<T>;
        clone(): ChainedArray<T>;
        tap(interceptor: (object: T[]) => void): ChainedArray<T>;
    }

    export interface ChainedDictionary<T> extends ChainedObject<Dictionary<T>> {
        each(iterator: Iterator<T, void>, context?: any): ChainedObject<void>;
        forEach(iterator: Iterator<T, void>, context?: any): ChainedObject<void>;
        map<U>(iterator: Iterator<T, U>, context?: any): ChainedArray<U>;
        collect<U>(iterator: Iterator<T, U>, context?: any): ChainedArray<U>;
        reduce(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        reduce<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        foldl(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        foldl<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        inject(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        inject<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        reduceRight(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        reduceRight<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        foldr(iterator: Reducer<T, T>, initialValue?: T, context?: any): ChainedObject<T>;
        foldr<U>(iterator: Reducer<T, U>, initialValue: U, context?: any): ChainedObject<U>;
        find(iterator: Iterator<T, boolean>, context?: any): ChainedObject<T>;
        detect(iterator: Iterator<T, boolean>, context?: any): ChainedObject<T>;
        filter(iterator: Iterator<T, boolean>, context?: any): ChainedArray<T>;
        select(iterator: Iterator<T, boolean>, context?: any): ChainedArray<T>;
        where(properties: Object): ChainedArray<T>;
        findWhere(properties: Object): ChainedObject<T>;
        reject(iterator: Iterator<T, boolean>, context?: any): ChainedArray<T>;
        every(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        all(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        some(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        any(iterator?: Iterator<T, boolean>, context?: any): ChainedObject<boolean>;
        contains(value: T): ChainedObject<boolean>;
        include(value: T): ChainedObject<boolean>;
        invoke(methodName: string, ...args: any[]): ChainedArray<any>;
        pluck(propertyName: string): ChainedArray<any>;
        max(iterator?: Iterator<T, any>, context?: any): ChainedObject<T>;
        min(iterator?: Iterator<T, any>, context?: any): ChainedObject<T>;
        sortBy(iterator: Iterator<T, any>, context?: any): ChainedArray<T>;
        sortBy(propertyName: string): ChainedArray<T>;
        // Should return ChainedDictionary<T[]>, but expansive recursion not allowed
        groupBy(iterator?: Iterator<T, any>, context?: any): ChainedDictionary<any[]>;
        groupBy(propertyName: string): ChainedDictionary<any[]>;
        countBy(iterator?: Iterator<T, any>, context?: any): ChainedDictionary<number>;
        countBy(propertyName: string): ChainedDictionary<number>;
        shuffle(): ChainedArray<T>;
        toArray(): ChainedArray<T>;
        size(): ChainedObject<number>;
        // Methods from ChainedObject with promoted return types
        extend(...sources: any[]): ChainedDictionary<T>;
        pick(...keys: string[]): ChainedDictionary<T>;
        omit(...keys: string[]): ChainedDictionary<T>;
        defaults(...defaults: any[]): ChainedDictionary<T>;
        clone(): ChainedDictionary<T>;
        tap(interceptor: (object: Dictionary<T>) => void): ChainedDictionary<T>;
    }

    export interface TemplateSettings {
        evaluate?: RegExp;
        interpolate?: RegExp;
        escape?: RegExp;
    }

    export interface Static {
        <T>(list: T[]): WrappedArray<T>;
        <T>(list: Dictionary<T>): WrappedDictionary<T>;
        <T extends Function>(func: T): WrappedFunction<T>;
        <T>(obj: T): WrappedObject<T>;

        chain<T>(list: T[]): ChainedArray<T>;
        chain<T>(list: Dictionary<T>): ChainedDictionary<T>;
        chain<T>(obj: T): ChainedObject<T>;

        each<T>(list: T[], iterator: Iterator<T, void>, context?: any): void;
        each<T>(list: Dictionary<T>, iterator: Iterator<T, void>, context?: any): void;
        forEach<T>(list: T[], iterator: Iterator<T, void>, context?: any): void;
        forEach<T>(list: Dictionary<T>, iterator: Iterator<T, void>, context?: any): void;

        map<T, U>(list: T[], iterator: Iterator<T, U>, context?: any): U[];
        map<T, U>(list: Dictionary<T>, iterator: Iterator<T, U>, context?: any): U[];
        collect<T, U>(list: T[], iterator: Iterator<T, U>, context?: any): U[];
        collect<T, U>(list: Dictionary<T>, iterator: Iterator<T, U>, context?: any): U[];

        reduce<T>(list: T[], iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduce<T, U>(list: T[], iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        reduce<T>(list: Dictionary<T>, iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduce<T, U>(list: Dictionary<T>, iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldl<T>(list: T[], iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldl<T, U>(list: T[], iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldl<T>(list: Dictionary<T>, iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldl<T, U>(list: Dictionary<T>, iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        inject<T>(list: T[], iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        inject<T, U>(list: T[], iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        inject<T>(list: Dictionary<T>, iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        inject<T, U>(list: Dictionary<T>, iterator: Reducer<T, U>, initialValue: U, context?: any): U;

        reduceRight<T>(list: T[], iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduceRight<T, U>(list: T[], iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        reduceRight<T>(list: Dictionary<T>, iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        reduceRight<T, U>(list: Dictionary<T>, iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldr<T>(list: T[], iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldr<T, U>(list: T[], iterator: Reducer<T, U>, initialValue: U, context?: any): U;
        foldr<T>(list: Dictionary<T>, iterator: Reducer<T, T>, initialValue?: T, context?: any): T;
        foldr<T, U>(list: Dictionary<T>, iterator: Reducer<T, U>, initialValue: U, context?: any): U;

        find<T>(list: T[], iterator: Iterator<T, boolean>, context?: any): T;
        find<T>(list: Dictionary<T>, iterator: Iterator<T, boolean>, context?: any): T;
        detect<T>(list: T[], iterator: Iterator<T, boolean>, context?: any): T;
        detect<T>(list: Dictionary<T>, iterator: Iterator<T, boolean>, context?: any): T;

        filter<T>(list: T[], iterator: Iterator<T, boolean>, context?: any): T[];
        filter<T>(list: Dictionary<T>, iterator: Iterator<T, boolean>, context?: any): T[];
        select<T>(list: T[], iterator: Iterator<T, boolean>, context?: any): T[];
        select<T>(list: Dictionary<T>, iterator: Iterator<T, boolean>, context?: any): T[];

        where<T>(list: T[], properties: Object): T[];
        where<T>(list: Dictionary<T>, properties: Object): T[];

        findWhere<T>(list: T[], properties: Object): T;
        findWhere<T>(list: Dictionary<T>, properties: Object): T;

        reject<T>(list: T[], iterator: Iterator<T, boolean>, context?: any): T[];
        reject<T>(list: Dictionary<T>, iterator: Iterator<T, boolean>, context?: any): T[];

        every<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): boolean;
        every<T>(list: Dictionary<T>, iterator?: Iterator<T, boolean>, context?: any): boolean;
        all<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): boolean;
        all<T>(list: Dictionary<T>, iterator?: Iterator<T, boolean>, context?: any): boolean;

        some<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): boolean;
        some<T>(list: Dictionary<T>, iterator?: Iterator<T, boolean>, context?: any): boolean;
        any<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): boolean;
        any<T>(list: Dictionary<T>, iterator?: Iterator<T, boolean>, context?: any): boolean;

        contains<T>(list: T[], value: T): boolean;
        contains<T>(list: Dictionary<T>, value: T): boolean;
        include<T>(list: T[], value: T): boolean;
        include<T>(list: Dictionary<T>, value: T): boolean;

        invoke(list: any[], methodName: string, ...args: any[]): any[];
        invoke(list: Dictionary<any>, methodName: string, ...args: any[]): any[];

        pluck(list: any[], propertyName: string): any[];
        pluck(list: Dictionary<any>, propertyName: string): any[];

        max<T>(list: T[], iterator?: Iterator<T, any>, context?: any): T;
        max<T>(list: Dictionary<T>, iterator?: Iterator<T, any>, context?: any): T;

        min<T>(list: T[], iterator?: Iterator<T, any>, context?: any): T;
        min<T>(list: Dictionary<T>, iterator?: Iterator<T, any>, context?: any): T;

        sortBy<T>(list: T[], iterator: Iterator<T, any>, context?: any): T[];
        sortBy<T>(list: Dictionary<T>, iterator: Iterator<T, any>, context?: any): T[];
        sortBy<T>(list: T[], propertyName: string): T[];
        sortBy<T>(list: Dictionary<T>, propertyName: string): T[];

        groupBy<T>(list: T[], iterator?: Iterator<T, any>, context?: any): Dictionary<T[]>;
        groupBy<T>(list: Dictionary<T>, iterator?: Iterator<T, any>, context?: any): Dictionary<T[]>;
        groupBy<T>(list: T[], propertyName: string): Dictionary<T[]>;
        groupBy<T>(list: Dictionary<T>, propertyName: string): Dictionary<T[]>;

        countBy<T>(list: T[], iterator?: Iterator<T, any>, context?: any): Dictionary<number>;
        countBy<T>(list: Dictionary<T>, iterator?: Iterator<T, any>, context?: any): Dictionary<number>;
        countBy<T>(list: T[], propertyName: string): Dictionary<number>;
        countBy<T>(list: Dictionary<T>, propertyName: string): Dictionary<number>;

        shuffle<T>(list: T[]): T[];
        shuffle<T>(list: Dictionary<T>): T[];

        toArray<T>(list: T[]): T[];
        toArray<T>(list: Dictionary<T>): T[];

        size<T>(list: T[]): number;
        size<T>(list: Dictionary<T>): number;

        first<T>(list: T[]): T;
        first<T>(list: T[], count: number): T[];
        head<T>(list: T[]): T;
        head<T>(list: T[], count: number): T[];
        take<T>(list: T[]): T;
        take<T>(list: T[], count: number): T[];

        initial<T>(list: T[]): T;
        initial<T>(list: T[], count: number): T[];

        last<T>(list: T[]): T;
        last<T>(list: T[], count: number): T[];

        rest<T>(list: T[], index?: number): T[];

        compact<T>(list: T[]): T[];

        flatten<T>(list: T[][]): T[];
        flatten<T>(array: any[], shallow?: boolean): T[];

        without<T>(list: T[], ...values: T[]): T[];

        union<T>(...arrays: T[][]): T[];

        intersection<T>(...arrays: T[][]): T[];

        difference<T>(list: T[], ...others: T[][]): T[];

        uniq<T>(list: T[], isSorted?: boolean): T[];
        uniq<T, U>(list: T[], isSorted: boolean, iterator: Iterator<T, U>, context?: any): U[];
        unique<T>(list: T[], isSorted?: boolean): T[];
        unique<T, U>(list: T[], isSorted: boolean, iterator: Iterator<T, U>, context?: any): U[];

        zip<T0, T1>(a0: T0[], a1: T1[]): Tuple2<T0, T1>[];
        zip<T0, T1, T2>(a0: T0[], a1: T1[], a2: T2[]): Tuple3<T0, T1, T2>[];
        zip<T0, T1, T2, T3>(a0: T0[], a1: T1[], a2: T2[], a3: T3[]): Tuple4<T0, T1, T2, T3>[];
        zip(...arrays: any[][]): any[][];

        object(list: any[][]): any;
        object(keys: string[], values: any[]): any;

        indexOf<T>(list: T[], value: T, isSorted?: boolean): number;

        lastIndexOf<T>(list: T[], value: T, fromIndex?: number): number;

        sortedIndex<T>(list: T[], obj: T, propertyName: string): number;
        sortedIndex<T>(list: T[], obj: T, iterator?: Iterator<T, any>, context?: any): number;

        range(stop: number): number[];
        range(start: number, stop: number, step?: number): number[];

        bind<T extends Function>(func: T, object: any): T;
        bind(func: Function, object: any, ...args: any[]): Function;

        bindAll<T>(object: T, ...methodNames: string[]): T;

        partial(func: Function, ...args: any[]): Function;

        memoize<T extends Function>(func: T, hashFunction?: Function): T;

        delay(func: Function, wait: number, ...args: any[]): number;

        defer(func: Function, ...args: any[]): number;

        throttle<T extends Function>(func: T, wait: number): T;

        debounce<T extends Function>(func: T, wait: number, immediate?: boolean): T;

        once<T extends Function>(func: T): T;

        after<T extends Function>(count: number, func: T): T;

        wrap<T extends Function>(func: T, wrapper: (func: T, ...args: any[]) => any): T;

        compose(...funcs: Function[]): Function;

        keys(object: any): string[];

        values(object: any): any[];

        pairs(object: any): any[][];

        invert(object: any): any;

        functions(object: any): string[];
        methods(object: any): string[];

        extend<T>(destination: T, ...sources: any[]): T;

        pick<T>(object: T, ...keys: string[]): T;

        omit<T>(object: T, ...keys: string[]): T;

        defaults<T>(object: T, ...defaults: any[]): T;

        clone<T>(object: T): T;

        tap<T>(object: T, interceptor: (object: T) => void): T;

        has(object: any, key: string): boolean;

        isEqual<T>(object: T, other: T): boolean;

        isEmpty(object: any): boolean;
        isElement(object: any): boolean;
        isArray(object: any): boolean;
        isObject(value: any): boolean;
        isArguments(object: any): boolean;
        isFunction(object: any): boolean;
        isString(object: any): boolean;
        isNumber(object: any): boolean;
        isFinite(object: any): boolean;
        isBoolean(object: any): boolean;
        isDate(object: any): boolean;
        isRegExp(object: any): boolean;
        isNaN(object: any): boolean;
        isNull(object: any): boolean;
        isUndefined(value: any): boolean;

        noConflict(): Static;

        identity<T>(value: T): T;

        times<U>(n: number, iterator: Iterator<number, U>, context?: any): U[];

        random(max: number): number;
        random(min: number, max: number): number;

        mixin(object: any): void;

        uniqueId(): number;
        uniqueId(prefix: string): string;

        escape(s: string): string;

        unescape(s: string): string;

        result(object: any, property: string): any;

        templateSettings: TemplateSettings;

        template(templateString: string): (data: any) => string;
        template(templateString: string, data: any, settings?: TemplateSettings): string;
    }
}

declare var _: Underscore.Static;

// @Filename: underscoreTest1_underscoreTests.ts
/// <reference path="underscoreTest1_underscore.ts" />

declare var $;
declare function alert(x: string): void;

_.each([1, 2, 3], (num) => alert(num.toString()));
_.each({ one: 1, two: 2, three: 3 }, (value: number, key?: string) => alert(value.toString()));

_.map([1, 2, 3], (num) => num * 3);
_.map({ one: 1, two: 2, three: 3 }, (value: number, key?: string) => value * 3);

var sum = _.reduce([1, 2, 3], (memo, num) => memo + num, 0);

var list = [[0, 1], [2, 3], [4, 5]];
var flat = _.reduceRight(list, (a, b) => a.concat(b), []);

var even = _.find([1, 2, 3, 4, 5, 6], (num) => num % 2 == 0);

var evens = _.filter([1, 2, 3, 4, 5, 6], (num) => num % 2 == 0);

var listOfPlays = [{ title: "Cymbeline", author: "Shakespeare", year: 1611 }, { title: "The Tempest", author: "Shakespeare", year: 1611 }, { title: "Other", author: "Not Shakespeare", year: 2012 }];
_.where(listOfPlays, { author: "Shakespeare", year: 1611 });

var odds = _.reject([1, 2, 3, 4, 5, 6], (num) => num % 2 == 0);

//_.all([true, 1, null, 'yes'], _.identity);

_.any([null, 0, 'yes', false]);

_.contains([1, 2, 3], 3);

_.invoke([[5, 1, 7], [3, 2, 1]], 'sort');

var stooges = [{ name: 'moe', age: 40 }, { name: 'larry', age: 50 }, { name: 'curly', age: 60 }];
_.pluck(stooges, 'name');

_.max(stooges, (stooge) => stooge.age);

var numbers = [10, 5, 100, 2, 1000];
_.min(numbers);

_.sortBy([1, 2, 3, 4, 5, 6], (num) => Math.sin(num));


// not sure how this is typechecking at all.. Math.floor(e) is number not string..?
_([1.3, 2.1, 2.4]).groupBy((e: number, i?: number, list?: number[]) => Math.floor(e));
_.groupBy([1.3, 2.1, 2.4], (num: number) => Math.floor(num));
_.groupBy(['one', 'two', 'three'], 'length');

_.countBy([1, 2, 3, 4, 5], (num) => num % 2 == 0 ? 'even' : 'odd');

_.shuffle([1, 2, 3, 4, 5, 6]);

// (function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);

_.size({ one: 1, two: 2, three: 3 });

///////////////////////////////////////////////////////////////////////////////////////

_.first([5, 4, 3, 2, 1]);
_.initial([5, 4, 3, 2, 1]);
_.last([5, 4, 3, 2, 1]);
_.rest([5, 4, 3, 2, 1]);
_.compact([0, 1, false, 2, '', 3]);

_.flatten([1, 2, 3, 4]);
_.flatten([1, [2]]);

// typescript doesn't like the elements being different
_.flatten([1, [2], [3, [[4]]]]);
_.flatten([1, [2], [3, [[4]]]], true);
_.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
_.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
_.difference([1, 2, 3, 4, 5], [5, 2, 10]);
_.uniq([1, 2, 1, 3, 1, 4]);
_.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
_.object(['moe', 'larry', 'curly'], [30, 40, 50]);
_.object([['moe', 30], ['larry', 40], ['curly', 50]]);
_.indexOf([1, 2, 3], 2);
_.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
_.sortedIndex([10, 20, 30, 40, 50], 35);
_.range(10);
_.range(1, 11);
_.range(0, 30, 5);
_.range(0, 30, 5);
_.range(0);

///////////////////////////////////////////////////////////////////////////////////////

var func = function (greeting) { return greeting + ': ' + this.name };
// need a second var otherwise typescript thinks func signature is the above func type,
// instead of the newly returned _bind => func type.
var func2 = _.bind(func, { name: 'moe' }, 'hi');
func2();

var buttonView = {
    label: 'underscore',
    onClick: function () { alert('clicked: ' + this.label); },
    onHover: function () { alert('hovering: ' + this.label); }
};
_.bindAll(buttonView);
$('#underscore_button').bind('click', buttonView.onClick);

var fibonacci = _.memoize(function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

var log = _.bind((message?: string, ...rest: string[]) => { }, Date);
_.delay(log, 1000, 'logged later');

_.defer(function () { alert('deferred'); });

var updatePosition = () => alert('updating position...');
var throttled = _.throttle(updatePosition, 100);
$(null).scroll(throttled);

var calculateLayout = () => alert('calculating layout...');
var lazyLayout = _.debounce(calculateLayout, 300);
$(null).resize(lazyLayout);

var createApplication = () => alert('creating application...');
var initialize = _.once(createApplication);
initialize();
initialize();

var notes: any[];
var render = () => alert("rendering...");
var renderNotes = _.after(notes.length, render);
_.each(notes, (note) => note.asyncSave({ success: renderNotes }));

var hello = function (name) { return "hello: " + name; };
hello = _.wrap(hello, (func, arg) => { return "before, " + func(arg) + ", after"; });
hello("moe");

var greet = function (name) { return "hi: " + name; };
var exclaim = function (statement) { return statement + "!"; };
var welcome = _.compose(exclaim, greet);
welcome('moe');

///////////////////////////////////////////////////////////////////////////////////////

_.keys({ one: 1, two: 2, three: 3 });
_.values({ one: 1, two: 2, three: 3 });
_.pairs({ one: 1, two: 2, three: 3 });
_.invert({ Moe: "Moses", Larry: "Louis", Curly: "Jerome" });
_.functions(_);
_.extend({ name: 'moe' }, { age: 50 });
_.pick({ name: 'moe', age: 50, userid: 'moe1' }, 'name', 'age');
_.omit({ name: 'moe', age: 50, userid: 'moe1' }, 'userid');

var iceCream = { flavor: "chocolate" };
_.defaults(iceCream, { flavor: "vanilla", sprinkles: "lots" });

_.clone({ name: 'moe' });

_.chain([1, 2, 3, 200])
    .filter(function (num) { return num % 2 == 0; })
    .tap(<any>alert)
    .map(function (num) { return num * num })
    .value();

_.has({ a: 1, b: 2, c: 3 }, "b");

var moe = { name: 'moe', luckyNumbers: [13, 27, 34] };
var clone = { name: 'moe', luckyNumbers: [13, 27, 34] };
moe == clone;
_.isEqual(moe, clone);

_.isEmpty([1, 2, 3]);
_.isEmpty({});

_.isElement($('body')[0]);

(function () { return _.isArray(arguments); })();
_.isArray([1, 2, 3]);

_.isObject({});
_.isObject(1);


// (() => { return _.isArguments(arguments); })(1, 2, 3);
_.isArguments([1, 2, 3]);

_.isFunction(alert);

_.isString("moe");

_.isNumber(8.4 * 5);

_.isFinite(-101);

_.isFinite(-Infinity);

_.isBoolean(null);

_.isDate(new Date());

_.isRegExp(/moe/);

_.isNaN(NaN);
isNaN(undefined);
_.isNaN(undefined);

_.isNull(null);
_.isNull(undefined);

_.isUndefined((<any>null).missingVariable);

///////////////////////////////////////////////////////////////////////////////////////

var underscore = _.noConflict();

var moe2 = { name: 'moe' };
moe2 === _.identity(moe);

var genie;

_.times(3, function (n) { genie.grantWishNumber(n); });

_.random(0, 100);

_.mixin({
    capitalize: function (string) {
        return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
});
(<any>_("fabio")).capitalize();

_.uniqueId('contact_');

_.escape('Curly, Larry & Moe');

var object = { cheese: 'crumpets', stuff: function () { return 'nonsense'; } };
_.result(object, 'cheese');

_.result(object, 'stuff');

var compiled = _.template("hello: <%= name %>");
compiled({ name: 'moe' });
var list2 = "<% _.each(people, function(name) { %> <li><%= name %></li> <% }); %>";
_.template(list2, { people: ['moe', 'curly', 'larry'] });
var template = _.template("<b><%- value %></b>");
template({ value: '<script>' });
var compiled2 = _.template("<% print('Hello ' + epithet); %>");
compiled2({ epithet: "stooge" });
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};
var template2 = _.template("Hello {{ name }}!");
template2({ name: "Mustache" });
_.template("Using 'with': <%= data.answer %>", { answer: 'no' }, { variable: 'data' });