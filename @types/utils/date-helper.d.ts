import DateHelper from '@helpers/DateHelper'
export declare enum DateFormat {
  DD_MMM_YYYY_HH_mm = 'dd MMM yyyy hh:mm a (OOO)',
  DD_MMM_YYYY = 'dd MMM yyy',
}
export declare const format: (
  date: Date,
  dateFormat: DateFormat,
  timeZone?: string
) => string
export declare const dateHelper: () => DateHelper
