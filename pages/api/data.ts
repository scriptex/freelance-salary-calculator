import { resolve } from 'node:path';
import { promises as fs } from 'node:fs';

import type { NextApiRequest, NextApiResponse } from 'next';

import { Data } from './types';
import { currencyData } from './currencies';
import { API_REQUEST_URL } from './constants';
import { shouldRequestFreshData } from './helpers';

export default async function handler(_: NextApiRequest, res: NextApiResponse<Data>) {
	let parsedData: Data = currencyData as Data;

	if (shouldRequestFreshData(parsedData.timestamp)) {
		const apiData = await fetch(API_REQUEST_URL)
			.then(r => r.json())
			.catch(() => ({}));

		await fs.writeFile(
			resolve(__dirname, 'currencies.js'),
			`export const currencyData = ${apiData};
export default currencyData;`
		);

		parsedData = apiData;
	}

	res.status(200).json(parsedData);
}
