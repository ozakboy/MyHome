import { createRouter, createWebHistory } from 'vue-router'

// 導入頁面組件
import HomePage from '@/views/HomePage/HomePage.vue'
import AboutPage from '@/views/AboutPage/AboutPage.vue'
import PortfolioPage from '@/views/PortfolioPage/PortfolioPage.vue'
import ArticlesPage from '@/views/ArticlesPage/ArticlesPage.vue'
import ArticleDetailPage from '@/views/ArticleDetailPage/ArticleDetailPage.vue'
const Title = "全端系統工程師";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            title: '首頁 - ' + Title
        }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage,
        meta: {
            title: '關於我 - ' + Title
        }
    },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: PortfolioPage,
        meta: {
            title: '作品集 - ' + Title
        }
    },
    {
        path: '/articles/:category?',
        name: 'Articles',
        component: ArticlesPage,
        meta: {
            title: '專欄文章 - ' + Title
        }
    },
    {
        path: '/article/:category/:slug',
        name: 'ArticleDetail',
        component: ArticleDetailPage,
        meta: {
            title: '文章詳情 - ' + Title
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// 路由守衛 - 設置頁面標題
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '全端系統工程師'
    next()
})

export default router