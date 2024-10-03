export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event) // Get form data
		const { username, email, password } = body // Extract relevant fields

		// Validate that required fields are present
		if (!username || !email || !password) {
			throw createError({ statusCode: 400, message: 'All fields are required' })
		}

		// Prepare new user data
		const newUser = {
			username,
			email,
			password, // Ideally, hash the password before saving (e.g., bcrypt)
		}

		// Insert into the database
		await db.insert(users).values(newUser).run()

		// Return success response
		return { success: true, message: 'User registered successfully' }
	} catch (e) {
		throw createError({
			statusCode: 400,
			message: e.message || 'Failed to register user',
		})
	}
})
