import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'App',

    setup() {
        const route = useRoute()

        // 螢幕寬度響應式狀態
        const screenWidth = ref(window.innerWidth)

        // 當前活動的導航項目
        const activeIndex = computed(() => {
            const path = route.path

            // 處理文章相關路由
            if (path.startsWith('/articles')) {
                return '/articles'
            }
            if (path.startsWith('/article/')) {
                return '/articles'
            }

            return path
        })

        // 處理視窗大小改變
        const handleResize = () => {
            screenWidth.value = window.innerWidth
        }

        // 處理導航選擇
        const handleSelect = (key, keyPath) => {
            console.log('Navigation selected:', key, keyPath)
        }

        // 組件掛載後的處理
        onMounted(() => {
            console.log('App mounted successfully')

            // 監聽視窗大小變化
            window.addEventListener('resize', handleResize)

            // 添加頁面載入動畫
            document.body.classList.add('loaded')

            // 初始設置
            handleResize()
        })

        // 組件卸載時清除事件監聽
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize)
        })

        return {
            activeIndex,
            screenWidth,
            handleSelect
        }
    }
}