import isAfter from 'date-fns/isAfter';
import addHours from 'date-fns/addHours';

export function shouldRequestFreshData(timestamp?: string): boolean {
    if (!timestamp) {
        return true;
    }

    const now = new Date();
    const date = addHours(new Date(timestamp), 4);

    if (isAfter(now, date)) {
        return true;
    }

    return false;
}
