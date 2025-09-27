import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import portfolioService from '@/services/portfolioService'

export default {
    name: 'PortfolioPage',

    setup() {
        const router = useRouter()

        // 篩選狀態
        const activeFilter = ref('all')

        // 專案詳情彈窗
        const showProjectDetail = ref(false)
        const selectedProject = ref(null)

        // 載入狀態（只有初始載入）
        const loading = ref(true)

        // 所有專案資料（一次載入後不再改變）
        const allProjects = ref([])
        const statistics = ref([])

        // 計算屬性：根據篩選條件顯示專案（純前端篩選）
        const filteredProjects = computed(() => {
            if (activeFilter.value === 'all') {
                return allProjects.value
            }

            return allProjects.value.filter(project =>
                project.category === activeFilter.value
            )
        })

        // 初始載入專案資料（只執行一次）
        const loadProjects = async () => {
            loading.value = true

            try {
                // 載入專案資料（只載入一次）
                const projectsData = await portfolioService.loadProjects()
                allProjects.value = projectsData

                // 載入統計資料
                const statsData = portfolioService.getStatistics()
                statistics.value = statsData

                console.log('專案資料載入完成:', allProjects.value.length, '個專案')

            } catch (error) {
                console.error('載入專案資料失敗:', error)
                ElMessage.error('載入專案資料失敗，請重新整理頁面')

                allProjects.value = []
                statistics.value = []
            } finally {
                loading.value = false
            }
        }

        // 處理篩選器變更（純前端操作）
        const handleFilterChange = (tab) => {
            console.log(tab);          

            console.log('前端篩選切換:', tab)
            activeFilter.value = tab

            // 重新觸發動畫
            setTimeout(() => {
                animateProjects()
            }, 50)
        }

        // 直接設定篩選條件
        const setFilter = (category) => {
            console.log('設定篩選條件:', category)
            activeFilter.value = category

            setTimeout(() => {
                animateProjects()
            }, 50)
        }

        // 搜尋專案（純前端搜尋）
        const searchProjects = (keyword) => {
            if (!keyword || keyword.trim() === '') {
                activeFilter.value = 'all'
                return
            }

            console.log('前端搜尋:', keyword)
            const results = portfolioService.searchProjects(keyword)

            // 這裡可以設定搜尋結果，或者您可以新增一個搜尋模式
            console.log('搜尋結果:', results.length, '個專案')
        }

        // 專案詳情相關方法
        const openProjectDetail = (project) => {
            if (!project) return

            selectedProject.value = project
            showProjectDetail.value = true
        }

        const closeProjectDetail = () => {
            showProjectDetail.value = false
            selectedProject.value = null
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

        // 工具方法（直接使用服務）
        const getCategoryName = (category) => {
            return portfolioService.getCategoryName(category)
        }

        const getCategoryType = (category) => {
            return portfolioService.getCategoryType(category)
        }

        const getStatusType = (status) => {
            return portfolioService.getStatusType(status)
        }

        const getStatusText = (status) => {
            return portfolioService.getStatusText(status)
        }

        const formatDate = (dateString) => {
            return portfolioService.formatDate(dateString)
        }

        // 動畫效果
        const animateProjects = () => {
            // 清除現有動畫
            document.querySelectorAll('.project-item').forEach(el => {
                el.classList.remove('project-animated')
            })

            // 延遲後重新添加動畫
            setTimeout(() => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('project-animated')
                        }
                    })
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                })

                document.querySelectorAll('.project-item').forEach((el, index) => {
                    el.style.animationDelay = `${index * 0.1}s`
                    observer.observe(el)
                })
            }, 50)
        }

        // 組件掛載
        onMounted(async () => {
            console.log('Portfolio page mounted')

            try {
                // 只在初始載入時讀取資料
                await loadProjects()

                // 啟用動畫效果
                setTimeout(() => {
                    animateProjects()
                }, 200)

            } catch (error) {
                console.error('頁面初始化失敗:', error)
                ElMessage.error('頁面載入失敗')
            }
        })

        return {
            // 狀態
            activeFilter,
            showProjectDetail,
            selectedProject,
            loading,

            // 數據
            allProjects,
            filteredProjects,
            statistics,

            // 方法
            handleFilterChange,
            setFilter,
            searchProjects,
            openProjectDetail,
            closeProjectDetail,
            openGithub,
            openDemo,
            openEmail,
            navigateToAbout,

            // 工具方法
            getCategoryName,
            getCategoryType,
            getStatusType,
            getStatusText,
            formatDate,
            animateProjects
        }
    }
}