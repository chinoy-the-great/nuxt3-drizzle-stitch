import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'sqlite',
    schema: './server/utils/schema.ts',
    out: './server/migrations',
    dbCredentials: {
        url: 'sqlite.db'
    }
})
