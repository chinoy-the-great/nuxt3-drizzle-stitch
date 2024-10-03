import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }),
})

export type User = InferModel<typeof users>
export type InsertUser = InferModel<typeof users, 'insert'>
