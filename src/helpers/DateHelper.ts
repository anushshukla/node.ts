export default class DateHelper {
  private _currentUtc: string;

  constructor(currentUtc: string) {
    this._currentUtc = currentUtc;
  }

  public static generateCurrentUtc(): string {
    return new Date().toISOString();
  }

  public getCurrentUtc(): string {
    return this._currentUtc;
  }

  public toStandardDateFormat() {
    return this._currentUtc.slice(0, 10);
  }

  public toStandardDateTimeFormat() {
    return this._currentUtc.slice(0, 19).replace('T', ' ');
  }

  public fetchCalendarInviteFormat(date: Date): string {
    return date.toISOString().replace(/[-:]/g, '');
  }
}
