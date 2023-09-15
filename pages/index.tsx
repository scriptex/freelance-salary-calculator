import format from 'date-fns/format';
import { useEffect, useState, useMemo } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import type { InferGetServerSidePropsType } from 'next';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/system/Container';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FormControlLabel from '@mui/material/FormControlLabel';

import clientPromise from 'lib/mongodb';
import { Info, Field } from 'components';
import { Currency, CurrencySymbol, CurrencyAPIData } from 'shared';

type ExtendedCurrency = Currency | 'BGN';

export async function getServerSideProps(context?: unknown) {
	try {
		await clientPromise;

		return {
			props: { isConnected: true }
		};
	} catch (e) {
		console.error(e);

		return {
			props: { isConnected: false }
		};
	}
}

const convert = (data: CurrencyAPIData, value: number, currency: Currency): string => {
	const currencyValue = data?.data?.[currency]?.value;

	if (!currencyValue) {
		return '';
	}

	return Math.round(value * currencyValue).toString();
};

const toBGN = (data: CurrencyAPIData, value: number, currency: ExtendedCurrency): number => {
	if (currency === 'BGN') {
		return value;
	}

	const currencyValue = data?.data?.[currency]?.value;

	if (!currencyValue) {
		return value;
	}

	return Math.round(value / currencyValue);
};

