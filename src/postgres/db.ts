import { drizzle } from 'npm:drizzle-orm/postgres-js';
import postgres from "https://deno.land/x/postgresjs@v3.4.3/mod.js"
import * as schema from './schema.ts';


export const queryClient = postgres("postgres://codex:postgres@127.0.0.1:5432/codex");
// queryClient`SELECT 1 + 1`;

const db = drizzle(queryClient, {schema});

export default db;