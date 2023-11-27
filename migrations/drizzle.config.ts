import type { Config } from 'drizzle-kit';
 
export default {
	schema: './schema.ts',
	out: './migrations',
	driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
} satisfies Config;