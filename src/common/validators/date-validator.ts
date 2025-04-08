export class DateValidator {
    private static readonly DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    

    static validate(date: string): boolean {
        return this.DATE_REGEX.test(date);
    }
}
