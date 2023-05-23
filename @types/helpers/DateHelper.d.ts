export default class DateHelper {
  private _currentUtc
  constructor(currentUtc: string)
  static generateCurrentUtc(): string
  getCurrentUtc(): string
  toStandardDateFormat(): string
  toStandardDateTimeFormat(): string
  fetchCalendarInviteFormat(date: Date): string
}
