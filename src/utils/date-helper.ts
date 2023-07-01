import { DEFAULT_TIME_ZONE } from '@constants';
import DateHelper from '@helpers/DateHelper';
import dateFnsTz from 'date-fns-tz';

export enum DateFormat {
  DD_MMM_YYYY_HH_MM = 'dd MMM yyyy hh:mm a (OOO)',
  DD_MMM_YYYY = 'dd MMM yyy',
}

export const format = (date: Date, dateFormat: DateFormat, timeZone: string = DEFAULT_TIME_ZONE): string =>
  dateFnsTz.format(dateFnsTz.utcToZonedTime(date, timeZone), dateFormat, {
    timeZone,
  });

export const dateHelper = (): DateHelper => new DateHelper(DateHelper.generateCurrentUtc());
