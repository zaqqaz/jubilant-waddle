import React from "react";
import {StyledComponentsRegistry} from "@/lib/registry";

import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;

type Props = {
    Component: React.ComponentType;
    pageProps: any;
}

const RootLayout: React.FC<Props> = (props) => {
    const {Component, pageProps} = props;

    return (
        <>
            <StyledComponentsRegistry>
                <GlobalStyle/>
                <Component {...pageProps} />
            </StyledComponentsRegistry>
        </>
    )
}
export default RootLayout;
