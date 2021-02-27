import { Pool, Client, QueryResult } from 'pg'

export class PgRepository {
    host: string;
    port: number;
    user: string;
    password: string;

    constructor() {
        this.host = 'localhost';
        this.port = 5432;
        this.user = 'postgres';
        this.password = 'example';
    }

    private getPool() {
        return new Pool({
            host: this.host,
            port: this.port,
            user: this.user,
            password: this.password    
        })
    }

    async query(query: { text: string, values: any[] }): Promise<QueryResult> {
        const pool = this.getPool()
        try {
            const res = await pool.query(query);
            pool.end();
            console.log("Completed");
            return res;
        } catch (err) {
            console.log(err.stack);
            return err.stack;
        }
      }
};