import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { GeneralActionTypes } from "../types/general";

import { getTransactionsSaga } from "./general";

export function* watchGeneral() {
	yield all([
		takeEvery<GeneralActionTypes>(
			actionTypes.GET_TRANSACTIONS,
			getTransactionsSaga
		),
	]);
}
