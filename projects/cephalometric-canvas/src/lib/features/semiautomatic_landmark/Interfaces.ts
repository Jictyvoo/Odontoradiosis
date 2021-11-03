interface IPreFunction {
	[key: string]: any;
}

interface ICallbackOperations {
	(
		firstParam: number,
		secondParam: string | number,
		resultName: string | number
	): {
		x: number;
		y: number;
	};
}
