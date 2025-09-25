import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
    name: 'PortfolioPage',

    setup() {
        const router = useRouter()

        // 篩選狀態
        const activeFilter = ref('all')

        // 專案詳情彈窗
        const showProjectDetail = ref(false)
        const selectedProject = ref(null)

        // 專案資料
        const projects = ref([
            {
                id: 1,
                title: '期貨高頻交易系統',
                description: '為金融機構開發的高頻交易系統，支援多策略並行運作，每秒可處理上千筆交易',
                fullDescription: '這是一個為專業交易機構設計的高頻交易系統，採用 C# .NET Core 開發，具備極低延遲的交易執行能力。系統支援多種交易策略的並行運作，包含套利、做市、趨勢追蹤等策略。',
                category: 'trading',
                image: '/images/projects/trading-system.jpg', // 需要圖片：期貨交易系統截圖
                gallery: [
                    '/images/projects/trading-system-1.jpg', // 需要圖片：交易系統主介面
                    '/images/projects/trading-system-2.jpg', // 需要圖片：交易圖表頁面
                    '/images/projects/trading-system-3.jpg'  // 需要圖片：風控監控頁面
                ],
                features: [
                    '微秒級延遲的交易執行',
                    '支援多策略並行運作',
                    '即時風險控制系統',
                    '完整的回測引擎',
                    '視覺化監控儀表板'
                ],
                technologies: ['C#', '.NET Core', 'Redis', 'WebSocket', 'SignalR', 'PostgreSQL'],
                status: 'production',
                date: '2023-12-01',
                duration: '6 個月',
                teamSize: '個人專案',
                challenges: [
                    {
                        title: '延遲優化',
                        solution: '使用記憶體池和無鎖資料結構，將交易延遲降低到微秒級'
                    },
                    {
                        title: '高併發處理',
                        solution: '實現事件驅動架構，支援每秒處理上千筆交易'
                    }
                ],
                github: null,
                demo: null
            },
            {
                id: 2,
                title: '企業 ERP 系統',
                description: '為中型製造業開發的完整 ERP 系統，整合進銷存、財務、人資等模組',
                fullDescription: '這是一個全方位的企業資源規劃系統，使用 Vue.js + .NET Core 開發，包含完整的前後端分離架構。系統涵蓋企業營運的各個層面，從訂單管理到財務報表，提供一站式的管理解決方案。',
                category: 'web',
                image: '/images/projects/erp-system.jpg', // 需要圖片：ERP系統截圖
                gallery: [
                    '/images/projects/erp-system-1.jpg', // 需要圖片：ERP儀表板
                    '/images/projects/erp-system-2.jpg'  // 需要圖片：ERP報表頁面
                ],
                features: [
                    '模組化系統架構',
                    '即時數據同步',
                    '多語言支援',
                    '權限管理系統',
                    '自動報表生成'
                ],
                technologies: ['Vue.js', 'C#', '.NET Core', 'MSSQL', 'Redis', 'Docker'],
                status: 'production',
                date: '2023-09-15',
                duration: '8 個月',
                teamSize: '3 人團隊',
                challenges: [
                    {
                        title: '複雜業務邏輯',
                        solution: '採用領域驅動設計(DDD)，清晰劃分業務邊界'
                    },
                    {
                        title: '效能優化',
                        solution: '實施快取策略和資料庫索引優化，提升 50% 查詢速度'
                    }
                ],
                github: null,
                demo: 'https://demo.example.com'
            },
            {
                id: 3,
                title: '智能客服 Line Bot',
                description: '整合 AI 的智能客服機器人，支援自然語言處理，24/7 自動回覆客戶詢問',
                fullDescription: '結合 OpenAI API 開發的智能客服系統，能夠理解自然語言並提供準確的回覆。系統包含知識庫管理、對話紀錄分析、客戶滿意度追蹤等功能。',
                category: 'bot',
                image: '/images/projects/line-bot.jpg', // 需要圖片：Line Bot對話截圖
                gallery: [
                    '/images/projects/line-bot-1.jpg' // 需要圖片：Line Bot功能展示
                ],
                features: [
                    '自然語言理解',
                    'FAQ 自動回覆',
                    '人工客服轉接',
                    '對話紀錄分析',
                    '多媒體訊息支援'
                ],
                technologies: ['Node.js', 'Line SDK', 'OpenAI API', 'MongoDB', 'Express'],
                status: 'production',
                date: '2023-07-20',
                duration: '3 個月',
                teamSize: '個人專案',
                challenges: [
                    {
                        title: 'AI 回覆準確性',
                        solution: '建立專屬知識庫並進行模型微調，提升回覆準確率到 95%'
                    }
                ],
                github: 'https://github.com/example/linebot',
                demo: null
            },
            {
                id: 4,
                title: '微服務電商平台',
                description: '採用微服務架構的電商平台，支援高併發、彈性擴展，日交易量超過十萬筆',
                fullDescription: '這是一個完整的電商解決方案，採用微服務架構設計，每個服務獨立部署和擴展。系統包含商品管理、訂單處理、支付整合、物流追蹤等完整功能。',
                category: 'microservice',
                image: '/images/projects/ecommerce-platform.jpg', // 需要圖片：電商平台首頁
                gallery: [
                    '/images/projects/ecommerce-1.jpg', // 需要圖片：商品列表頁
                    '/images/projects/ecommerce-2.jpg', // 需要圖片：購物車頁面
                    '/images/projects/ecommerce-3.jpg'  // 需要圖片：結帳流程頁
                ],
                features: [
                    '微服務架構設計',
                    '容器化部署',
                    '自動擴展機制',
                    'API Gateway',
                    '分散式事務處理'
                ],
                technologies: ['Docker', 'Kubernetes', '.NET Core', 'RabbitMQ', 'Redis', 'PostgreSQL'],
                status: 'production',
                date: '2023-05-10',
                duration: '10 個月',
                teamSize: '5 人團隊',
                challenges: [
                    {
                        title: '服務間通訊',
                        solution: '實現事件驅動架構，使用 RabbitMQ 處理非同步通訊'
                    },
                    {
                        title: '分散式事務',
                        solution: '採用 Saga 模式處理跨服務事務，確保資料一致性'
                    }
                ],
                github: null,
                demo: 'https://shop.example.com'
            },
            {
                id: 5,
                title: 'Discord 遊戲社群 Bot',
                description: '為遊戲社群開發的多功能 Discord Bot，包含遊戲資訊查詢、活動管理等功能',
                fullDescription: '專為遊戲社群設計的 Discord Bot，提供遊戲資訊查詢、隊伍配對、活動管理、積分系統等豐富功能，提升社群互動體驗。',
                category: 'bot',
                image: '/images/projects/discord-bot.jpg', // 需要圖片：Discord Bot介面
                gallery: [
                    '/images/projects/discord-bot-1.jpg', // 需要圖片：Bot指令展示
                    '/images/projects/discord-bot-2.jpg'  // 需要圖片：Bot管理介面
                ],
                features: [
                    '遊戲資訊即時查詢',
                    '自動隊伍配對系統',
                    '活動報名管理',
                    '積分與排行榜系統',
                    '音樂播放功能'
                ],
                technologies: ['Python', 'Discord.py', 'PostgreSQL', 'Redis', 'Docker'],
                status: 'production',
                date: '2023-03-25',
                duration: '2 個月',
                teamSize: '個人專案',
                challenges: [
                    {
                        title: '高併發處理',
                        solution: '使用異步程式設計和連接池，支援同時服務多個伺服器'
                    }
                ],
                github: 'https://github.com/example/discord-bot',
                demo: null
            },
            {
                id: 6,
                title: '即時股票監控系統',
                description: '即時監控股票價格變動，支援技術指標分析與自動提醒功能',
                fullDescription: '整合多個數據源的股票監控系統，提供即時報價、技術分析、異常提醒等功能。使用 WebSocket 實現即時數據推送，確保用戶獲得最新市場資訊。',
                category: 'trading',
                image: '/images/projects/stock-monitor.jpg', // 需要圖片：股票監控系統介面
                gallery: [
                    '/images/projects/stock-monitor-1.jpg' // 需要圖片：K線圖表展示
                ],
                features: [
                    '即時股價監控',
                    '技術指標分析',
                    '自訂提醒條件',
                    '歷史數據回測',
                    'K線圖表顯示'
                ],
                technologies: ['Vue.js', 'Node.js', 'WebSocket', 'TradingView', 'MongoDB'],
                status: 'development',
                date: '2024-01-05',
                duration: '進行中',
                teamSize: '2 人團隊',
                challenges: [
                    {
                        title: '數據即時性',
                        solution: '使用 WebSocket 和事件驅動架構，確保毫秒級數據更新'
                    }
                ],
                github: null,
                demo: null
            }
        ])

        // 計算屬性：篩選後的專案
        const filteredProjects = computed(() => {
            if (activeFilter.value === 'all') {
                return projects.value
            }
            return projects.value.filter(project => project.category === activeFilter.value)
        })

        // 統計資料
        const statistics = ref([
            { label: '完成專案', value: '20+', icon: 'Folder', color: '#667eea' },
            { label: '服務客戶', value: '50+', icon: 'User', color: '#f093fb' },
            { label: '程式碼行數', value: '100K+', icon: 'DocumentCopy', color: '#43e97b' },
            { label: '滿意度', value: '98%', icon: 'Star', color: '#ffd700' }
        ])

        // 方法
        const handleFilterChange = (tab) => {
            console.log('Filter changed:', tab.name)
        }

        const openProjectDetail = (project) => {
            selectedProject.value = project
            showProjectDetail.value = true
        }

        const openGithub = (url) => {
            if (url) {
                window.open(url, '_blank')
            } else {
                ElMessage.info('此專案的原始碼為私有專案')
            }
        }

        const openDemo = (url) => {
            if (url) {
                window.open(url, '_blank')
            } else {
                ElMessage.info('此專案暫無線上展示')
            }
        }

        const openEmail = () => {
            window.location.href = 'mailto:awc0450056@gmail.com?subject=專案合作諮詢'
        }

        const navigateToAbout = () => {
            router.push('/about')
        }

        // 工具方法
        const getCategoryName = (category) => {
            const names = {
                web: '網頁應用',
                bot: 'Bot 開發',
                trading: '交易系統',
                microservice: '微服務'
            }
            return names[category] || category
        }

        const getCategoryType = (category) => {
            const types = {
                web: 'primary',
                bot: 'success',
                trading: 'warning',
                microservice: 'info'
            }
            return types[category] || 'info'
        }

        const getStatusType = (status) => {
            const types = {
                production: 'success',
                development: 'warning',
                planning: 'info'
            }
            return types[status] || 'info'
        }

        const getStatusText = (status) => {
            const texts = {
                production: '已上線',
                development: '開發中',
                planning: '規劃中'
            }
            return texts[status] || status
        }

        const formatDate = (dateString) => {
            const date = new Date(dateString)
            return date.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: 'long'
            })
        }

        // 動畫效果
        const animateProjects = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('project-animated')
                    }
                })
            })

            setTimeout(() => {
                document.querySelectorAll('.project-item').forEach(el => {
                    observer.observe(el)
                })
            }, 100)
        }

        // 組件掛載
        onMounted(() => {
            console.log('Portfolio page mounted')
            animateProjects()
        })

        return {
            activeFilter,
            showProjectDetail,
            selectedProject,
            projects,
            filteredProjects,
            statistics,
            handleFilterChange,
            openProjectDetail,
            openGithub,
            openDemo,
            openEmail,
            navigateToAbout,
            getCategoryName,
            getCategoryType,
            getStatusType,
            getStatusText,
            formatDate
        }
    }
}