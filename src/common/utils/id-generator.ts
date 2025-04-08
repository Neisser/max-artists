export class IdGenerator {
    constructor(private readonly prefix: string) {}

    generateId() {
        return `${this.prefix}-${crypto.randomUUID()}`;
    }
}


