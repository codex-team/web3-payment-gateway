import { migrate } from 'npm:drizzle-orm/postgres-js/migrator';
import db, {queryClient} from './db.ts';
 
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './migrations/migrations' });
 
// Don't forget to close the connection, otherwise the script will hang
await queryClient.end();