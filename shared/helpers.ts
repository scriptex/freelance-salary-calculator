import { addHours } from 'date-fns/addHours';
import { isAfter } from 'date-fns/isAfter';

export function shouldRequestFreshData(timestamp?: string): boolean {
	if (!timestamp) {
		return true;
	}

	const now = new Date();
	const date = addHours(new Date(timestamp), 24);

	if (isAfter(now, date)) {
		return true;
	}

	return false;
}
