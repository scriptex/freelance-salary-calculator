import 'normalize.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import Head from 'next/head';
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
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
				<link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
				<link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
				<link rel="icon" type="image/png" href="/favicons/favicon-128x128.png" sizes="128x128" />
				<link rel="shortcut icon" type="image/x-icon" href="/favicons/favicon.ico" />
				<meta name="theme-color" content="#90caf9" />
				<meta name="msapplication-TileColor" content="#90caf9" />
				<meta name="application-name" content="Freelance Salary Calculator" />
				<meta name="msapplication-TileImage" content="/favicons/ms-tile-144x144.png" />
				<meta name="msapplication-square70x70logo" content="/favicons/ms-tile-70x70.png" />
				<meta name="msapplication-square150x150logo" content="/favicons/ms-tile-150x150.png" />
				<meta name="msapplication-wide310x150logo" content="/favicons/ms-tile-310x150.png" />
				<meta name="msapplication-square310x310logo" content="/favicons/ms-tile-310x310.png" />
				<meta name="msapplication-config" content="/config.xml" />
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2048x2732.png"
					media="(device-width: 2048px) and (device-height: 2732px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2732x2048.png"
					media="(device-width: 2732px) and (device-height: 2048px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1668x2388.png"
					media="(device-width: 1668px) and (device-height: 2388px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2388x1668.png"
					media="(device-width: 2388px) and (device-height: 1668px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1668x2224.png"
					media="(device-width: 1668px) and (device-height: 2224px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2224x1668.png"
					media="(device-width: 2224px) and (device-height: 1668px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1536x2048.png"
					media="(device-width: 1536px) and (device-height: 2048px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2048x1536.png"
					media="(device-width: 2048px) and (device-height: 1536px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1536x2048.png"
					media="(device-width: 1536px) and (device-height: 2048px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2048x1536.png"
					media="(device-width: 2048px and (device-height: 1536px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1242x2688.png"
					media="(device-width: 1242px and (device-height: 2688px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2688x1242.png"
					media="(device-width: 2688px) and (device-height: 142px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1125x2436.png"
					media="(device-width: 1125px) and (device-height: 236px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2436x1125.png"
					media="(device-width: 2436px) and (device-height: 1125px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-828x1792.png"
					media="(device-width: 828px) and (device-height: 192px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1792x828.png"
					media="(device-width: 1792px) and (device-height: 28px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1125x2436.png"
					media="(device-width: 1125px) and (device-height: 236px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2436x1125.png"
					media="(device-width: 2436px and (device-height: 1125px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1242x2208.png"
					media="(device-width: 1242px and (device-height: 2208px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2208x1242.png"
					media="(device-width: 2208px) and (device-height: 1242px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-750x1334.png"
					media="(device-width: 750px) and (device-height: 134px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1334x750.png"
					media="(device-width: 1334px and (device-height: 750px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1242x2208.png"
					media="(device-width: 1242px and (device-height: 2208px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2208x1242.png"
					media="(device-width: 2208px) and (device-height: 1242px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-750x1334.png"
					media="(device-width: 750px) and (device-height: 134px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1334x750.png"
					media="(device-width: 1334px and (device-height: 750px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1242x2208.png"
					media="(device-width: 1242px and (device-height: 2208px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-2208x1242.png"
					media="(device-width: 2208px) and (device-height: 1242px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-750x1334.png"
					media="(device-width: 750px) and (device-height: 134px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1334x750.png"
					media="(device-width: 1334px) and (device-height: 50px) and (orientation: landscape)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-640x1136.png"
					media="(device-width: 640px) and (device-height: 136px) and (orientation: portrait)"
				/>
				<link
					rel="apple-touch-startup-image"
					href="/launch-screens/launch-screen-1136x640.png"
					media="(device-width: 1136px) and (device-height: 640px) and (orientation: landscape)"
				/>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="mobile-web-app-capable" content="yes" />
			</Head>

			<CssBaseline />

			<Component {...pageProps} />
		</ThemeProvider>
	);
}
