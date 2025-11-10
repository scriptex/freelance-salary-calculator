import clientPromise from 'lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { API_REQUEST_URL, CurrencyAPIData, shouldRequestFreshData } from 'shared';

export default async function handler(_: NextApiRequest, res: NextApiResponse<CurrencyAPIData>) {
	const client = await clientPromise;
	const db = client.db('currencies');
	const collection = db.collection('currencies');

	let data: CurrencyAPIData | null = await collection.findOne<CurrencyAPIData>({ type: 'apiData' });

	if (shouldRequestFreshData(data?.timestamp)) {
		const apiData = await fetch(API_REQUEST_URL)
			.then(r => r.json())
			.catch(() => ({}));

		const document = {
			...apiData,
			timestamp: new Date().toISOString(),
			type: 'apiData'
		};

		if (!data) {
			collection.insertOne(document);
		} else {
			collection.replaceOne({ type: 'apiData' }, document);
		}

		data = apiData;
	}

	res.status(200).json(data || {});
}
