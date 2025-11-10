import { useEffect, useMemo, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Field, Info } from 'components';
import { format } from 'date-fns/format';
import clientPromise from 'lib/mongodb';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { Currency, CurrencyAPIData, CurrencySymbol } from 'shared';

type ExtendedCurrency = 'BGN' | Currency;

export async function getServerSideProps() {
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

const toFixed = (value: number, decimals = 2): string => value.toFixed(decimals);

const convert = (data: CurrencyAPIData, value: number, currency: Currency): string => {
	const currencyValue = data?.data?.[currency]?.value;

	if (!currencyValue) {
		return '';
	}

	return toFixed(value * currencyValue);
};

const toBGN = (data: CurrencyAPIData, value: number, currency: ExtendedCurrency): number => {
	if (currency === 'BGN') {
		return value;
	}

	const currencyValue = data?.data?.[currency]?.value;

	if (!currencyValue) {
		return value;
	}

	return value / currencyValue;
};

export default function Home() {
	const [type, setType] = useState<'hourly' | 'monthly' | 'yearly'>('hourly');
	const [currency, setCurrency] = useState<ExtendedCurrency>('BGN');
	const [hourRate, setHourRate] = useState<number | undefined>();
	const [yearRate, setYearRate] = useState<number | undefined>();
	const [insurance, setInsurance] = useState<number | undefined>(4130);
	const [monthlyRate, setMonthlyRate] = useState<number | undefined>();
	const [currencyData, setCurrencyData] = useState<CurrencyAPIData>({});
	const [hoursInMonth, setHoursInMonth] = useState(((365 - 52 * 2 - 20 - 12) / 12) * 8);
	const [advancedMode, setAdvancedMode] = useState(false);
	const [insuranceRate, setInsuranceRate] = useState(27.8);

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

		return result;
	}, [type, hourRate, yearRate, hoursInMonth, monthlyRate]);

	const convertedRatePerHour = useMemo(
		() => toBGN(currencyData, ratePerHour, currency),
		[currency, currencyData, ratePerHour]
	);

	const netSalary = useMemo(() => convertedRatePerHour * hoursInMonth, [hoursInMonth, convertedRatePerHour]);
	const expenses = useMemo(() => (netSalary / 100) * 25, [netSalary]);
	const insuranceAmount = useMemo(
		() => (!insurance ? 0 : (insurance / 100) * insuranceRate),
		[insurance, insuranceRate]
	);

	const quarterlyTaxGround = useMemo(
		() => netSalary * 3 - expenses * 3 - insuranceAmount * 3,
		[expenses, netSalary, insuranceAmount]
	);

	const quarterlyTax = useMemo(() => (quarterlyTaxGround / 100) * 10, [quarterlyTaxGround]);

	const salary = useMemo(
		() => netSalary - insuranceAmount - quarterlyTax / 3,
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
				alt="Photo by Carlos Muza on Unsplash"
				height={1728}
				src="/background.jpg"
				style={{
					height: 'auto',
					left: '50%',
					maxHeight: 'none',
					maxWidth: 'none',
					minHeight: '100%',
					minWidth: '100%',
					opacity: 0.05,
					position: 'fixed',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					width: 'auto',
					zIndex: -1
				}}
				width={2426}
			/>

			<Head>
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css"
					rel="stylesheet"
				/>

				<title>Калкулатор за заплата на фрийлансър/контрактор | Atanas Atanasov | https://atanas.info</title>
			</Head>

			<a
				className="github-fork-ribbon"
				data-ribbon="See code on Github"
				href="https://github.com/scriptex/freelance-salary-calculator"
				title="See code on Github"
			>
				See code on Github
			</a>

			<Box marginTop={10} style={{ minHeight: 'calc(100vh - 9.75rem)', position: 'relative', zIndex: 2 }}>
				<Typography marginBottom={1} textAlign="center" variant="h4">
					Калкулатор за заплата на фрийлансър/контрактор
				</Typography>

				<Typography marginBottom={10} textAlign="center">
					<em>
						според Българското законодателство и{' '}
						<Link
							href="https://nra.bg/wps/portal/nra/taxes/godishen-danak-varhu-dohdite/svobodni-profesii"
							rel="noopener noreferrer"
							target="_blank"
						>
							разпоредбите на НАП
						</Link>
					</em>
				</Typography>

				<Divider style={{ margin: '3rem 0' }} />

				<Grid container display="flex" justifyContent="space-between" marginBottom={2} spacing={2}>
					<Grid size={{ md: 6, sm: 12, xs: 12 }}>
						<Typography marginBottom={2} variant="h5">
							Входни данни:
						</Typography>
					</Grid>

					<Grid size={{ lg: 3, md: 4, sm: 12, xs: 12 }}>
						<FormControlLabel
							control={
								<>
									<Checkbox checked={advancedMode} onChange={() => setAdvancedMode(!advancedMode)} />
								</>
							}
							label="Редакция на входните данни"
							labelPlacement="start"
							style={{ marginLeft: 0 }}
						/>
					</Grid>
				</Grid>

				<Grid alignItems="center" container marginBottom={5} spacing={2}>
					<Grid size={{ md: 3, sm: 6, xs: 12 }}>
						<Typography>
							Заплата:
							<Info text="Възможни са три варианта: Калкулация базирана на заплащане на час, на база месечна заплата или на годишна база." />
						</Typography>
					</Grid>

					<Grid size={{ md: 3, sm: 6, xs: 12 }}>
						<FormControlLabel
							control={<Switch checked={type === 'hourly'} onChange={() => setType('hourly')} />}
							label="На час"
						/>
					</Grid>

					<Grid size={{ md: 3, sm: 6, xs: 12 }}>
						<FormControlLabel
							control={<Switch checked={type === 'monthly'} onChange={() => setType('monthly')} />}
							label="На месец"
						/>
					</Grid>

					<Grid size={{ md: 3, sm: 6, xs: 12 }}>
						<FormControlLabel
							control={<Switch checked={type === 'yearly'} onChange={() => setType('yearly')} />}
							label="На година"
						/>
					</Grid>
				</Grid>

				<Grid alignItems="center" container marginBottom={5} spacing={2}>
					<Grid size={{ md: 3, sm: 6, xs: 12 }}>
						<FormControl fullWidth>
							<InputLabel id="currency-select-label">Валута</InputLabel>

							<Select
								id="currency-select"
								label="Валута"
								onChange={e => setCurrency(e.target.value as ExtendedCurrency)}
								value={currency}
							>
								<MenuItem value="BGN">BGN</MenuItem>
								<MenuItem value="EUR">EUR</MenuItem>
								<MenuItem value="USD">USD</MenuItem>
								<MenuItem value="GBP">GBP</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid size={{ md: 3, sm: 6, xs: 12 }}>
						{type === 'hourly' && (
							<Field
								label="Часова ставка"
								onChange={setHourRate}
								suffix={CurrencySymbol[currency]}
								value={hourRate}
							/>
						)}

						{type === 'monthly' && (
							<Field
								label="Месечна заплата"
								onChange={setMonthlyRate}
								suffix={CurrencySymbol[currency]}
								value={monthlyRate}
							/>
						)}

						{type === 'yearly' && (
							<Field
								label="Годишна заплата"
								onChange={setYearRate}
								suffix={CurrencySymbol[currency]}
								value={yearRate}
							/>
						)}
					</Grid>

					<Grid size={{ md: advancedMode ? 2 : 3, sm: 6, xs: 12 }}>
						<Field
							disabled={!advancedMode}
							label="Осигурителен праг"
							onChange={setInsurance}
							suffix={CurrencySymbol.BGN}
							value={insurance}
						/>
					</Grid>

					<Grid size={{ md: advancedMode ? 2 : 3, sm: 6, xs: 12 }}>
						<Field
							disabled={!advancedMode}
							label="Работни часове за един месец"
							onChange={setHoursInMonth}
							suffix={
								<Info text="При 8 часов работен ден на базата на 365 дни в годината минус 52 уикенда, 20 дни отпуск и 12 национални празника. (365 - 52*2 - 20 - 12) / 12 * 8" />
							}
							value={hoursInMonth}
						/>
					</Grid>

					{advancedMode && (
						<Grid justifySelf="flex-end" size={{ md: 2, sm: 6, xs: 12 }}>
							<Field
								label="Осигурителни вноски"
								onChange={setInsuranceRate}
								suffix="%"
								value={insuranceRate}
							/>
						</Grid>
					)}
				</Grid>

				<Divider style={{ margin: '2rem 0 3rem' }} />

				{!ratePerHour ? null : (
					<>
						<Grid container marginBottom={2} spacing={2}>
							<Grid size={{ sm: 6, xs: 12 }}>
								<Typography variant="h5">Резултати</Typography>

								<List>
									<ListItem disableGutters>
										<ListItemText
											primary="Брутна заплата: "
											secondary={`${toFixed(netSalary)} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Признати разходи (25%): "
											secondary={`${toFixed(expenses)} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Осигуровки (27.8%): "
											secondary={`${toFixed(insuranceAmount)} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Данъчна основа за тримесечие: "
											secondary={`${toFixed(quarterlyTaxGround)} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>

									<ListItem disableGutters>
										<ListItemText
											primary="Данък за тримесечие: "
											secondary={`${toFixed(quarterlyTax)} ${CurrencySymbol.BGN}`}
										/>
									</ListItem>
								</List>
							</Grid>

							<Grid size={{ sm: 6, xs: 12 }}>
								<Typography variant="h5">Остатък на месец:</Typography>

								<List>
									<ListItem disableGutters>
										<ListItemAvatar>
											<Avatar>{CurrencySymbol.BGN.slice(0, 2)}</Avatar>
										</ListItemAvatar>

										<ListItemText
											primary="В лева"
											secondary={`${toFixed(salary)} ${CurrencySymbol.BGN}`}
										/>
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
											<Typography fontSize={12} marginBottom={1}>
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
