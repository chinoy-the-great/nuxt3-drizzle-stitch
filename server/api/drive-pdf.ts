import { createError, defineEventHandler, getQuery, sendStream } from 'h3'

export default defineEventHandler(async (event) => {
	// pull ?id=GOOGLE_FILE_ID and optional &dl=1
	const { id, dl } = getQuery(event) as { id?: string; dl?: string }
	if (!id) {
		throw createError({ statusCode: 400, statusMessage: 'Missing id' })
	}

	// Drive URL – “view” will stream inline; “download” will stream as attachment
	const exportType = dl ? 'download' : 'view'
	const driveUrl = `https://drive.google.com/uc?export=${exportType}&id=${id}`

	// fetch the PDF bytes from Google
	const driveRes = await fetch(driveUrl)
	if (!driveRes.ok) {
		throw createError({ statusCode: driveRes.status })
	}

	// override headers so the browser sees it as inline PDF
	const res = event.node.res
	res.setHeader('Content-Type', 'application/pdf')
	res.setHeader(
		'Content-Disposition',
		dl ? `attachment; filename="${id}.pdf"` : `inline; filename="${id}.pdf"`,
	)

	// pipe the Drive response body into our response
	const body = driveRes.body
	if (body) {
		await sendStream(event, body)
	}
})
