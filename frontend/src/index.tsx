import React from 'react';
import reportWebVitals from './reportWebVitals';
import {createRoot} from "react-dom/client";
import App from "./App";
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme({
    palette: {
      background: {
        default: '#DAA520', // Set your universal background color here
      },
      text: {
        primary: '#000000', // Set the default text color if needed
      },
    },
  });

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <App/>
            </CssBaseline>
        </ThemeProvider>
    
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
