export default defineEventHandler(async () => {
	try {
		const result = db.select().from(users).all()
		return { users: result }
	} catch (e: any) {
		throw createError({
			statusCode: 400,
			statusMessage: e.message,
		})
	}
})
