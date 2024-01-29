import { date } from 'quasar';
import { formatDate } from '..';

export const startDate = (val: string) => {
  const dateFormatted = formatDate(val, 'DD/MM/YYYY', 'YYYY/MM/DD');
  return (
    dateFormatted >= date.formatDate(new Date(), 'YYYY/MM/DD') ||
    'Date should be in the future'
  );
};
