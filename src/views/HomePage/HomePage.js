import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
    Folder,
    User,
    ArrowRight,
    View,
    Message,
    ChatDotRound,
    Monitor,
    Setting,
    DataAnalysis,
    Connection,
    Server,
    Document
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export function homePageLogic() {
    return {
        components: {
            Folder,
            User,
            ArrowRight,
            View,
            Message,
            ChatDotRound,
            Monitor,
            Setting,
            DataAnalysis,
            Connection,
            Server,
            Document
        },

        setup() {
            const router = useRouter()

            // 技能資料
            const skills = ref([
                {
                    id: 1,
                    title: '後端開發',
                    description: '專精於 C# .NET 開發，具備豐富的 API 設計與微服務架構經驗',
                    icon: 'Server',
                    color: '#667eea',
                    tags: ['C#', '.NET', 'API', '微服務', 'MSSQL']
                },
                {
                    id: 2,
                    title: '前端開發',
                    description: '熟練使用 Vue.js 框架，打造現代化響應式網頁應用程式',
                    icon: 'Monitor',
                    color: '#f093fb',
                    tags: ['Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'Element Plus']
                },
                {
                    id: 3,
                    title: '系統架構',
                    description: '具備完整的系統設計能力，從需求分析到部署上線一條龍服務',
                    icon: 'Setting',
                    color: '#4facfe',
                    tags: ['系統設計', '資料庫設計', '伺服器管理', '雲端部署']
                },
                {
                    id: 4,
                    title: '高頻交易',
                    description: '開發期貨與股票高頻交易系統，處理即時資料與交易執行',
                    icon: 'DataAnalysis',
                    color: '#43e97b',
                    tags: ['高頻交易', '期貨', '股票', '即時系統']
                },
                {
                    id: 5,
                    title: 'Bot 開發',
                    description: '開發 Line Bot、Discord Bot、Telegram Bot 等聊天機器人',
                    icon: 'Connection',
                    color: '#fa709a',
                    tags: ['Line Bot', 'Discord Bot', 'Telegram Bot', '自動化']
                },
                {
                    id: 6,
                    title: '專案管理',
                    description: '具備專案開發規劃與流程設計能力，確保專案順利交付',
                    icon: 'Document',
                    color: '#ffecd2',
                    tags: ['專案規劃', '流程設計', '團隊協作', '需求分析']
                }
            ])

            // 最新文章資料
            const recentArticles = ref([
                {
                    id: 1,
                    title: 'Vue 3 組合式 API 深度解析',
                    excerpt: '深入探討 Vue 3 組合式 API 的優勢與實際應用場景，讓你的開發更加高效...',
                    category: 'tech',
                    categoryName: '技術分享',
                    date: '2024-01-15',
                    tags: ['Vue.js', 'JavaScript', '前端開發'],
                    slug: 'vue3-composition-api-deep-dive'
                },
                {
                    id: 2,
                    title: 'C# .NET 微服務架構設計實戰',
                    excerpt: '從零開始設計一個完整的微服務架構，包含服務發現、負載均衡等核心概念...',
                    category: 'experience',
                    categoryName: '開發心得',
                    date: '2024-01-12',
                    tags: ['C#', '.NET', '微服務', '架構設計'],
                    slug: 'dotnet-microservices-architecture'
                },
                {
                    id: 3,
                    title: '高頻交易系統開發經驗分享',
                    excerpt: '分享開發期貨高頻交易系統的經驗，包含效能優化、風險控制等關鍵要素...',
                    category: 'tutorial',
                    categoryName: '教學文章',
                    date: '2024-01-10',
                    tags: ['高頻交易', '期貨', '效能優化'],
                    slug: 'high-frequency-trading-system'
                }
            ])

            // 聯繫表單資料
            const contactData = reactive({
                name: '',
                email: '',
                message: ''
            })

            const isSubmitting = ref(false)

            // 導航方法
            const navigateToPortfolio = () => {
                router.push('/portfolio')
            }

            const navigateToAbout = () => {
                router.push('/about')
            }

            const navigateToArticles = () => {
                router.push('/articles')
            }

            const navigateToArticle = (article) => {
                router.push(`/article/${article.category}/${article.slug}`)
            }

            // 工具方法
            const getCategoryType = (category) => {
                const types = {
                    tech: 'primary',
                    experience: 'success',
                    tutorial: 'warning',
                    news: 'info'
                }
                return types[category] || 'info'
            }

            const formatDate = (dateString) => {
                const date = new Date(dateString)
                return date.toLocaleDateString('zh-TW', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            }

            // 提交聯繫表單
            const submitContact = async () => {
                if (!contactData.name || !contactData.email || !contactData.message) {
                    ElMessage.warning('請填寫完整資訊')
                    return
                }

                isSubmitting.value = true

                try {
                    // 模擬發送請求
                    await new Promise(resolve => setTimeout(resolve, 2000))

                    ElMessage.success('訊息發送成功！我會盡快回覆您')

                    // 清空表單
                    contactData.name = ''
                    contactData.email = ''
                    contactData.message = ''

                } catch (error) {
                    ElMessage.error('發送失敗，請稍後再試')
                } finally {
                    isSubmitting.value = false
                }
            }

            // 組件掛載
            onMounted(() => {
                console.log('Home page mounted')
            })

            return {
                skills,
                recentArticles,
                contactData,
                isSubmitting,
                navigateToPortfolio,
                navigateToAbout,
                navigateToArticles,
                navigateToArticle,
                getCategoryType,
                formatDate,
                submitContact
            }
        }
    }
}