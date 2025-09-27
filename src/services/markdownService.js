import MarkdownIt from 'markdown-it'

// 配置 Markdown-it
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
})

// Markdown 服務類
class MarkdownService {
    constructor() {
        this.articles = []
        this.categories = {
            all: '全部文章',
            tech: '技術分享',
            experience: '開發心得',
            tutorial: '教學文章',
            news: '技術動態'
        }
        this.isLoaded = false
    }

    // 載入文章索引
    async loadArticleIndex() {
        if (this.isLoaded) {
            return this.articles
        }

        try {
            const response = await fetch('/data/articles.json')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            this.articles = Array.isArray(data.articles) ? data.articles : []
            this.isLoaded = true

            console.log('文章索引載入完成:', this.articles.length, '篇文章')
            return this.articles

        } catch (error) {
            console.warn('載入文章索引失敗，使用預設資料:', error)
            this.articles = this.getDefaultArticles()
            this.isLoaded = true
            return this.articles
        }
    }

    // 載入單篇 Markdown 文章
    async loadMarkdownArticle(category, slug) {
        try {
            const response = await fetch(`/articles/${category}/${slug}.md`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const markdownContent = await response.text()
            const { frontMatter, content } = this.parseFrontMatter(markdownContent)

            // 找到對應的文章元數據
            const articleMeta = this.articles.find(article =>
                article.category === category && article.slug === slug
            )

            return {
                ...articleMeta,
                ...frontMatter,
                content,
                excerpt: frontMatter.excerpt || articleMeta?.excerpt || this.generateExcerpt(content)
            }

        } catch (error) {
            console.error('載入 Markdown 文章失敗:', error)
            return null
        }
    }

    // 獲取所有文章（只載入元數據）
    async getAllArticles() {
        if (!this.isLoaded) {
            await this.loadArticleIndex()
        }
        return [...this.articles]
    }

    // 根據分類獲取文章
    async getArticlesByCategory(category) {
        const articles = await this.getAllArticles()

        if (category === 'all' || !category) {
            return articles
        }
        return articles.filter(article => article.category === category)
    }

    // 根據 slug 獲取完整文章（包含內容）
    async getArticleBySlug(category, slug) {
        // 先確保文章索引已載入
        if (!this.isLoaded) {
            await this.loadArticleIndex()
        }

        // 載入完整的 Markdown 文章
        return await this.loadMarkdownArticle(category, slug)
    }

    // 搜尋文章
    async searchArticles(keyword) {
        const articles = await this.getAllArticles()

        if (!keyword) return articles

        const lowerKeyword = keyword.toLowerCase()
        return articles.filter(article =>
            article.title?.toLowerCase().includes(lowerKeyword) ||
            article.excerpt?.toLowerCase().includes(lowerKeyword) ||
            article.tags?.some(tag => tag.toLowerCase().includes(lowerKeyword))
        )
    }

    // 獲取熱門文章
    async getFeaturedArticles(limit = 5) {
        const articles = await this.getAllArticles()
        return articles
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, limit)
    }

    // 獲取熱門標籤
    async getPopularTags() {
        const articles = await this.getAllArticles()
        const tagCount = {}

        articles.forEach(article => {
            article.tags?.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1
            })
        })

        return Object.entries(tagCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20)
    }

    // 渲染 Markdown 內容
    renderMarkdown(content) {
        return md.render(content)
    }

    // 獲取分類名稱
    getCategoryName(category) {
        return this.categories[category] || category
    }

    // 排序文章
    sortArticles(articles, sortBy) {
        const sortedArticles = [...articles]

        switch (sortBy) {
            case 'date-desc':
                return sortedArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
            case 'date-asc':
                return sortedArticles.sort((a, b) => new Date(a.date) - new Date(b.date))
            case 'title-asc':
                return sortedArticles.sort((a, b) => a.title.localeCompare(b.title))
            case 'title-desc':
                return sortedArticles.sort((a, b) => b.title.localeCompare(a.title))
            case 'views-desc':
                return sortedArticles.sort((a, b) => (b.views || 0) - (a.views || 0))
            default:
                return sortedArticles
        }
    }

    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // 計算閱讀時間（基於字數估算）
    calculateReadingTime(content) {
        const wordsPerMinute = 200
        const wordCount = content.length / 2 // 中文字符粗略計算
        return Math.ceil(wordCount / wordsPerMinute)
    }

    // 生成文章摘要
    generateExcerpt(content, maxLength = 150) {
        const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ')
        return plainText.length > maxLength
            ? plainText.substring(0, maxLength) + '...'
            : plainText
    }

    // 獲取相關文章
    async getRelatedArticles(currentArticle, limit = 3) {
        const articles = await this.getAllArticles()
        const currentTags = currentArticle.tags || []

        return articles
            .filter(article => article.id !== currentArticle.id)
            .map(article => ({
                ...article,
                relevanceScore: (article.tags || []).filter(tag => currentTags.includes(tag)).length
            }))
            .filter(article => article.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit)
    }

    // 解析 Front Matter
    parseFrontMatter(markdownContent) {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
        const match = markdownContent.match(frontMatterRegex)

        if (!match) {
            return { frontMatter: {}, content: markdownContent }
        }

        const frontMatterText = match[1]
        const content = match[2]

        // 簡單的 YAML 解析
        const frontMatter = {}
        frontMatterText.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':')
            if (colonIndex === -1) return

            const key = line.substring(0, colonIndex).trim()
            let value = line.substring(colonIndex + 1).trim()

            // 處理數組格式 ["item1", "item2"]
            if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1)
                    .split(',')
                    .map(item => item.trim().replace(/['"]/g, ''))
            }
            // 處理引號包圍的字符串
            else if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1)
            }
            // 處理數字
            else if (!isNaN(value) && value !== '') {
                value = parseInt(value)
            }

            frontMatter[key] = value
        })

        return { frontMatter, content }
    }

    // 預設文章資料（備用方案）
    getDefaultArticles() {
        return [
            {
                id: 1,
                title: 'Vue 3 組合式 API 深度解析',
                slug: 'vue3-composition-api-deep-dive',
                category: 'tech',
                categoryName: '技術分享',
                date: '2024-01-15',
                excerpt: '深入探討 Vue 3 組合式 API 的優勢與實際應用場景，讓你的開發更加高效。',
                tags: ['Vue.js', 'JavaScript', '前端開發', 'Composition API'],
                readingTime: 8,
                views: 1205,
                likes: 89,
                image: '/images/articles/vue3-composition-api.jpg'
            },
            {
                id: 2,
                title: 'C# .NET 微服務架構設計實戰',
                slug: 'dotnet-microservices-architecture',
                category: 'experience',
                categoryName: '開發心得',
                date: '2024-01-12',
                excerpt: '從零開始設計一個完整的微服務架構，包含服務發現、負載均衡等核心概念。',
                tags: ['C#', '.NET', '微服務', '架構設計', 'Docker'],
                readingTime: 12,
                views: 987,
                likes: 76,
                image: '/images/articles/dotnet-microservices.jpg'
            }
        ]
    }
}

// 創建並導出服務實例
const markdownService = new MarkdownService()

export default markdownService