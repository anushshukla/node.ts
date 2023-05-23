import fnsFormat from 'date-fns-tz/format';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import { DEFAULT_TIME_ZONE } from '@src/constants';
import DateHelper from '@helpers/DateHelper';

export enum DateFormat {
  DD_MMM_YYYY_HH_mm = 'dd MMM yyyy hh:mm a (OOO)',
  DD_MMM_YYYY = 'dd MMM yyy',
}

export const format = (
  date: Date,
  dateFormat: DateFormat,
  timeZone: string = DEFAULT_TIME_ZONE
): string =>
  fnsFormat(utcToZonedTime(date, timeZone), dateFormat, {
    timeZone,
  });

export const dateHelper = (): DateHelper =>
  new DateHelper(DateHelper.generateCurrentUtc());
