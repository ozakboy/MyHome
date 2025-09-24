import MarkdownIt from 'markdown-it'

// 配置 Markdown-it
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
})

// 文章資料結構（實際專案中可從 API 或檔案系統讀取）
const articlesData = [
    {
        id: 1,
        title: 'Vue 3 組合式 API 深度解析',
        slug: 'vue3-composition-api-deep-dive',
        category: 'tech',
        categoryName: '技術分享',
        date: '2024-01-15',
        excerpt: '深入探討 Vue 3 組合式 API 的優勢與實際應用場景，讓你的開發更加高效。組合式 API 提供了更好的邏輯複用和類型推導支持...',
        tags: ['Vue.js', 'JavaScript', '前端開發', 'Composition API'],
        readingTime: 8,
        views: 1205,
        likes: 89,
        image: '/api/placeholder/400/200',
        content: `
# Vue 3 組合式 API 深度解析

## 前言

Vue 3 引入的組合式 API（Composition API）是一個革命性的功能，它為 Vue 開發者提供了更靈活、更強大的程式碼組織方式。

## 什麼是組合式 API？

組合式 API 是一套 API，讓我們可以使用函數而非宣告選項的方式書寫 Vue 組件。

### 基本語法

\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('組件已掛載')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
\`\`\`

## 優勢分析

### 1. 更好的邏輯複用

組合式 API 讓我們能夠將相關的邏輯組合到一起，並輕鬆地在多個組件間重用。

### 2. 更好的類型推導

對於 TypeScript 用戶來說，組合式 API 提供了更好的類型推導支持。

### 3. 更靈活的程式碼組織

不再被選項式 API 的結構所束縛，可以按照邏輯關係組織程式碼。

## 實際應用場景

### 資料獲取邏輯

\`\`\`javascript
import { ref, onMounted } from 'vue'

function useUserData(userId) {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const fetchUser = async () => {
    loading.value = true
    try {
      const response = await fetch(\`/api/users/\${userId}\`)
      user.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  onMounted(fetchUser)
  
  return {
    user,
    loading,
    error,
    refetch: fetchUser
  }
}
\`\`\`

## 總結

組合式 API 是 Vue 3 的一大亮點，它為開發者提供了更多的靈活性和可維護性。雖然學習曲線可能略陡峭，但一旦掌握，將大大提升開發效率。
    `
    },
    {
        id: 2,
        title: 'C# .NET 微服務架構設計實戰',
        slug: 'dotnet-microservices-architecture',
        category: 'experience',
        categoryName: '開發心得',
        date: '2024-01-12',
        excerpt: '從零開始設計一個完整的微服務架構，包含服務發現、負載均衡、API 閘道等核心概念，以及實際的程式碼實現...',
        tags: ['C#', '.NET', '微服務', '架構設計', 'Docker'],
        readingTime: 12,
        views: 987,
        likes: 76,
        image: '/api/placeholder/400/200',
        content: `
# C# .NET 微服務架構設計實戰

## 微服務架構概述

微服務架構是一種將單一應用程式開發為一套小型服務的方法，每個服務都在自己的進程中運行，並使用輕量級機制通信。

## 核心組件設計

### 1. API 閘道

\`\`\`csharp
public class ApiGateway
{
    private readonly IServiceDiscovery _serviceDiscovery;
    private readonly ILoadBalancer _loadBalancer;
    
    public async Task<HttpResponseMessage> RouteRequest(HttpRequest request)
    {
        var serviceName = ExtractServiceName(request.Path);
        var serviceInstance = await _serviceDiscovery.GetService(serviceName);
        var targetUrl = _loadBalancer.SelectInstance(serviceInstance);
        
        return await ForwardRequest(request, targetUrl);
    }
}
\`\`\`

### 2. 服務發現

實現服務註冊與發現機制...
    `
    },
    {
        id: 3,
        title: '高頻交易系統開發經驗分享',
        slug: 'high-frequency-trading-system',
        category: 'tutorial',
        categoryName: '教學文章',
        date: '2024-01-10',
        excerpt: '分享開發期貨高頻交易系統的經驗，包含效能優化、風險控制、延遲處理等關鍵要素，以及如何構建穩定可靠的交易引擎...',
        tags: ['高頻交易', '期貨', '效能優化', '金融科技'],
        readingTime: 15,
        views: 1450,
        likes: 124,
        image: '/api/placeholder/400/200',
        content: `
# 高頻交易系統開發經驗分享

## 系統架構設計

高頻交易系統對延遲要求極其嚴格，通常需要在微秒級別內完成交易決策和執行。

### 核心組件

1. **市場資料處理器**
2. **交易策略引擎**
3. **風險管理模組**
4. **訂單管理系統**

## 效能優化策略

### 記憶體管理

\`\`\`csharp
// 使用物件池減少 GC 壓力
public class OrderPool
{
    private readonly ConcurrentQueue<Order> _pool = new();
    
    public Order Get()
    {
        if (_pool.TryDequeue(out var order))
        {
            order.Reset();
            return order;
        }
        return new Order();
    }
    
    public void Return(Order order)
    {
        _pool.Enqueue(order);
    }
}
\`\`\`

## 風險控制

風險控制是高頻交易系統的生命線...
    `
    }
]

// 模擬的文章分類和標籤數據
const categories = {
    all: '全部文章',
    tech: '技術分享',
    experience: '開發心得',
    tutorial: '教學文章',
    news: '技術動態'
}

