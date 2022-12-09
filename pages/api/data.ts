import { promises as fs } from 'node:fs';

import type { NextApiRequest, NextApiResponse } from 'next';

import { Data } from './types';
import { shouldRequestFreshData } from './helpers';
import { FILE_PATH, API_REQUEST_URL } from './constants';

export default async function handler(
    _: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const data = await fs.readFile(FILE_PATH, {
        encoding: 'utf8',
    });

    let parsedData: Data = {};

    try {
        parsedData = JSON.parse(data);
    } catch (e) {
        parsedData = {};
    }

    if (shouldRequestFreshData(parsedData.timestamp)) {
        const apiData = await fetch(API_REQUEST_URL)
            .then((r) => r.json())
            .catch(() => ({}));

        await fs.writeFile(
            FILE_PATH,
            JSON.stringify({
                timestamp: new Date().toISOString(),
                data: apiData,
            }),
        );

        parsedData = apiData;
    }

    res.status(200).json(parsedData);
}
