import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import markdownService from '@/services/markdownService'

export default {
    name: 'ArticleDetailPage',

    setup() {
        const route = useRoute()
        const router = useRouter()

        // 狀態
        const loading = ref(true)
        const article = ref(null)
        const tableOfContents = ref([])
        const activeHeading = ref('')
        const isLiked = ref(false)
        const comments = ref([])
        const relatedArticles = ref([])

        // 留言表單
        const commentData = reactive({
            name: '',
            email: '',
            message: ''
        })
        const commentForm = ref(null)
        const isSubmittingComment = ref(false)

        // 載入文章
        const loadArticle = async () => {
            loading.value = true

            try {
                // 從服務獲取文章
                const articleData = markdownService.getArticleBySlug(
                    route.params.category,
                    route.params.slug
                )

                if (articleData) {
                    article.value = articleData

                    // 渲染 Markdown
                    await nextTick()
                    renderMarkdown()

                    // 生成目錄
                    generateTableOfContents()

                    // 載入相關文章
                    loadRelatedArticles()

                    // 載入留言
                    loadComments()

                    // 更新頁面標題
                    document.title = `${articleData.title} - 全棧系統工程師`
                } else {
                    console.error('Article not found')
                }
            } catch (error) {
                console.error('Error loading article:', error)
                ElMessage.error('載入文章失敗')
            } finally {
                loading.value = false
            }
        }

        // 渲染 Markdown 內容
        const renderMarkdown = () => {
            if (article.value && article.value.content) {
                const container = document.querySelector('.markdown-content')
                if (container) {
                    container.innerHTML = markdownService.renderMarkdown(article.value.content)

                    // 添加代碼高亮（如果有使用 highlight.js）
                    if (window.hljs) {
                        container.querySelectorAll('pre code').forEach((block) => {
                            window.hljs.highlightBlock(block)
                        })
                    }
                }
            }
        }

        // 計算屬性：渲染後的內容
        const renderedContent = computed(() => {
            if (article.value && article.value.content) {
                return markdownService.renderMarkdown(article.value.content)
            }
            return ''
        })

        // 生成目錄
        const generateTableOfContents = () => {
            const container = document.querySelector('.markdown-content')
            if (!container) return

            const headings = container.querySelectorAll('h2, h3')
            const toc = []

            headings.forEach((heading, index) => {
                const id = `heading-${index}`
                heading.id = id

                toc.push({
                    id,
                    text: heading.textContent,
                    level: parseInt(heading.tagName.charAt(1))
                })
            })

            tableOfContents.value = toc
        }

        // 滾動到指定標題
        const scrollToHeading = (headingId) => {
            const element = document.getElementById(headingId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
                activeHeading.value = headingId
            }
        }

        // 載入相關文章
        const loadRelatedArticles = () => {
            if (article.value) {
                relatedArticles.value = markdownService.getRelatedArticles(article.value, 3)
            }
        }

        // 載入留言（模擬）
        const loadComments = () => {
            // 模擬從 API 載入留言
            comments.value = [
                {
                    id: 1,
                    name: '技術愛好者',
                    email: 'user@example.com',
                    message: '寫得很詳細，學到了很多！',
                    date: '2024-01-14',
                    replies: []
                },
                {
                    id: 2,
                    name: '前端開發者',
                    email: 'dev@example.com',
                    message: '對於組合式 API 的解釋很清楚，期待更多文章！',
                    date: '2024-01-13',
                    replies: []
                }
            ]
        }

        // 提交留言
        const submitComment = async () => {
            if (!commentData.name || !commentData.email || !commentData.message) {
                ElMessage.warning('請填寫完整留言資訊')
                return
            }

            // Email 格式驗證
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(commentData.email)) {
                ElMessage.error('請輸入有效的電子郵件')
                return
            }

            isSubmittingComment.value = true

            try {
                // 模擬提交留言
                await new Promise(resolve => setTimeout(resolve, 1500))

                // 添加新留言到列表
                const newComment = {
                    id: comments.value.length + 1,
                    name: commentData.name,
                    email: commentData.email,
                    message: commentData.message,
                    date: new Date().toISOString().split('T')[0],
                    replies: []
                }

                comments.value.unshift(newComment)

                // 清空表單
                commentData.name = ''
                commentData.email = ''
                commentData.message = ''

                ElMessage.success('留言發表成功！')

            } catch (error) {
                ElMessage.error('留言發表失敗，請稍後再試')
                console.error('Comment submission error:', error)
            } finally {
                isSubmittingComment.value = false
            }
        }

        // 回覆留言
        const replyToComment = (comment) => {
            ElMessage.info('回覆功能開發中...')
            console.log('Reply to:', comment)
        }

        // 切換收藏狀態
        const toggleLike = () => {
            isLiked.value = !isLiked.value

            if (article.value) {
                if (isLiked.value) {
                    article.value.likes++
                    ElMessage.success('已收藏文章')
                } else {
                    article.value.likes--
                    ElMessage.info('已取消收藏')
                }
            }
        }

        // 分享功能
        const shareToFacebook = () => {
            const url = window.location.href
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        }

        const shareToTwitter = () => {
            const url = window.location.href
            const text = article.value ? article.value.title : ''
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
        }

        const copyLink = () => {
            navigator.clipboard.writeText(window.location.href).then(() => {
                ElMessage.success('連結已複製到剪貼簿')
            }).catch(() => {
                ElMessage.error('複製失敗')
            })
        }

        // 導航方法
        const goBack = () => {
            router.push('/articles')
        }

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        const navigateToArticle = (article) => {
            router.push(`/article/${article.category}/${article.slug}`)
        }

        // 工具方法
        const getCategoryName = (category) => {
            return markdownService.getCategoryName(category)
        }

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
            return markdownService.formatDate(dateString)
        }

        // 監聽滾動更新目錄高亮
        const handleScroll = () => {
            const container = document.querySelector('.markdown-content')
            if (!container) return

            const headings = container.querySelectorAll('h2, h3')
            let currentHeading = null

            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect()
                if (rect.top <= 100 && rect.top > -100) {
                    currentHeading = heading.id
                }
            })

            if (currentHeading) {
                activeHeading.value = currentHeading
            }
        }

        // 組件掛載
        onMounted(() => {
            loadArticle()
            window.addEventListener('scroll', handleScroll)
        })

        return {
            loading,
            article,
            tableOfContents,
            activeHeading,
            isLiked,
            comments,
            relatedArticles,
            commentData,
            commentForm,
            isSubmittingComment,
            renderedContent,
            scrollToHeading,
            submitComment,
            replyToComment,
            toggleLike,
            shareToFacebook,
            shareToTwitter,
            copyLink,
            goBack,
            scrollToTop,
            navigateToArticle,
            getCategoryName,
            getCategoryType,
            formatDate
        }
    }
}