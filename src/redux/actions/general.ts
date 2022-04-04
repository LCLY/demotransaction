import { AppActions } from "../types";
import { ITransaction } from "../types/general";
import * as actionTypes from "./actionTypes";

export const getTransactions = (): AppActions => {
	return {
		type: actionTypes.GET_TRANSACTIONS,
	};
};

export const getTransactionsStart = (): AppActions => {
	return {
		type: actionTypes.GET_TRANSACTIONS_START,
	};
};
export const getTransactionsSucceed = (
	transactions: ITransaction[]
): AppActions => {
	return {
		type: actionTypes.GET_TRANSACTIONS_SUCCEED,
		transactions: transactions,
	};
};
export const getTransactionsFailed = (errorMessage: string): AppActions => {
	return {
		type: actionTypes.GET_TRANSACTIONS_FAILED,
		errorMessage: errorMessage,
	};
};

export const clearState = (): AppActions => {
	return {
		type: actionTypes.CLEAR_STATE,
	};
};
