import { Pool } from "pg";

let db: any;//TODO: Add type

if (!db) {
    db = new Pool({
        user: "postgres",
        password: "admin",
        host: "localhost",
        port: 5432,
        database: "NUmero1",
    });
}

export { db };