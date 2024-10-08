import { and, eq } from 'drizzle-orm' // For password hashing comparison
import { createError, defineEventHandler, readBody } from 'h3'
// Adjust this to your users table

export default defineEventHandler(async (event) => {
	try {
		// Read the credentials from the request body
		const { username, password } = await readBody(event)

		// Fetch the user from the database
		const user = await db
			.select()
			.from(users)
			.where(and(eq(users.email, username), eq(users.password, password)))
			.get()
		// commented out the above line because db is throwing an error during compilation

		console.log('User: ', user)
		console.log('Login ts username: ', username)
		console.log('Login ts password: ', password)

		if (!user) {
			return createError({
				statusCode: 404,
				statusMessage: 'Login failed due to invalid credentials',
			})
		}

		return {
			success: true,
			message: 'Login successful',
		}
	} catch (e: any) {
		throw createError({
			statusCode: 400,
			statusMessage: e.message,
		})
	}
})
