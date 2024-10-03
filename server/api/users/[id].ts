export default defineEventHandler(async () => {
	try {
		const userId = event.context.params?.id
		const result = db.select().from(users).where(eq(users.id, userId)).all()
		return { users: result }
	} catch (e: any) {
		throw createError({
			statusCode: 400,
			statusMessage: e.message,
		})
	}
})
