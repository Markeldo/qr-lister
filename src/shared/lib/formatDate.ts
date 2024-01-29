import { date } from 'quasar';

export const formatDate = (
  fromDate: string,
  fromFormat = 'YYYY-MM-DD',
  toFormat = 'DD/MM/YYYY'
) => date.formatDate(date.extractDate(fromDate, fromFormat), toFormat);

