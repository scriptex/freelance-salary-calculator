export enum CurrencySymbol {
	AUD = 'A$',
	CAD = 'C$',
	CHF = '₣',
	CNY = 'CN¥',
	EUR = '€',
	GBP = '£',
	JPY = 'JP¥',
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
