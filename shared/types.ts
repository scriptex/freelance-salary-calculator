export type Currency = 'EUR' | 'GBP' | 'USD';

export enum CurrencySymbol {
	EUR = '€',
	GBP = '£',
	USD = '$',
	BGN = 'лв.'
}

export type CurrencyData = {
	code: Currency;
	value: number;
};

export type CurrencyAPIData = {
	meta?: {
		last_updated_at?: string;
	};
	type?: 'apiData';
	data?: Record<Currency, CurrencyData>;
	timestamp?: string;
};
