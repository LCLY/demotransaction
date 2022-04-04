import React from "react";
import styled from "styled-components";
import { ITransaction } from "../redux/types/general";
import { GridApi } from "ag-grid-community";
import { ToastContent, ToastOptions } from "react-toastify/dist/types";
import { toast } from "react-toastify";

interface RefundButtonProps {
	data: ITransaction & { contactName: string }; //add contactName to the interface
	gridApi: GridApi | null;
	toast: (
		content: ToastContent,
		options?: ToastOptions<{}> | undefined
	) => React.ReactText;
}

type Props = RefundButtonProps;

export const REFUNDED = "REFUNDED";

const Button = styled.button`
	background: #465e77;
	border-radius: 10px;
	color: white;
	display: grid;
	place-items: center;
	cursor: pointer;
	width: 100px;
	margin-top: 2px;
	height: 35px;
	transition: all 0.5s ease;
	&:hover {
		background: #293848;
	}

	&:active {
		transition: none;
		background: #465e77;
	}
	&:disabled {
		background: #728daa;
		color: rgb(220, 220, 220);
		cursor: not-allowed;
	}
`;

const RefundButton: React.FC<Props> = ({ data, gridApi }) => {
	return (
		<Button
			disabled={data.state === REFUNDED}
			onClick={() => {
				if (gridApi) {
					// target the particular row and change the state to Refunded
					let newResult = { ...data, state: REFUNDED };
					toast.success("Status updated", { autoClose: 500 });
					gridApi.applyTransactionAsync({ update: [newResult] });
				}
			}}
		>
			Refund
		</Button>
	);
};

export default RefundButton;
