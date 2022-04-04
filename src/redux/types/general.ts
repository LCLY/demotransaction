import * as actionTypes from "../actions/actionTypes";

export interface GeneralInitialState {
	readonly transactions?: ITransaction[] | null;
	readonly errorMessage?: string | null;
}

export interface ITransaction {
	id: string;
	created: string;
	updated: string;
	updatedKeys: any[];
	deleted: boolean;
	amount: number;
	merchantId: string;
	autocreditItemId: any | null;
	transactionReportId: any | null;
	currency: string;
	provider: string;
	state: string;
	accountingState: any | null;
	qr: {
		url: string;
	};
	securityWord: string;
	canRefundIfConfirmed: true;
	calculateFeeOnImport: false;
	externalImport: false;
	externalImportReference: any | null;
	merchantDiscountRateCode: string;
	externalId: string;
	localId: any | null;
	includeInAutocredit: true;
	excludeFromRemittance: false;
	announceToProvider: true;
	paymentToken: any | null;
	history: { state: string; updatedDate: string; trigger: string }[];

	appVersion: string;
	apiVersion: string;
	deviceId: string;
	costStructure: {
		currency: string;
		feeRateExact: number;
		rateFee: number;
		fee: number;
		payable: number;
		fixedFee: number;
		merchantDiscountRate: {
			fixedFee: number;
			rateFee: number;
			code: string;
			provider: string;
			resellerMetadata: {
				reseller: string;
				resellerCode: string;
			};
		};
	};
	providerDisplayName: string;
	remittanceId: any | null;
	orderInfo: any | null;
	originatorApp: string;
	refundRemittanceId: any | null;
	refundId: any | null;
	refundReason: any | null;
	redirectSecret: string;
	webhooksReceived: string[];
	webhooksSent: any[];
	vendor: string;
	vendorResponses: string[];
	vendorQrCode: string;
	metadata: any | null;
	resellerMetadata: any;
	subTotal: any | null;
	taxesTotal: any | null;
	serviceChargeTotal: any | null;
	paymentLinks: any[];
	initiator: string;
	url: string;
	mustReview: boolean;
	quickCancel: boolean;
	isWalletScan: boolean;
	initiatorDetails: {
		id: string;
		contactEmail: string;
		contactName: string;
		firstName: string;
		lastName: string;
	};
	expires: string;
	customerReference: any | null;
	hasError: boolean;
	allowRetry: boolean;
	threeDSecure: any | null;
	paddedCardNumber: any | null;
	providerBrandName: any | null;
	buyerIdentifier: any | null;
	tokenizationMethod: any | null;
}

export interface GetTransactionsAction {
	type: typeof actionTypes.GET_TRANSACTIONS;
}
export interface GetTransactionsStartAction {
	type: typeof actionTypes.GET_TRANSACTIONS_START;
}
export interface GetTransactionsSucceedAction {
	type: typeof actionTypes.GET_TRANSACTIONS_SUCCEED;
	transactions: ITransaction[];
}
export interface GetTransactionsFailedAction {
	type: typeof actionTypes.GET_TRANSACTIONS_FAILED;
	errorMessage: string;
}
export interface ClearStateAction {
	type: typeof actionTypes.CLEAR_STATE;
}

export type GeneralActionTypes =
	| ClearStateAction
	| GetTransactionsAction
	| GetTransactionsStartAction
	| GetTransactionsSucceedAction
	| GetTransactionsFailedAction;
