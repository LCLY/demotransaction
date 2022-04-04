import React from "react";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import { ITransaction } from "../redux/types/general";
import RefundButton from "../components/RefundButton";
import useWindowDimensions from "./CheckWindowSize";
import { smallTabletUpperBoundary } from "../globalStyle";

interface TableProps {
	columnDefs: any;
	onGridReady: any;
	gridApi: any;
}

type Props = TableProps;

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

const Table: React.FC<Props> = ({ gridApi, columnDefs, onGridReady }) => {
	const { width } = useWindowDimensions();

	return (
		<Wrapper className='ag-theme-alpine'>
			<AgGridReact
				defaultColDef={{
					sortable: true,
					resizable: true,
				}}
				columnDefs={columnDefs}
				onGridReady={onGridReady}
				getRowNodeId={function (data: ITransaction) {
					return `${data.id}`;
				}}
				onGridSizeChanged={() => {
					if (width > smallTabletUpperBoundary) {
						if (gridApi) {
							gridApi.sizeColumnsToFit();
						}
					}
				}}
				frameworkComponents={{
					btnCellRenderer: RefundButton,
				}}
			></AgGridReact>
		</Wrapper>
	);
};

export default Table;
