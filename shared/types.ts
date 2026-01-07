export enum CurrencySymbol {
	AUD = 'A$',
	CAD = 'C$',
	CHF = '₣',
	CNY = '¥',
	EUR = '€',
	GBP = '£',
	// eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
	JPY = '¥',
	USD = '$'
}

export type Currency = keyof typeof CurrencySymbol;

export type CurrencyData = {
	code: Currency;
	value: number;
};

export type CurrencyAPIData = {
	data?: Record<Currency, CurrencyData>;
	meta?: {
		last_updated_at?: string;
	};
	timestamp?: string;
	type?: 'apiData';
};
