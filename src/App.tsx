import React, { useState, useMemo, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import * as actions from "./redux/actions/index";
import { RootState } from "./index";
import styled from "styled-components";
import { ITransaction } from "./redux/types/general";
import Spinner from "./components/Spinner";
import Table from "./containers/Table";
import { GridApi, ColumnApi } from "ag-grid-community";
import moment from "moment";
import FileSaver from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import { StateChgRenderer } from "./containers/StateChgRenderer";
import { REFUNDED } from "./components/RefundButton";
import {
	phoneUpperBoundary,
	smallTabletUpperBoundary,
	tabletPortraitUpperBoundary,
} from "./globalStyle";
// in case we want to pass props from parent
interface AppProps {}

export type TAggridITransaction = ITransaction & { contactName: string };

type Props = AppProps & DispatchProps & StateProps;

const Navbar = styled.div`
	background: #141d36;
	width: 100vw;
	height: 70px;
	display: flex;
	align-items: center;

	& h1 {
		color: white;
		margin: 0 !important;
		font-size: 27px;
		padding-left: 15px;
	}
`;
const Body = styled.div`
	height: calc(100vh - 110px);
	width: calc(100vw - 40px);
	padding: 20px;
	display: grid;
	place-items: center;
	background: #16cd88;
	& img {
		/* small phone  */
		@media (max-width: ${phoneUpperBoundary}px) {
			width: 100%;
		}
		/* small tablet */
		@media (min-width: ${phoneUpperBoundary}px) {
			width: 100%;
		}
		/* portrait */
		@media (min-width: ${smallTabletUpperBoundary}px) {
			width: 100%;
		}
		/* landscape */
		@media (min-width: ${tabletPortraitUpperBoundary}px) {
			width: 60%;
		}
	}
`;

const ImageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;

	/* small phone */
	@media (max-width: ${phoneUpperBoundary}px) {
		transform: translateY(-100px);
	}
	/* small tablet */
	@media (min-width: ${phoneUpperBoundary}px) {
		transform: translateY(-30px);
	}
	/* portrait */
	@media (min-width: ${smallTabletUpperBoundary}px) {
		transform: translateY(-40px);
	}
`;

const Button = styled.button`
	background: white;
	width: 300px;
	height: 60px;
	border: none;
	border-radius: 10px;
	font-size: 20px;
	display: grid;
	place-items: center;
	font-weight: bolder;
	cursor: pointer;
	transition: all 0.5s ease;
	user-select: none;
	color: black;
	z-index: 2;

	&:hover {
		color: rgb(40, 56, 99);
		box-shadow: 3px 5px 5px 2px rgba(0, 0, 0, 0.433);
		transform: translateY(-5px);
	}

	&:active {
		color: black;
		transition: none;
		box-shadow: none;
		transform: translateY(0);
	}
`;

const TableWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* padding: 200px; */
`;

const TableTop = styled.div`
	display: flex;

	align-items: center;
	width: 100%;
	margin-bottom: 15px;

	/* small phone  */
	@media (max-width: ${phoneUpperBoundary}px) {
		flex-direction: column;
		justify-content: center;
	}
	/* small tablet */
	@media (min-width: ${phoneUpperBoundary}px) {
		flex-direction: column;
		justify-content: center;
	}
	/* portrait */
	@media (min-width: ${smallTabletUpperBoundary}px) {
		flex-direction: row;
		justify-content: space-between;
	}
	/* landscape */
	@media (min-width: ${tabletPortraitUpperBoundary}px) {
		flex-direction: row;
		justify-content: space-between;
	}
`;

const ResultDiv = styled.div`
	font-size: 20px;
	font-weight: bolder;
	white-space: nowrap;

	/* small phone  */
	@media (max-width: ${phoneUpperBoundary}px) {
		margin-bottom: 10px;
	}
	/* small tablet */
	@media (min-width: ${phoneUpperBoundary}px) {
		margin-bottom: 10px;
	}
`;
const ButtonDiv = styled.div`
	display: flex;
	width: 100%;
	/* small phone  */
	@media (max-width: ${phoneUpperBoundary}px) {
		justify-content: space-between;
	}
	/* small tablet */
	@media (min-width: ${phoneUpperBoundary}px) {
		justify-content: space-between;
	}
	/* portrait */
	@media (min-width: ${smallTabletUpperBoundary}px) {
		justify-content: flex-end;
	}
	/* landscape */
	@media (min-width: ${tabletPortraitUpperBoundary}px) {
		justify-content: flex-end;
	}
`;

interface ResetButtonProps {
	marginRight: number;
}
const ResetButton = styled.div<ResetButtonProps>`
	background: white;
	width: 150px;
	height: 40px;
	border-radius: 10px;
	font-size: 15px;
	display: grid;
	place-items: center;
	font-weight: bolder;
	cursor: pointer;
	transition: all 0.5s ease;
	user-select: none;
	color: black;
	z-index: 2;
	margin-right: ${(props) => props.marginRight}px;

	&:hover {
		color: rgb(40, 56, 99);
		box-shadow: 3px 5px 5px 2px rgba(0, 0, 0, 0.433);
		transform: translateY(-5px);
	}

	&:active {
		color: black;
		transition: none;
		box-shadow: none;
		transform: translateY(0);
	}

	/* small phone  */
	@media (max-width: ${phoneUpperBoundary}px) {
		width: 30%;
	}
	/* small tablet */
	@media (min-width: ${phoneUpperBoundary}px) {
		width: 30%;
	}
	/* portrait */
	@media (min-width: ${smallTabletUpperBoundary}px) {
		width: 150px;
	}
	/* landscape */
	@media (min-width: ${tabletPortraitUpperBoundary}px) {
		width: 150px;
	}
`;

const App: React.FC<Props> = ({ transactions, onGetTransactions }) => {
	/* ================================================== */
	/*  state */
	/* ================================================== */
	const [loading, setLoading] = useState(false);
	const [prevGridState, setPrevGridState] = useState<
		TAggridITransaction[] | null
	>(null);
	const [gridApi, setGridApi] = useState<GridApi | null>(null);
	const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | null>(null);

	const createUpdateDateFormat = (params: any) => {
		if (params.value === null || params.value === undefined) {
			return "";
		}
		return moment(params.value).format("YYYY-MM-DD | HH:mm:ss");
	};

	const columnDefs = useMemo(
		() => [
			{
				headerName: "Action",
				cellRenderer: "btnCellRenderer",
				cellRendererParams: {
					gridApi: gridApi,
					toast: toast,
				},
				width: 150,
				minWidth: 150,
			},
			{
				headerName: "Initiator",
				field: "contactName",
			},
			{
				headerName: "Provider",
				field: "provider",
			},
			{
				headerName: "Currency",
				field: "currency",
			},
			{
				headerName: "Vendor",
				field: "vendor",
				filter: true,
			},
			{
				headerName: "Status",
				field: "state",
				filter: true,
				cellRenderer: StateChgRenderer as any,
			},
			{
				headerName: "Created",
				field: "created",
				valueFormatter: createUpdateDateFormat,
			},
			{
				headerName: "Updated",
				field: "updated",
				valueFormatter: createUpdateDateFormat,
			},
		],
		[gridApi]
	);

	/* ================================================== */
	/*  method */
	/* ================================================== */

	const onGridReady = (params: any) => {
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	const createCsv = useCallback(() => {
		let columnHeaderArray: any[] = [];
		Object.values(columnDefs)
			.slice(1)
			.forEach((child) => {
				columnHeaderArray.push(child.headerName);
			});

		let columnHeader = columnHeaderArray.join(",");
		// build the header of the CSV
		let resultCSV = `Pomelo Transactions\r\n${columnHeader}\r\n`;

		let rowItem = "";

		// loop through all the data and string them together using CSV format
		if (gridApi) {
			gridApi.forEachNode((rowNode) => {
				let colItem = "";
				Object.values(columnDefs).forEach((columnObj) => {
					if (columnObj.field !== undefined) {
						let columnData = rowNode.data[columnObj.field];

						if (columnData === null || columnData === undefined) {
							colItem += "";
							colItem += ",";
						} else {
							colItem += columnData + ",";
						}
					}
				});
				colItem = colItem.slice(0, rowItem.length - 1);
				rowItem += colItem + "\r\n";
			});
		}

		resultCSV += rowItem;
		return resultCSV;
	}, [gridApi, columnDefs]);

	const csvExport = () => {
		// set the title of the pdf
		let resultCsv = createCsv();
		let fileTitle = `Pomelo Transactions-${moment().format("YYYYMMDDHHmm")}`;

		const csvData = new Blob([resultCsv as any], {
			type: "text/csv;charset=utf-8;",
		});
		FileSaver.saveAs(csvData, `${fileTitle}.csv`);
	};

	const refundAll = () => {
		// loop through every rowNode

		if (gridApi) {
			let updatedNodeArray: TAggridITransaction[] = [];
			gridApi.forEachNode((rowNode) => {
				let rowNodeData: TAggridITransaction = rowNode.data;
				updatedNodeArray.push({ ...rowNodeData, state: REFUNDED });
			});
			// update everything at once

			gridApi.applyTransactionAsync({ update: updatedNodeArray });
			toast.success("Refunded All", { autoClose: 500 });
		}
	};

	/* ================================================== */
	/*  useEffect */
	/* ================================================== */

	useEffect(() => {
		// if transactions is not null, then stop the loading
		if (transactions) {
			setLoading(false);
			let newGridArray: any = [];

			// spread the object and add a contactName object that extracts the initiator name out
			transactions.forEach((child) => {
				newGridArray.push({
					...child,
					contactName: child.initiatorDetails.contactName,
				});
			});

			// make sure gridApi has already been initialized
			if (gridApi) {
				setPrevGridState(newGridArray); //store the prev state for resetting grid
				gridApi.setRowData(newGridArray); //update the grid
			}
		}
	}, [transactions, gridApi]);

	/* ================================================== */
	/* ================================================== */
	return (
		<div className='App' data-test='appComponent'>
			<ToastContainer limit={1} position='bottom-right' />
			<Navbar>
				<h1>Pomelo Transactions</h1>
			</Navbar>
			<Body>
				{loading ? (
					<Spinner pixelSize={50} thickness={5} />
				) : (
					<>
						{transactions ? (
							<TableWrapper>
								<TableTop>
									<ResultDiv>
										Result(s) :{" "}
										{transactions
											? `${transactions.length} transactions`
											: "loading..."}
									</ResultDiv>
									<ButtonDiv>
										<ResetButton
											marginRight={10}
											onClick={() => {
												refundAll();
											}}
										>
											Refund All
										</ResetButton>
										<ResetButton
											marginRight={10}
											onClick={() => {
												toast.info("Grid Reset", {
													autoClose: 500,
												});
												toast.clearWaitingQueue(); //clear all other toasts when reset grid is set

												if (gridColumnApi && gridApi) {
													// reset grid back to prev State
													if (prevGridState) {
														gridApi.setRowData(prevGridState);
													}
													gridColumnApi.resetColumnState();
												}
											}}
										>
											Reset Grid
										</ResetButton>
										<ResetButton
											marginRight={0}
											onClick={() => {
												toast.info("Exporting PDF", { autoClose: 500 });
												csvExport();
											}}
										>
											Export PDF
										</ResetButton>
									</ButtonDiv>
								</TableTop>
								<Table
									gridApi={gridApi}
									onGridReady={onGridReady}
									columnDefs={columnDefs}
								/>
							</TableWrapper>
						) : (
							<>
								<ImageWrapper>
									<img
										alt='background'
										src={process.env.PUBLIC_URL + `/images/transaction2.png`}
									/>

									<Button
										onClick={() => {
											setLoading(true);
											onGetTransactions();
										}}
									>
										Click to Load Transactions
									</Button>
								</ImageWrapper>
							</>
						)}
					</>
				)}
			</Body>
		</div>
	);
};

interface StateProps {
	transactions?: ITransaction[] | null;
}

const mapStateToProps = (state: RootState): StateProps | void => {
	return {
		transactions: state.generalReducer.transactions,
	};
};

interface DispatchProps {
	onGetTransactions: typeof actions.getTransactions;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		onGetTransactions: () => dispatch(actions.getTransactions()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
