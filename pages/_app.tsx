import 'normalize.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import type { JSX } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
});

type ExtendedAppProps = AppProps & { Component: JSX.Element };

export default function App({ Component, pageProps }: ExtendedAppProps) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
