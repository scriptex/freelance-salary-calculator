import type { NextApiRequest, NextApiResponse } from 'next';

import clientPromise from 'lib/mongodb';
import { CurrencyAPIData } from './types';
import { API_REQUEST_URL } from './constants';
import { shouldRequestFreshData } from './helpers';

export default async function handler(_: NextApiRequest, res: NextApiResponse<CurrencyAPIData>) {
	const client = await clientPromise;
	const db = client.db('currencies');
	const collection = db.collection('currencies');

	let data: CurrencyAPIData | null = await collection.findOne<CurrencyAPIData>({ type: 'apiData' });

	if (shouldRequestFreshData(data?.timestamp)) {
		const apiData = await fetch(API_REQUEST_URL)
			.then(r => r.json())
			.catch(() => ({}));

		if (!data) {
			collection.insertOne({
				...apiData,
				type: 'apiData',
				timestamp: new Date().toISOString()
			});
		} else {
			collection.updateOne(
				{ type: 'apiData' },
				{
					...apiData,
					timestamp: new Date().toISOString()
				}
			);
		}

		data = apiData;
	}

	res.status(200).json(data || {});
}
