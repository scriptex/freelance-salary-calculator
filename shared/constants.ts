export const API_URL = 'https://api.currencyapi.com/v3/latest';
export const API_KEY = process.env.CURRENCY_API_ENPOINT_TOKEN;
export const CURRENCIES = 'USD,GBP,JPY,CNY,AUD,CAD,CHF'.replaceAll(',', '%2C');
export const BASE_CURRENCY = 'EUR';
export const API_REQUEST_URL = `${API_URL}?apikey=${API_KEY}&currencies=${CURRENCIES}&base_currency=${BASE_CURRENCY}`;
