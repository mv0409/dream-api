const getTimeStamp = (): string => {
	return new Date().toISOString();
};
/*eslint @typescript-eslint/no-explicit-any:*/
/*eslint @typescript-eslint/explicit-module-boundary-types:*/
const warn = (namespace: string, message: string, object?: any): void => {
	if (object) {
		console.warn(
			`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
			object,
		);
	} else {
		console.warn(
			`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`,
		);
	}
};
/*eslint @typescript-eslint/no-explicit-any:*/
/*eslint @typescript-eslint/explicit-module-boundary-types:*/
const error = (namespace: string, message: string, object?: any): void => {
	if (object) {
		console.error(
			`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
			object,
		);
	} else {
		console.error(
			`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`,
		);
	}
};

/*eslint @typescript-eslint/no-explicit-any:*/
/*eslint @typescript-eslint/explicit-module-boundary-types:*/
const debug = (namespace: string, message: string, object?: any): void => {
	if (object) {
		console.debug(
			`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
			object,
		);
	} else {
		console.debug(
			`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
		);
	}
};

/*eslint @typescript-eslint/no-explicit-any:*/
/*eslint @typescript-eslint/explicit-module-boundary-types:*/
const info = (namespace: string, message: string, object?: any): void => {
	if (object) {
		console.info(
			`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`,
			object,
		);
	} else {
		console.info(
			`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`,
		);
	}
};

export default {
	info,
	warn,
	error,
	debug,
};