export default function Home({ isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [type, setType] = useState<'hourly' | 'yearly' | 'monthly'>('hourly');
	const [currency, setCurrency] = useState<ExtendedCurrency>('BGN');
	const [hourRate, setHourRate] = useState<number | undefined>();
	const [yearRate, setYearRate] = useState<number | undefined>();
	const [insurance, setInsurance] = useState<number | undefined>(3400);
	const [monthlyRate, setMonthlyRate] = useState<number | undefined>();
	const [currencyData, setCurrencyData] = useState<CurrencyAPIData>({});
	const [hoursInMonth, setHoursInMonth] = useState(Math.round(((365 - 52 * 2 - 20 - 12) / 12) * 8));
	const [advancedMode, setAdvancedMode] = useState(false);

	const ratePerHour: number = useMemo(() => {
		let result = 0;

		switch (type) {
			case 'hourly':
				result = hourRate ?? 0;
				break;

			case 'monthly':
				result = !monthlyRate ? 0 : monthlyRate / hoursInMonth;
				break;

			case 'yearly':
				result = !yearRate ? 0 : yearRate / hoursInMonth / 12;
		}

		return Math.round(result);
	}, [type, hourRate, yearRate, hoursInMonth, monthlyRate]);

	const convertedRatePerHour = useMemo(
		() => toBGN(currencyData, ratePerHour, currency),
		[currency, currencyData, ratePerHour]
	);

	const netSalary = useMemo(() => convertedRatePerHour * hoursInMonth, [hoursInMonth, convertedRatePerHour]);
	const expenses = useMemo(() => Math.round(netSalary / 100) * 25, [netSalary]);
	const insuranceAmount = useMemo(() => (!insurance ? 0 : (insurance / 100) * 27.8), [insurance]);

	const quarterlyTaxGround = useMemo(
		() => Math.round(netSalary * 3 - expenses * 3 - insuranceAmount * 3),
		[expenses, netSalary, insuranceAmount]
	);

	const quarterlyTax = useMemo(() => Math.round((quarterlyTaxGround / 100) * 10), [quarterlyTaxGround]);

	const salary = useMemo(
		() => Math.round(netSalary - insuranceAmount - quarterlyTax / 3),
		[netSalary, quarterlyTax, insuranceAmount]
	);

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		fetch('/api/data', { signal })
			.then(r => r.json())
			.then(setCurrencyData);

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<Container>
			<Image
				src="/background.jpg"
				alt="Photo by Carlos Muza on Unsplash"
				width={2426}
				height={1728}
				style={{
					position: 'fixed',
					top: '50%',
					left: '50%',
					zIndex: -1,
					opacity: 0.05,
					width: 'auto',
					height: 'auto',
					minWidth: '100%',
					minHeight: '100%',
					maxWidth: 'none',
					maxHeight: 'none',
					transform: 'translate(-50%, -50%)'
				}}
			/>

			<Head>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
				/>

				<title>Калкулатор за заплата на фрийлансър/контрактор | Atanas Atanasov | https://atanas.info</title>
			</Head>

			<a
				href="https://github.com/scriptex/freelance-salary-calculator"
				title="See code on Github"
				className="github-fork-ribbon"
				data-ribbon="See code on Github"
			>
				See code on Github
			</a>

			<Box marginTop={10} style={{ minHeight: 'calc(100vh - 9.75rem)', position: 'relative', zIndex: 2 }}>
				<Typography variant="h4" marginBottom={1} textAlign="center">
					Калкулатор за заплата на фрийлансър/контрактор
				</Typography>

				<Typography marginBottom={10} textAlign="center">
					<em>
						според Българското законодателство и{' '}
						<Link
							href="https://nra.bg/wps/portal/nra/taxes/godishen-danak-varhu-dohdite/svobodni-profesii"
							target="_blank"
							rel="noopener noreferrer"
						>
							разпоредбите на НАП
						</Link>
					</em>
				</Typography>

				<Divider style={{ margin: '3rem 0' }} />

				<Typography variant="h5" marginBottom={2}>
					Входни данни:
				</Typography>

				<Grid container spacing={2} alignItems="center" marginBottom={5}>
					<Grid item xs={12} sm={6} md={3}>
						<Typography>
							Заплата:
							<Info text="Възможни са три варианта: Калкулация базирана на заплащане на час, на база месечна заплата или на годишна база." />
						</Typography>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<FormControlLabel
							label="На час"
							control={<Switch checked={type === 'hourly'} onChange={() => setType('hourly')} />}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<FormControlLabel
							label="На месец"
							control={<Switch checked={type === 'monthly'} onChange={() => setType('monthly')} />}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<FormControlLabel
							label="На година"
							control={<Switch checked={type === 'yearly'} onChange={() => setType('yearly')} />}
						/>
					</Grid>
				</Grid>

				<Grid container spacing={2} alignItems="center" marginBottom={5}>
					<Grid item xs={12} sm={6} md={3}>
						<FormControl fullWidth>
							<InputLabel id="currency-select-label">Валута</InputLabel>

							<Select
								id="currency-select"
								label="Валута"
								value={currency}
								onChange={e => setCurrency(e.target.value as ExtendedCurrency)}
							>
								<MenuItem value="BGN">BGN</MenuItem>
								<MenuItem value="EUR">EUR</MenuItem>
								<MenuItem value="USD">USD</MenuItem>
								<MenuItem value="GBP">GBP</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						{type === 'hourly' && (
							<Field
								label="Часова ставка"
								value={hourRate}
								suffix={CurrencySymbol[currency]}
								onChange={setHourRate}
							/>
						)}

						{type === 'monthly' && (
							<Field
								label="Месечна заплата"
								value={monthlyRate}
								suffix={CurrencySymbol[currency]}
								onChange={setMonthlyRate}
							/>
						)}

						{type === 'yearly' && (
							<Field
								label="Годишна заплата"
								value={yearRate}
								suffix={CurrencySymbol[currency]}
								onChange={setYearRate}
							/>
						)}
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Field
							label="Осигурителен праг"
							value={insurance}
							suffix={CurrencySymbol.BGN}
							onChange={setInsurance}
						/>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Field
							label="Работни часове за един месец"
							value={hoursInMonth}
							disabled={!advancedMode}
							onChange={setHoursInMonth}
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={12} justifyContent="flex-end" display="flex">
						<FormControlLabel
							label="Редакция на работните часове за един месец"
							control={
								<>
									<Checkbox checked={advancedMode} onChange={() => setAdvancedMode(!advancedMode)} />

									<Info text="При 8 часов работен ден на базата на 365 дни в годината минус 52 уикенда, 20 дни отпуск и 12 национални празника. (365 - 52*2 - 20 - 12) / 12 * 8" />
								</>
							}
							labelPlacement="start"
						/>
					</Grid>
				</Grid>

				<Divider style={{ margin: '2rem 0 3rem' }} />

				{!ratePerHour ? null : (
					<>
						<Grid container spacing={2} marginBottom={2}>
							<Grid item xs={12} sm={6}>
								<Typography variant="h5">Резултати</Typography>

								<List>
									<ListItem disableGutters>
										<ListItemText
											primary="Брутна заплата: "
											secondary={`${netSalary} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Признати разходи (25%): "
											secondary={`${expenses} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Осигуровки (27.8%): "
											secondary={`${insuranceAmount} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Данъчна основа за тримесечие: "
											secondary={`${quarterlyTaxGround} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Данък за тримесечие: "
											secondary={`${quarterlyTax} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>
								</List>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Typography variant="h5">Остатък на месец:</Typography>

								<List>
									<ListItem disableGutters>
										<ListItemAvatar>
											<Avatar>{CurrencySymbol.BGN.slice(0, 2)}</Avatar>
										</ListItemAvatar>

										<ListItemText primary="В лева" secondary={`${salary} ${CurrencySymbol.BGN}`} />
									</ListItem>

									<ListItem disableGutters>
										<ListItemAvatar>
											<Avatar>{CurrencySymbol.EUR}</Avatar>
										</ListItemAvatar>

										<ListItemText
											primary="В евро"
											secondary={`${CurrencySymbol.EUR} ${convert(currencyData, salary, 'EUR')}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemAvatar>
											<Avatar>{CurrencySymbol.USD}</Avatar>
										</ListItemAvatar>

										<ListItemText
											primary="В долари"
											secondary={`${CurrencySymbol.USD} ${convert(currencyData, salary, 'USD')}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemAvatar>
											<Avatar>{CurrencySymbol.GBP}</Avatar>
										</ListItemAvatar>

										<ListItemText
											primary="В британски лири"
											secondary={`${CurrencySymbol.GBP} ${convert(currencyData, salary, 'GBP')}`}
										/>
									</ListItem>

									{currencyData?.meta?.last_updated_at && (
										<ListItem disableGutters>
											<Typography marginBottom={1} fontSize={12}>
												<em>
													Валутните курсове са обновени на{' '}
													{format(new Date(currencyData.meta.last_updated_at), 'dd MMM yyyy')}
												</em>
											</Typography>
										</ListItem>
									)}
								</List>
							</Grid>
						</Grid>

						<Divider style={{ margin: '0 0 2rem' }} />
					</>
				)}
			</Box>

			<social-links style={{ display: 'block', paddingBottom: '2rem', position: 'relative', zIndex: 2 }} />

			<Script src="https://www.googletagmanager.com/gtag/js?id=G-9BK5WF0JQK" />

			<Script id="google-analytics">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'G-9BK5WF0JQK');
				`}
			</Script>
		</Container>
	);
}
