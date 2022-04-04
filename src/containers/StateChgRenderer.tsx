export function StateChgRenderer() {}

// Following AGGrid Guide to manipulate the cell renderer for cell flashing

StateChgRenderer.prototype.init = function (params: any) {
	this.eGui = document.createElement("div");
	this.eGui.innerHTML = `
        <span class="custom-animation-renderer">
            <span class="value-change-value"></span>
        </span>
    `;

	this.lastValue = 0;
	this.refreshCount = 0;
	this.eValue = this.eGui.querySelector(".value-change-value");
	this.eCellDelta = this.eGui;

	this.refresh(params);
};

StateChgRenderer.prototype.getGui = function () {
	return this.eGui;
};

StateChgRenderer.prototype.refresh = function (params: any) {
	if (params.value === "") return;
	if (params.value === this.lastValue) return;

	if (params.valueFormatted) {
		this.eValue.innerHTML = params.valueFormatted;
	} else if (params.value) {
		this.eValue.innerHTML = params.value;
	} else {
		this.eValue.innerHTML = "";
	}

	if (params.value && this.lastValue) {
		let delta = params.value !== this.lastValue;
		this.showDelta(delta);
	}

	this.setTimerToRemoveDelta(params);

	this.lastValue = params.value;

	return true;
};

StateChgRenderer.prototype.showDelta = function (
	_delta: any,
	styleOverride: any
) {
	if (!styleOverride) {
		this.addOrRemoveClass(
			this.eCellDelta,
			"cell-delta-order-highlight-positive",
			false
		);
	} else {
		const { targetElement, positiveStyle } = styleOverride;

		this.addOrRemoveClass(targetElement, positiveStyle, false);
	}
};

StateChgRenderer.prototype.setTimerToRemoveDelta = function (
	params: any,
	styleOverride: any
) {
	if (!styleOverride) {
		this.refreshCount++;
		let refreshCountCopy = this.refreshCount;

		setTimeout(() => {
			if (refreshCountCopy === this.refreshCount) {
				this.hideDeltaValue(params);
			}
		}, 500);
	} else {
		setTimeout(() => {
			this.hideDeltaValue(params, styleOverride);
		}, 500);
	}
};

StateChgRenderer.prototype.hideDeltaValue = function (
	params: any,
	styleOverride: any
) {
	if (!styleOverride && params) {
		this.addOrRemoveClass(
			this.eCellDelta,
			"cell-delta-order-highlight-positive",
			true
		);
	} else {
		const { targetElement, positiveStyle } = styleOverride;
		this.addOrRemoveClass(targetElement, positiveStyle, true);
	}
};

StateChgRenderer.prototype.addOrRemoveClass = function (
	element: any,
	className: string,
	isRemove: boolean
) {
	if (isRemove) {
		element.classList.remove(className);
	} else {
		element.classList.add(className);
	}
};
