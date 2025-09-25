import { ref, reactive, computed, onMounted } from 'vue'
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

        // 載入狀態
        const loading = ref(true)

        // 專案資料（從服務載入）
        const projects = ref([])
        const statistics = ref([])

        // 計算屬性：篩選後的專案
        const filteredProjects = computed(() => {
            if (activeFilter.value === 'all') {
                return projects.value
            }
            return projects.value.filter(project => project.category === activeFilter.value)
        })

        // 載入專案資料
        const loadProjects = async () => {
            loading.value = true

            try {
                // 載入專案資料
                const projectsData = await portfolioService.getAllProjects()
                projects.value = projectsData

                // 載入統計資料
                const statsData = await portfolioService.getStatistics()
                statistics.value = statsData

                console.log('專案資料載入完成:', projects.value.length, '個專案')

            } catch (error) {
                console.error('載入專案資料失敗:', error)
                ElMessage.error('載入專案資料失敗，請重新整理頁面')
            } finally {
                loading.value = false
            }
        }

        // 搜尋專案
        const searchProjects = async (keyword) => {
            try {
                const results = await portfolioService.searchProjects(keyword)
                projects.value = results
            } catch (error) {
                console.error('搜尋專案失敗:', error)
                ElMessage.error('搜尋失敗')
            }
        }

        // 方法
        const handleFilterChange = async (tab) => {
            console.log('Filter changed:', tab.name)
            activeFilter.value = tab.name

            try {
                const filteredData = await portfolioService.getProjectsByCategory(tab.name)
                // 注意：這裡不直接設定 projects.value，因為我們使用 computed 屬性來篩選
                // projects.value = filteredData
            } catch (error) {
                console.error('篩選專案失敗:', error)
            }
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

        // 工具方法（使用服務中的方法）
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

        // 重新載入專案資料
        const reloadProjects = async () => {
            try {
                await portfolioService.reloadProjects()
                await loadProjects()
                ElMessage.success('專案資料重新載入成功')
            } catch (error) {
                console.error('重新載入失敗:', error)
                ElMessage.error('重新載入失敗')
            }
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
        onMounted(async () => {
            console.log('Portfolio page mounted')

            // 載入專案資料
            await loadProjects()

            // 啟用動畫效果
            animateProjects()
        })

        return {
            activeFilter,
            showProjectDetail,
            selectedProject,
            loading,
            projects,
            filteredProjects,
            statistics,
            loadProjects,
            searchProjects,
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
            formatDate,
            reloadProjects
        }
    }
}