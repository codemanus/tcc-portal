import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const base = "./src/lib/server/db/";


export default defineConfig({
	schema: base + 'schema',

	dbCredentials: {
		url: process.env.DATABASE_URL
	},

	verbose: true,
	strict: true,
	dialect: 'postgresql',
	out: base + 'migrations',
	casing: "snake_case",
	entities: {
		roles: {
		  provider: "supabase",
			exclude: ["supabase_auth_admin"],
		},
	},
});
