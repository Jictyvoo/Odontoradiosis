export interface IPreFunction {
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

export interface IRoutineDescription {
    landmark: string;
    accessed_curves: string[];
    routines: IOperation[];
}