// Markdown 服務類
class MarkdownService {
    constructor() {
        this.articles = articlesData
        this.categories = categories
    }

    // 獲取所有文章
    getAllArticles() {
        return this.articles
    }

    // 根據分類獲取文章
    getArticlesByCategory(category) {
        if (category === 'all' || !category) {
            return this.articles
        }
        return this.articles.filter(article => article.category === category)
    }

    // 根據 slug 獲取單篇文章
    getArticleBySlug(category, slug) {
        return this.articles.find(article =>
            article.category === category && article.slug === slug
        )
    }

    // 搜尋文章
    searchArticles(keyword) {
        if (!keyword) return this.articles

        const lowerKeyword = keyword.toLowerCase()
        return this.articles.filter(article =>
            article.title.toLowerCase().includes(lowerKeyword) ||
            article.excerpt.toLowerCase().includes(lowerKeyword) ||
            article.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
        )
    }

    // 獲取熱門文章
    getFeaturedArticles(limit = 5) {
        return this.articles
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, limit)
    }

    // 獲取熱門標籤
    getPopularTags() {
        const tagCount = {}

        this.articles.forEach(article => {
            article.tags.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1
            })
        })

        return Object.entries(tagCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 20)
    }

    // 渲染 Markdown 內容
    renderMarkdown(content) {
        return md.render(content)
    }

    // 獲取分類名稱
    getCategoryName(category) {
        return this.categories[category] || category
    }

    // 排序文章
    sortArticles(articles, sortBy) {
        const sortedArticles = [...articles]

        switch (sortBy) {
            case 'date-desc':
                return sortedArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
            case 'date-asc':
                return sortedArticles.sort((a, b) => new Date(a.date) - new Date(b.date))
            case 'title-asc':
                return sortedArticles.sort((a, b) => a.title.localeCompare(b.title))
            case 'title-desc':
                return sortedArticles.sort((a, b) => b.title.localeCompare(a.title))
            case 'views-desc':
                return sortedArticles.sort((a, b) => (b.views || 0) - (a.views || 0))
            default:
                return sortedArticles
        }
    }

    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString)
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // 計算閱讀時間（基於字數估算）
    calculateReadingTime(content) {
        const wordsPerMinute = 200
        const wordCount = content.length / 2 // 中文字符粗略計算
        return Math.ceil(wordCount / wordsPerMinute)
    }

    // 生成文章摘要
    generateExcerpt(content, maxLength = 150) {
        const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ')
        return plainText.length > maxLength
            ? plainText.substring(0, maxLength) + '...'
            : plainText
    }

    // 獲取相關文章
    getRelatedArticles(currentArticle, limit = 3) {
        const currentTags = currentArticle.tags

        return this.articles
            .filter(article => article.id !== currentArticle.id)
            .map(article => ({
                ...article,
                relevanceScore: article.tags.filter(tag => currentTags.includes(tag)).length
            }))
            .filter(article => article.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit)
    }

    // 添加新文章（用於動態添加 .md 文件）
    addArticle(articleData) {
        const newArticle = {
            id: this.articles.length + 1,
            readingTime: this.calculateReadingTime(articleData.content),
            views: 0,
            likes: 0,
            ...articleData
        }

        this.articles.unshift(newArticle)
        return newArticle
    }

    // 從 Markdown 文件加載文章（模擬功能）
    async loadMarkdownFile(filePath) {
        try {
            // 在實際應用中，這裡會讀取文件系統或從 API 獲取
            // const content = await fetch(filePath).then(res => res.text())

            // 解析 front matter 和內容
            const { frontMatter, content } = this.parseFrontMatter(mockMarkdownContent)

            return {
                ...frontMatter,
                content,
                excerpt: frontMatter.excerpt || this.generateExcerpt(content)
            }
        } catch (error) {
            console.error('Error loading markdown file:', error)
            return null
        }
    }

    // 解析 Front Matter
    parseFrontMatter(markdownContent) {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
        const match = markdownContent.match(frontMatterRegex)

        if (!match) {
            return { frontMatter: {}, content: markdownContent }
        }

        const frontMatterText = match[1]
        const content = match[2]

        // 簡單的 YAML 解析（實際項目中建議使用專門的 YAML 解析庫）
        const frontMatter = {}
        frontMatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':')
            if (key && valueParts.length > 0) {
                let value = valueParts.join(':').trim()

                // 處理數組格式
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''))
                }
                // 處理引號包圍的字符串
                else if ((value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1)
                }

                frontMatter[key.trim()] = value
            }
        })

        return { frontMatter, content }
    }
}

// 模擬的 Markdown 文件內容（實際使用時會從文件讀取）
const mockMarkdownContent = `---
title: "Docker 容器化部署實戰"
slug: "docker-deployment-guide"
category: "tutorial"
date: "2024-01-08"
tags: ["Docker", "容器化", "DevOps", "部署"]
excerpt: "詳細介紹如何使用 Docker 進行應用程式容器化部署，包含 Dockerfile 編寫、多階段構建等最佳實踐"
---

# Docker 容器化部署實戰

## 什麼是 Docker？

Docker 是一個開源的容器化平台，讓開發者可以將應用程式及其依賴打包到一個輕量級、可移植的容器中。

## Dockerfile 最佳實踐

\`\`\`dockerfile
# 多階段構建範例
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:16-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 容器編排

使用 Docker Compose 管理多容器應用...`

// 創建並導出服務實例
const markdownService = new MarkdownService()

export default markdownService