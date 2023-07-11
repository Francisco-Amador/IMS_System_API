import { Pool } from "pg";

let db: any;

if (!db) {
    db = new Pool({
        user: "admin",
        password: "admin",
        host: "localhost",
        port: 5432,
        database: "NUmero1",
    });
}

export { db };