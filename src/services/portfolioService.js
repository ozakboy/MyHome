class PortfolioService {
    constructor() {
        this.projects = []
        this.statistics = []
        this.isLoaded = false
    }

    // 載入專案資料
    async loadProjects() {
        if (this.isLoaded) {
            return this.projects
        }

        try {
            // 方法 1: 從 public 資料夾載入 JSON 檔案
            const response = await fetch('/data/projects.json')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            this.projects = data.projects || []
            this.statistics = data.statistics || []
            this.isLoaded = true

            console.log('專案資料載入成功:', this.projects.length, '個專案')
            return this.projects

        } catch (error) {
            console.error('載入專案資料失敗:', error)

            // 備用方案：使用預設資料
            this.projects = this.getDefaultProjects()
            this.statistics = this.getDefaultStatistics()
            this.isLoaded = true

            return this.projects
        }
    }

    // 獲取所有專案
    async getAllProjects() {
        await this.loadProjects()
        return this.projects
    }

    // 根據分類篩選專案
    async getProjectsByCategory(category) {
        await this.loadProjects()

        if (category === 'all' || !category) {
            return this.projects
        }

        return this.projects.filter(project => project.category === category)
    }

    // 根據 ID 獲取專案
    async getProjectById(id) {
        await this.loadProjects()
        return this.projects.find(project => project.id === parseInt(id))
    }

    // 獲取統計資料
    async getStatistics() {
        await this.loadProjects()
        return this.statistics
    }

    // 搜尋專案
    async searchProjects(keyword) {
        await this.loadProjects()

        if (!keyword) {
            return this.projects
        }

        const lowerKeyword = keyword.toLowerCase()
        return this.projects.filter(project =>
            project.title.toLowerCase().includes(lowerKeyword) ||
            project.description.toLowerCase().includes(lowerKeyword) ||
            project.technologies.some(tech =>
                tech.toLowerCase().includes(lowerKeyword)
            )
        )
    }

    // 獲取相關專案
    async getRelatedProjects(currentProject, limit = 3) {
        await this.loadProjects()

        return this.projects
            .filter(project =>
                project.id !== currentProject.id &&
                project.category === currentProject.category
            )
            .slice(0, limit)
    }

    // 預設專案資料（備用方案）
    getDefaultProjects() {
        return [
            {
                id: 1,
                title: '期貨高頻交易系統',
                description: '為金融機構開發的高頻交易系統，支援多策略並行運作',
                category: 'trading',
                image: '/images/projects/trading-system.jpg',
                technologies: ['C#', '.NET Core', 'Redis'],
                status: 'production',
                date: '2023-12-01'
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

    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long'
        })
    }

    // 獲取分類名稱
    getCategoryName(category) {
        const names = {
            web: '網頁應用',
            bot: 'Bot 開發',
            trading: '交易系統',
            microservice: '微服務'
        }
        return names[category] || category
    }

    // 獲取分類類型
    getCategoryType(category) {
        const types = {
            web: 'primary',
            bot: 'success',
            trading: 'warning',
            microservice: 'info'
        }
        return types[category] || 'info'
    }

    // 獲取狀態類型
    getStatusType(status) {
        const types = {
            production: 'success',
            development: 'warning',
            planning: 'info'
        }
        return types[status] || 'info'
    }

    // 獲取狀態文字
    getStatusText(status) {
        const texts = {
            production: '已上線',
            development: '開發中',
            planning: '規劃中'
        }
        return texts[status] || status
    }

    // 重新載入資料
    async reloadProjects() {
        this.isLoaded = false
        this.projects = []
        this.statistics = []
        return await this.loadProjects()
    }
}

// 創建並導出服務實例
const portfolioService = new PortfolioService()

export default portfolioService