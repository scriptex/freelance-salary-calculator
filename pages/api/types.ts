export type Currency = 'EUR' | 'GBP' | 'USD';

export enum CurrencySymbol {
    EUR = '€',
    GBP = '£',
    USD = '$',
}

export type CurrencyData = {
    code: Currency;
    value: number;
};

export type Data = {
    timestamp?: string;
    data?: {
        meta: {
            last_updated_at: string;
        };
        data: Record<Currency, CurrencyData>;
    };
};
