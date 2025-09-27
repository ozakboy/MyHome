class PortfolioService {
    constructor() {
        this.projects = []
        this.statistics = []
        this.isLoaded = false
    }

    // 只在第一次載入專案資料
    async loadProjects() {
        if (this.isLoaded) {
            return this.projects
        }

        try {
            console.log('首次載入專案資料...')

            const response = await fetch('/data/projects.json')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            this.projects = Array.isArray(data.projects) ? data.projects : []
            this.statistics = Array.isArray(data.statistics) ? data.statistics : []

            // 資料驗證和清理
            this.projects = this.projects.map(project => ({
                ...project,
                id: project.id || Math.random(),
                title: project.title || '未命名專案',
                description: project.description || '',
                category: project.category || 'web',
                technologies: Array.isArray(project.technologies) ? project.technologies : [],
                features: Array.isArray(project.features) ? project.features : [],
                status: project.status || 'production',
                date: project.date || new Date().toISOString()
            }))

            this.isLoaded = true
            console.log('專案資料載入完成:', this.projects.length, '個專案')

            return this.projects

        } catch (error) {
            console.warn('載入專案資料失敗，使用預設資料:', error)
            this.projects = this.getDefaultProjects()
            this.statistics = this.getDefaultStatistics()
            this.isLoaded = true
            return this.projects
        }
    }

    // 獲取所有專案（前端篩選用）
    getAllProjects() {
        return [...this.projects]
    }

    // 前端篩選專案 - 只在記憶體中篩選
    filterByCategory(category) {
        if (category === 'all' || !category) {
            return [...this.projects]
        }
        return this.projects.filter(project => project.category === category)
    }

    // 前端搜尋專案 - 只在記憶體中搜尋
    searchProjects(keyword) {
        if (!keyword || keyword.trim() === '') {
            return [...this.projects]
        }

        const lowerKeyword = keyword.toLowerCase().trim()
        return this.projects.filter(project => {
            return project.title?.toLowerCase().includes(lowerKeyword) ||
                project.description?.toLowerCase().includes(lowerKeyword) ||
                project.fullDescription?.toLowerCase().includes(lowerKeyword) ||
                project.technologies?.some(tech => tech.toLowerCase().includes(lowerKeyword)) ||
                project.features?.some(feature => feature.toLowerCase().includes(lowerKeyword))
        })
    }

    // 根據 ID 獲取專案
    getProjectById(id) {
        const projectId = parseInt(id)
        return this.projects.find(project => project.id === projectId)
    }

    // 獲取統計資料
    getStatistics() {
        return [...this.statistics]
    }

    // 獲取相關專案
    getRelatedProjects(currentProject, limit = 3) {
        if (!currentProject) return []

        return this.projects
            .filter(project =>
                project.id !== currentProject.id &&
                project.category === currentProject.category
            )
            .slice(0, limit)
    }

    // 檢查是否已載入
    isDataLoaded() {
        return this.isLoaded
    }

    // 預設專案資料（備用方案）
    getDefaultProjects() {
        return [
            {
                id: 1,
                title: '期貨高頻交易系統',
                description: '為金融機構開發的高頻交易系統，支援多策略並行運作',
                fullDescription: '這是一個為專業交易機構設計的高頻交易系統，採用 C# .NET 開發，具備極低延遲的交易執行能力。',
                category: 'trading',
                image: '/images/projects/trading-system.jpg',
                gallery: ['/images/projects/trading-system.jpg'],
                technologies: ['C#', '.NET Core', 'Redis', 'WebSocket'],
                features: ['微秒級延遲交易', '多策略並行', '風險控制'],
                status: 'production',
                date: '2023-12-01',
                duration: '12 個月',
                teamSize: '個人專案'
            },
            {
                id: 2,
                title: 'Vue.js 網頁應用',
                description: '現代化響應式網頁應用程式開發',
                fullDescription: '使用 Vue.js 3 開發的現代化網頁應用程式，具備完整的前端功能。',
                category: 'web',
                image: '/images/projects/web-app.jpg',
                gallery: ['/images/projects/web-app.jpg'],
                technologies: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3'],
                features: ['響應式設計', '組件化開發', '路由管理'],
                status: 'production',
                date: '2023-11-01',
                duration: '6 個月',
                teamSize: '個人專案'
            },
            {
                id: 3,
                title: 'Discord Bot 助手',
                description: '多功能 Discord 機器人開發',
                fullDescription: '專為 Discord 社群設計的多功能機器人，提供豐富的互動功能。',
                category: 'bot',
                image: '/images/projects/discord-bot.jpg',
                gallery: ['/images/projects/discord-bot.jpg'],
                technologies: ['C#', 'Discord.NET', '.NET Core'],
                features: ['指令處理', '權限管理', '數據統計'],
                status: 'production',
                date: '2023-10-01',
                duration: '3 個月',
                teamSize: '個人專案'
            }
        ]
    }

    // 預設統計資料（備用方案）
    getDefaultStatistics() {
        return [
            { label: '完成專案', value: '20+', icon: 'Folder', color: '#667eea' },
            { label: '服務客戶', value: '50+', icon: 'User', color: '#f093fb' },
            { label: '程式碼行數', value: '100K+', icon: 'DocumentCopy', color: '#43e97b' },
            { label: '滿意度', value: '98%', icon: 'Star', color: '#ffd700' }
        ]
    }

    // 工具方法
    formatDate(dateString) {
        if (!dateString) return ''

        try {
            const date = new Date(dateString)
            if (isNaN(date.getTime())) return dateString

            return date.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long'
            })
        } catch (error) {
            return dateString
        }
    }

    getCategoryName(category) {
        const names = {
            all: '全部專案',
            web: '網頁應用',
            bot: 'Bot 開發',
            trading: '交易系統',
            microservice: '微服務'
        }
        return names[category] || category
    }

    getCategoryType(category) {
        const types = {
            web: 'primary',
            bot: 'success',
            trading: 'warning',
            microservice: 'info'
        }
        return types[category] || 'info'
    }

    getStatusType(status) {
        const types = {
            production: 'success',
            development: 'warning',
            planning: 'info',
            maintenance: 'danger'
        }
        return types[status] || 'info'
    }

    getStatusText(status) {
        const texts = {
            production: '已上線',
            development: '開發中',
            planning: '規劃中',
            maintenance: '維護中'
        }
        return texts[status] || status
    }
}

// 創建並導出服務實例
const portfolioService = new PortfolioService()

export default portfolioService