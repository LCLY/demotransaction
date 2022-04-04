/**
 * This utility function updates the old state with the latest state in reducers
 * @param {object} oldObject initialState/previous state in reducer
 * @param {object} updatedProperties latest state either from sagas or actions
 * @return Latest state to frontend via mapStateToProps
 * @category Utilities
 */
export const updateObject = (oldObject: any, updatedProperties: any) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const findByTestAtrr = (component: any, attr: any) => {
	const wrapper = component.find(`[data-test='${attr}']`);
	return wrapper;
};
