import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { Currency, CurrencySymbol, Data } from 'pages/api/types';

type Props = {
	data?: Data;
	value: number;
	currency: Currency;
};

const Converter: FC<Readonly<Props>> = ({ data, value, currency }: Props) => {
	const currencyValue = data?.data?.data[currency]?.value;

	if (!currencyValue) {
		return null;
	}

	return (
		<Typography marginBottom={1}>
			{CurrencySymbol[currency]} <span>{Math.round(value * currencyValue)}</span>
		</Typography>
	);
};

export default Converter;
