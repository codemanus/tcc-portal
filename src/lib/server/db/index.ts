import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const connectionString = process.env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);

// async function main() {
//   const db = drizzle(process.env.DATABASE_URL!);
//   await seed(db, { users, user_role, student, staff, course, assignment, grade });
// }
// main();