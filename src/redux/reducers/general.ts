import { Reducer } from "redux";
import { updateObject } from "../../util/util";
import * as actionTypes from "../actions/actionTypes";
import { AppActions } from "../types";
import { GeneralInitialState } from "../types/general";

const initialState: GeneralInitialState = {
	transactions: null,
	errorMessage: null,
};

const clearState = (state: GeneralInitialState, _action: AppActions) => {
	return updateObject(state, { errorMessage: null });
};
const getTransactionsStart = (
	state: GeneralInitialState,
	_action: AppActions
) => {
	// can manipulate other variables here if needed for example if loading state is set to global
	return state;
};
const getTransactionsSucceed = (
	state: GeneralInitialState,
	action: AppActions
) => {
	if ("transactions" in action) {
		// update the transactions when response is returned
		return updateObject(state, {
			transactions: action.transactions,
		});
	}
	return state;
};
const getTransactionsFailed = (
	state: GeneralInitialState,
	_action: AppActions
) => {
	// can manipulate other variables here if needed for example error message
	return state;
};

const reducer: Reducer<GeneralInitialState, AppActions> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case actionTypes.CLEAR_STATE:
			return clearState(state, action);
		case actionTypes.GET_TRANSACTIONS_START:
			return getTransactionsStart(state, action);
		case actionTypes.GET_TRANSACTIONS_SUCCEED:
			return getTransactionsSucceed(state, action);
		case actionTypes.GET_TRANSACTIONS_FAILED:
			return getTransactionsFailed(state, action);
		default:
			return state;
	}
};

export default reducer;
