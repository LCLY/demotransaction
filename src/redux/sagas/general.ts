import { put } from "redux-saga/effects";
import { AppActions } from "../types";
import axios from "axios";
import * as actions from "../actions/index";

export function* getTransactionsSaga(_action: AppActions): any {
	yield put(actions.getTransactionsStart());

	let url = `https://624843254bd12c92f409236d.mockapi.io/api/v1/transactions`;
	try {
		let response = yield axios.get(url);
		yield put(actions.getTransactionsSucceed(response.data[0].items));
	} catch (error: any) {
		yield put(actions.getTransactionsFailed("Get Transactions Failed"));
	}
}
