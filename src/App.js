import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    House,
    User,
    Folder,
    Document,
    Message,
    ChatDotRound
} from '@element-plus/icons-vue'

export function appMainLogic() {
    return {
        components: {
            House,
            User,
            Folder,
            Document,
            Message,
            ChatDotRound
        },

        setup() {
            const route = useRoute()

            // 當前活動的導航項目
            const activeIndex = computed(() => {
                const path = route.path

                // 處理文章相關路由
                if (path.startsWith('/articles')) {
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
            })

            return {
                activeIndex,
                handleSelect
            }
        }
    }
}