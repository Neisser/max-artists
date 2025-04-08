export class QueryBuilder {
    private conditions: string[] = [];
    private values: any[] = [];
    private type: 'SELECT' | 'INSERT' = 'SELECT';
    private hasWhere = false;

    constructor(private table: string) {}

    select(fields: string[] = ['*']): this {
        this.type = 'SELECT';
        this.conditions.push(`SELECT ${fields.join(', ')} FROM ${this.table}`);
        return this;
    }

    insert(data: Record<string, any>): this {
        this.type = 'INSERT';
        const columns = Object.keys(data);
        const placeholders = columns.map(() => '?');
        
        this.conditions.push(
            `INSERT INTO ${this.table} (${columns.join(', ')}) VALUES (${placeholders.join(', ')})`
        );
        this.values.push(...Object.values(data));
        return this;
    }

    where(condition: string, value: any): this {
        if (this.type === 'SELECT' && value !== undefined) {
            if (!this.hasWhere) {
                this.conditions.push('WHERE');
                this.hasWhere = true;
            } else {
                this.conditions.push('AND');
            }
            this.conditions.push(condition);
            this.values.push(value);
        }
        return this;
    }

    and(condition: string, value: any): this {
        if (this.type === 'SELECT' && value !== undefined) {
            if (!this.hasWhere) {
                this.conditions.push('WHERE');
                this.hasWhere = true;
            } else {
                this.conditions.push('AND');
            }
            this.conditions.push(condition);
            this.values.push(value);
        }
        return this;
    }

    or(condition: string, value: any): this {
        if (this.type === 'SELECT' && value !== undefined) {
            if (!this.hasWhere) {
                this.conditions.push('WHERE');
                this.hasWhere = true;
            } else {
                this.conditions.push('OR');
            }
            this.conditions.push(condition);
            this.values.push(value);
        }
        return this;
    }

    orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
        if (this.type === 'SELECT') {
            this.conditions.push(`ORDER BY ${field} ${direction}`);
        }
        return this;
    }

    limit(count: number): this {
        if (this.type === 'SELECT') {
            this.conditions.push(`LIMIT ?`);
            this.values.push(count);
        }
        return this;
    }

    build(): { query: string; values: any[] } {
        return {
            query: this.conditions.join(' '),
            values: this.values
        };
    }
}