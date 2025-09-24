import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'AboutPage',

    setup() {
        // 技能分類資料
        const skillCategories = ref([
            {
                id: 1,
                title: '後端技術',
                icon: 'Server',
                color: '#667eea',
                skills: [
                    { name: 'C# / .NET Core', level: 95 },
                    { name: 'Web API / RESTful', level: 90 },
                    { name: 'MSSQL / PostgreSQL', level: 85 },
                    { name: 'Redis / MongoDB', level: 80 },
                    { name: 'RabbitMQ / Kafka', level: 75 }
                ]
            },
            {
                id: 2,
                title: '前端技術',
                icon: 'Monitor',
                color: '#f093fb',
                skills: [
                    { name: 'Vue.js 3', level: 90 },
                    { name: 'HTML5 / CSS3', level: 95 },
                    { name: 'JavaScript / ES6+', level: 85 },
                    { name: 'SCSS / Tailwind', level: 80 },
                    { name: 'TypeScript', level: 75 }
                ]
            },
            {
                id: 3,
                title: 'DevOps & 工具',
                icon: 'Setting',
                color: '#4facfe',
                skills: [
                    { name: 'Docker / K8s', level: 80 },
                    { name: 'CI/CD Pipeline', level: 85 },
                    { name: 'Git / GitHub', level: 95 },
                    { name: 'Azure / AWS', level: 75 },
                    { name: 'Linux / Shell', level: 70 }
                ]
            }
        ])

        // 工作經歷資料
        const experiences = ref([
            {
                period: '2022 - 現在',
                company: '自由接案',
                position: '全棧系統工程師',
                type: 'primary',
                description: '為各類客戶提供客製化系統開發服務，包含網頁應用、交易系統、Bot 開發等',
                achievements: [
                    '獨立完成 5+ 個大型專案的設計與開發',
                    '開發高頻交易系統，每日處理超過百萬筆交易',
                    '設計並實現多個 Line Bot 與 Discord Bot 專案',
                    '協助客戶將系統架構微服務化，提升 40% 的系統效能'
                ],
                technologies: ['C#', '.NET Core', 'Vue.js', 'Docker', '微服務', 'Bot 開發']
            },
            {
                period: '2020 - 2022',
                company: '科技股份有限公司',
                position: '資深後端工程師',
                type: 'success',
                description: '負責公司核心產品的後端開發與架構設計，帶領團隊完成多項重要專案',
                achievements: [
                    '主導公司產品從單體架構轉換為微服務架構',
                    '優化資料庫查詢效能，降低 60% 的回應時間',
                    '建立自動化部署流程，縮短 50% 的部署時間',
                    '指導 3 名初級工程師，協助團隊技術成長'
                ],
                technologies: ['C#', '.NET Core', 'MSSQL', 'Redis', 'RabbitMQ', 'Azure']
            },
            {
                period: '2018 - 2020',
                company: '軟體開發公司',
                position: '後端工程師',
                type: 'warning',
                description: '參與多個客戶專案的開發，累積豐富的實戰經驗',
                achievements: [
                    '獨立完成 3 個中型專案的後端開發',
                    '導入單元測試，提升程式碼品質',
                    '優化 API 效能，提升 30% 的處理速度'
                ],
                technologies: ['C#', '.NET Framework', 'Web API', 'Entity Framework', 'MSSQL']
            }
        ])

        // 專業認證資料
        const certificates = ref([
            {
                id: 1,
                name: 'Microsoft Certified: Azure Developer Associate',
                issuer: 'Microsoft',
                date: '2023年6月',
                icon: 'Trophy',
                color: '#0078d4'
            },
            {
                id: 2,
                name: 'AWS Certified Developer - Associate',
                issuer: 'Amazon Web Services',
                date: '2022年11月',
                icon: 'Medal',
                color: '#ff9900'
            },
            {
                id: 3,
                name: 'Professional Scrum Master I',
                issuer: 'Scrum.org',
                date: '2021年8月',
                icon: 'Award',
                color: '#4a90e2'
            }
        ])

        // 教育背景資料
        const education = ref([
            {
                id: 1,
                degree: '資訊工程學系 學士',
                school: '國立科技大學',
                period: '2014 - 2018',
                description: 'GPA: 3.8/4.0，專題：智慧交易系統開發'
            }
        ])

        // 個人興趣資料
        const interests = ref([
            { id: 1, name: '程式開發', icon: 'Monitor', color: '#667eea' },
            { id: 2, name: '金融科技', icon: 'TrendCharts', color: '#43e97b' },
            { id: 3, name: '開源貢獻', icon: 'Share', color: '#f093fb' },
            { id: 4, name: '技術寫作', icon: 'EditPen', color: '#ffd700' },
            { id: 5, name: '健身運動', icon: 'Soccer', color: '#ff6b6b' },
            { id: 6, name: '閱讀學習', icon: 'Reading', color: '#4facfe' }
        ])

        // 方法
        const openEmail = () => {
            window.location.href = 'mailto:awc0450056@gmail.com'
        }

        const downloadResume = () => {
            ElMessage.info('履歷下載功能開發中...')
            // 實際專案中會下載 PDF 檔案
            // window.open('/resume.pdf', '_blank')
        }

        // 動畫效果
        const animateSkills = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('skill-animated')
                    }
                })
            })

            document.querySelectorAll('.skill-item').forEach(el => {
                observer.observe(el)
            })
        }

        // 組件掛載
        onMounted(() => {
            console.log('About page mounted')
            animateSkills()
        })

        return {
            skillCategories,
            experiences,
            certificates,
            education,
            interests,
            openEmail,
            downloadResume
        }
    }
}