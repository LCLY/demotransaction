import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { watchGeneral } from "./redux/sagas/index";
import generalReducer from "./redux/reducers/general";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./globalStyle";

// enable browser redux extension tool
const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		: null || compose;

// combine all reducers
export const rootReducer = combineReducers({
	generalReducer: generalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// set config to our rootreducer

export const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

// runs the middleware
sagaMiddleware.run(watchGeneral);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<GlobalStyle />
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
