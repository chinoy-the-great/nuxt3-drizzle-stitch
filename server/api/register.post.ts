export default defineEventHandler(async (event) => {
	try {
		// Read the request body
		const body = await readBody(event)

		// Extract user details from the body
		const { name, email, password } = body

		// Basic validation
		// if (password !== repeat_password) {
		// 	console.log('password: ', password)
		// 	console.log('repeat: ', repeat_password)
		// 	return
		// throw createError({
		// 	statusCode: 400,
		// 	statusMessage: 'Passwords do not match in register.post?',
		// })
		// }

		// Hash the password
		// const hashedPassword = await bcrypt.hash(password, 10)

		// Create a new user object
		const newUser = {
			name,
			email,
			password,
			createdAt: new Date(),
			// type: 'user',
		}

		// Insert the new user into the database
		const result = await db.insert(users).values(newUser).run()

		return { success: true, newUser: result }
	} catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		})
	}
})
