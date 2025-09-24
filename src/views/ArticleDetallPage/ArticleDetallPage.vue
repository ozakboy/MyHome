<template>
    <div class="app-article-detail">
        <div class="page-container">
            <!-- Loading State -->
            <div v-if="loading" class="loading-container">
                <el-skeleton :rows="10" animated />
            </div>

            <!-- Article Not Found -->
            <div v-else-if="!article" class="not-found">
                <el-result icon="warning"
                           title="文章不存在"
                           sub-title="抱歉，您要查看的文章不存在或已被刪除">
                    <template #extra>
                        <el-button type="primary" @click="goBack">返回文章列表</el-button>
                    </template>
                </el-result>
            </div>

            <!-- Article Content -->
            <article v-else class="article-container">
                <!-- Article Header -->
                <header class="article-header">
                    <div class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: '/articles' }">專欄文章</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: `/articles/${article.category}` }">
                                {{ getCategoryName(article.category) }}
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>

                    <div class="article-meta">
                        <el-tag :type="getCategoryType(article.category)" size="large">
                            {{ getCategoryName(article.category) }}
                        </el-tag>

                        <div class="meta-info">
                            <span class="publish-date">
                                <el-icon><Calendar /></el-icon>
                                {{ formatDate(article.date) }}
                            </span>

                            <span class="reading-time">
                                <el-icon><Clock /></el-icon>
                                {{ article.readingTime }} 分鐘閱讀
                            </span>

                            <span class="view-count">
                                <el-icon><View /></el-icon>
                                {{ article.views }} 次查看
                            </span>
                        </div>
                    </div>

                    <h1 class="article-title">{{ article.title }}</h1>

                    <div class="article-tags">
                        <el-tag v-for="tag in article.tags"
                                :key="tag"
                                effect="plain"
                                class="tag-item">
                            {{ tag }}
                        </el-tag>
                    </div>

                    <!-- Social Share -->
                    <div class="social-share">
                        <span class="share-label">分享文章：</span>
                        <el-button-group>
                            <el-button @click="shareToFacebook" size="small">
                                <el-icon><Share /></el-icon>
                                Facebook
                            </el-button>
                            <el-button @click="shareToTwitter" size="small">
                                <el-icon><Share /></el-icon>
                                Twitter
                            </el-button>
                            <el-button @click="copyLink" size="small">
                                <el-icon><Link /></el-icon>
                                複製連結
                            </el-button>
                        </el-button-group>
                    </div>
                </header>

                <!-- Article Body -->
                <div class="article-body">
                    <div class="content-wrapper">
                        <!-- Table of Contents -->
                        <aside class="table-of-contents" v-if="tableOfContents.length > 0">
                            <h3>目錄</h3>
                            <nav class="toc-nav">
                                <ul>
                                    <li v-for="heading in tableOfContents"
                                        :key="heading.id"
                                        :class="`toc-level-${heading.level}`">
                                        <a :href="`#${heading.id}`"
                                           @click.prevent="scrollToHeading(heading.id)"
                                           :class="{ active: activeHeading === heading.id }">
                                            {{ heading.text }}
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        <!-- Main Content -->
                        <div class="main-content">
                            <div class="markdown-content"
                                 v-html="renderedContent"
                                 ref="markdownContainer"></div>

                            <!-- Article Actions -->
                            <div class="article-actions">
                                <div class="like-section">
                                    <el-button :type="isLiked ? 'primary' : 'default'"
                                               @click="toggleLike"
                                               size="large"
                                               class="like-button">
                                        <el-icon><Star /></el-icon>
                                        {{ isLiked ? '已收藏' : '收藏文章' }}
                                        <span class="like-count">{{ article.likes }}</span>
                                    </el-button>
                                </div>

                                <div class="navigation-buttons">
                                    <el-button @click="goBack" size="large">
                                        <el-icon><ArrowLeft /></el-icon>
                                        返回列表
                                    </el-button>

                                    <el-button type="primary" @click="scrollToTop" size="large">
                                        <el-icon><Top /></el-icon>
                                        回到頂部
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Related Articles -->
                <section v-if="relatedArticles.length > 0" class="related-articles">
                    <h2 class="section-title">相關文章</h2>

                    <div class="related-grid">
                        <div v-for="relatedArticle in relatedArticles"
                             :key="relatedArticle.id"
                             class="related-item"
                             @click="navigateToArticle(relatedArticle)">
                            <el-card shadow="hover" class="related-card">
                                <div class="related-content">
                                    <div class="related-meta">
                                        <el-tag :type="getCategoryType(relatedArticle.category)" size="small">
                                            {{ getCategoryName(relatedArticle.category) }}
                                        </el-tag>
                                        <span class="related-date">{{ formatDate(relatedArticle.date) }}</span>
                                    </div>

                                    <h3 class="related-title">{{ relatedArticle.title }}</h3>
                                    <p class="related-excerpt">{{ relatedArticle.excerpt }}</p>

                                    <div class="related-tags">
                                        <el-tag v-for="tag in relatedArticle.tags.slice(0, 2)"
                                                :key="tag"
                                                size="small"
                                                effect="plain">
                                            {{ tag }}
                                        </el-tag>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </section>

                <!-- Comments Section -->
                <section class="comments-section">
                    <h2 class="section-title">留言討論</h2>

                    <div class="comment-form">
                        <el-form ref="commentForm" :model="commentData" label-position="top">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="姓名" required>
                                        <el-input v-model="commentData.name" placeholder="請輸入您的姓名" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="信箱" required>
                                        <el-input v-model="commentData.email" placeholder="請輸入您的信箱" />
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item label="留言內容" required>
                                <el-input v-model="commentData.message"
                                          type="textarea"
                                          :rows="4"
                                          placeholder="分享您的想法或提出問題..." />
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary"
                                           @click="submitComment"
                                           :loading="isSubmittingComment"
                                           size="large">
                                    發表留言
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div class="comments-list">
                        <div v-if="comments.length === 0" class="no-comments">
                            <el-empty description="暫無留言，成為第一個留言的人吧！" />
                        </div>

                        <div v-else>
                            <div v-for="comment in comments"
                                 :key="comment.id"
                                 class="comment-item">
                                <div class="comment-avatar">
                                    <el-avatar :size="40">{{ comment.name.charAt(0) }}</el-avatar>
                                </div>

                                <div class="comment-content">
                                    <div class="comment-header">
                                        <span class="comment-name">{{ comment.name }}</span>
                                        <span class="comment-date">{{ formatDate(comment.date) }}</span>
                                    </div>

                                    <p class="comment-message">{{ comment.message }}</p>

                                    <div class="comment-actions">
                                        <el-button type="text"
                                                   size="small"
                                                   @click="replyToComment(comment)">
                                            回覆
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </div>
    </div>
</template>


<script src="./ArticleDetallPage.js"></script>
<style type="text/scss" lang="scss">
    @use './ArticleDetallPage.scss';
</style>