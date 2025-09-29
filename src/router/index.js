import { createRouter, createWebHistory } from 'vue-router'

// 導入頁面組件
import HomePage from '@/views/HomePage/HomePage.vue'
import AboutPage from '@/views/AboutPage/AboutPage.vue'
import PortfolioPage from '@/views/PortfolioPage/PortfolioPage.vue'
//import ArticlesPage from '@/views/ArticlesPage/ArticlesPage.vue'
//import ArticleDetailPage from '@/views/ArticleDetailPage/ArticleDetailPage.vue'
const Title = "全端系統工程師";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            title: '首頁 - ' + Title,
            description: '專精於 C# .NET 後端開發、Vue.js 前端設計、微服務架構、高頻交易系統的全棧工程師',
            keywords: 'C#,NET,Vue.js,全棧工程師,微服務,高頻交易,韓滷',
        }
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage,
        meta: {
            title: '關於我 - ' + Title,
            description: '了解韓滷的技能、經歷與專業背景，具備完整的全棧開發能力',
            keywords: '全棧工程師,C#開發者,Vue.js,個人簡歷,技能,經歷',
        }
    },
    {
        path: '/portfolio',
        name: 'Portfolio',
        component: PortfolioPage,
        meta: {
            title: '作品集 - ' + Title,
            description: '展示韓滷在全棧開發、系統架構、Bot 開發等領域的專案成果',
            keywords: '作品集,專案展示,交易系統,Bot開發,網頁應用',
        }
    },
    //{
    //    path: '/articles/:category?',
    //    name: 'Articles',
    //    component: ArticlesPage,
    //    meta: {
    //        title: '專欄文章 - ' + Title
    //    }
    //},
    //{
    //    path: '/article/:category/:slug',
    //    name: 'ArticleDetail',
    //    component: ArticleDetailPage,
    //    meta: {
    //        title: '文章詳情 - ' + Title
    //    }
    //}
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
// 擴展路由守衛
router.beforeEach((to, from, next) => {
    // 設置頁面標題
    document.title = to.meta.title || '全端系統工程師'

    // 設置 meta description
    updateMetaTag('description', to.meta.description)

    // 設置 keywords
    updateMetaTag('keywords', to.meta.keywords)

    // 設置 Open Graph tags
    updateMetaTag('og:title', to.meta.title, 'property')
    updateMetaTag('og:description', to.meta.description, 'property')
    updateMetaTag('og:image', to.meta.ogImage, 'property')
    updateMetaTag('og:url', window.location.origin + to.path, 'property')

    next()
})

function updateMetaTag(name, content, attribute = 'name') {
    if (!content) return

    let element = document.querySelector(`meta[${attribute}="${name}"]`)
    if (element) {
        element.setAttribute('content', content)
    } else {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        element.setAttribute('content', content)
        document.getElementsByTagName('head')[0].appendChild(element)
    }
}

export default router