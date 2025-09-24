import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'App',

    setup() {
        const route = useRoute()

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

        // 處理導航選擇
        const handleSelect = (key, keyPath) => {
            console.log('Navigation selected:', key, keyPath)
        }

        // 組件掛載後的處理
        onMounted(() => {
            console.log('App mounted successfully')

            // 添加頁面載入動畫
            document.body.classList.add('loaded')
        })

        return {
            activeIndex,
            handleSelect
        }
    }
}