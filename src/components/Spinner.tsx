import React from "react";
import styled, { keyframes } from "styled-components";

interface SpinnerProps {
	pixelSize?: number;
	padding?: string;
	thickness?: number;
}

type Props = SpinnerProps;

interface WrapperProps {
	customPadding: string;
}
interface LoaderProps {
	pixelSize: number;
	thickness: number;
}

const Wrapper = styled.div<WrapperProps>`
	padding: ${(props) => props.customPadding};
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div<LoaderProps>`
	text-align: center;
	margin: auto;
	border: ${(props) => props.thickness}px solid transparent; /* Light grey */
	border-top: ${(props) => props.thickness}px solid white; /* Blue */
	border-right: ${(props) => props.thickness}px solid white; /* Blue */
	border-bottom: ${(props) => props.thickness}px solid white; /* Blue */
	border-radius: 50%;
	animation: ${spin} 2s linear infinite;
	width: ${(props) => props.pixelSize}px;
	height: ${(props) => props.pixelSize}px;
`;

const Spinner: React.FC<Props> = ({
	pixelSize = 15,
	padding = "5px 0",
	thickness = 2,
}) => {
	return (
		<Wrapper customPadding={padding}>
			<Loader pixelSize={pixelSize} thickness={thickness} />
		</Wrapper>
	);
};

export default Spinner;
