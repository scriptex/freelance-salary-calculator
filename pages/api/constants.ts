export const API_URL = 'https://api.currencyapi.com/v3/latest';
export const API_KEY = process.env.CURRENCY_API_ENPOINT;
export const FILE_PATH = 'pages/api/currencies.json';
export const CURRENCIES = 'EUR%2CUSD%2CGBP';
export const BASE_CURRENCY = 'BGN';
export const API_REQUEST_URL = `${API_URL}?apikey=${API_KEY}&currencies=${CURRENCIES}&base_currency=${BASE_CURRENCY}`;
