export default class DateHelper {
    private currentUtc: string;
    public generateCurrentUtc(): this {
        this.currentUtc = new Date().toISOString();
        return this;
    }
    public getCurrentUtc(): string {
        return this.currentUtc;
    }
    public toStandardDateFormat() {
        return this.currentUtc.slice(0, 10);
    }
    public toStandardDateTimeFormat() {
        return this.currentUtc.slice(0, 19).replace('T', ' ');
    }
    public fetchCalendarInviteFormat(date: Date): string {
        return date.toISOString().replace(/[-:]/g, '');
    }
}