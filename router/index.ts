const routes = [
	{ path: '/', component: quizzes },
	{ path: '/quiz/:quizIndex', component: quizzespage },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
