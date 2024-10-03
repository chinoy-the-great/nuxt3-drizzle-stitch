import bcrypt from 'bcrypt'
import { createError, defineEventHandler, readBody } from 'h3' // For password hashing comparison
// Adjust this to your users table

export default defineEventHandler(async (event) => {
	try {
		// Read the credentials from the request body
		const { username, password } = await readBody(event)

		// Fetch the user from the database
		const user = await db.select().from(users).where(users.username.equals(username)).get()
		// commented out the above line because db is throwing an error during compilation

		if (!user) {
			throw createError({
				statusCode: 404,
				statusMessage: 'User not found',
			})
		}

		// Check if the password matches
		const isPasswordValid = await bcrypt.compare(password, user.password) // assuming passwords are hashed

		if (!isPasswordValid) {
			throw createError({
				statusCode: 401,
				statusMessage: 'Invalid credentials',
			})
		}

		// If successful, you can generate a session or token (e.g., JWT)
		const token = 'your-generated-token' // In a real scenario, use JWT or session handling

		return {
			success: true,
			message: 'Login successful',
			token, // Send back the token for client-side storage
		}
	} catch (e: any) {
		throw createError({
			statusCode: 400,
			statusMessage: e.message,
		})
	}
})
