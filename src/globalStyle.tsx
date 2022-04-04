import { createGlobalStyle } from "styled-components";

export const phoneUpperBoundary = 576;
export const smallTabletUpperBoundary = 768;
export const tabletPortraitUpperBoundary = 900;
export const tabletLandscapeUpperBoundary = 1200;
export const desktopUpperBoundary = 1800;

const GlobalStyle = createGlobalStyle`
 
.ag-header {
  /* height: 25px !important;
  min-height: 25px !important; */
  background: #273c4d !important;
  border-top: 1px solid white !important;
  border-bottom: 1px solid white !important;
 
}

.ag-header-cell {
  font-size: 13px !important;
   color: white !important;
}
.ag-theme-alpine .ag-header-icon {
  color: white !important;
}
.ag-body-horizontal-scroll {
    height: 8px !important;
    max-height: 8px !important;
    min-height: 8px !important;
  }

  .ag-body-horizontal-scroll-viewport {
    height: 8px !important;
    max-height: 8px !important;
    min-height: 8px !important;
  }

 .ag-body-viewport {
    margin-right: 6px;
  }

  .ag-body-viewport,
  .ag-body-horizontal-scroll-viewport {
    &::-webkit-scrollbar {
      width: 12px !important;
      height: 8px !important;
    }
    &::-webkit-scrollbar-thumb {
      background: rgb(150, 159, 165) !important;
      border-radius: 10px !important;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #93a7c0 !important;
    }
  }

.cell-delta-order-highlight-positive {
  /* background-color: #273c4d !important; */
  transition: background-color 0.1s;
  color: red !important;
}

`;

export default GlobalStyle;
