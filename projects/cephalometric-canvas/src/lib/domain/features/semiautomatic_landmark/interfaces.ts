export interface IPreFunction {
    [key: string]: any;
}

export interface ISymbolTable {
    [key: string]: any;
}

export interface ICallbackOperations {
    (
        firstParam: number,
        secondParam: string | number,
        resultName: string | number
    ): {
        x: number;
        y: number;
    };
}

type IOperation =
    | (string | number)[]
    | (string | string[] | null)[]
    | (string | { x: string; y: string } | null)[];

// TODO: Create a class for this, and a parse in compile-time (save it as a AST)
export interface IRoutineDescription {
    landmark: string;
    accessed_curves: string[];
    instructions: IOperation[];
}
