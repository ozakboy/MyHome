<template>
    <div class="app-portfolio">
        <div class="page-container">
            <!-- Header -->
            <div class="portfolio-header">
                <h1 class="page-title">作品集</h1>
                <p class="page-subtitle">
                    展示我在全棧開發、系統架構、Bot 開發等領域的專案成果
                </p>
            </div>

            <!-- Filter Tabs -->
            <div class="portfolio-filter">
                <el-tabs v-model="activeFilter"
                         @tab-change	="handleFilterChange"
                         class="filter-tabs">
                    <el-tab-pane label="全部專案" name="all"></el-tab-pane>
                    <el-tab-pane label="網頁應用" name="web"></el-tab-pane>
                    <el-tab-pane label="Bot 開發" name="bot"></el-tab-pane>
                    <el-tab-pane label="交易系統" name="trading"></el-tab-pane>
                    <el-tab-pane label="微服務" name="microservice"></el-tab-pane>
                </el-tabs>
            </div>

            <!-- Loading State (只在初始載入時顯示) -->
            <div v-if="loading" class="loading-container">
                <el-skeleton :rows="8" animated />
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredProjects.length === 0" class="empty-state">
                <el-empty description="此分類暫無專案">
                    <el-button type="primary" @click="setFilter('all')">
                        查看全部專案
                    </el-button>
                </el-empty>
            </div>

            <!-- Projects Grid -->
            <div v-else class="projects-grid">
                <div v-for="project in filteredProjects"
                     :key="`${project.id}-${activeFilter}`"
                     class="project-item"
                     @click="openProjectDetail(project)">
                    <el-card shadow="hover" class="project-card">
                        <!-- Project Image -->
                        <div class="project-image">
                            <img :src="project.image || '/api/placeholder/400/250'"
                                 :alt="project.title"
                                 loading="lazy" />
                            <div class="project-overlay">
                                <div class="overlay-content">
                                    <el-button type="primary" circle>
                                        <el-icon><View /></el-icon>
                                    </el-button>

                                    <el-button v-if="project.github"
                                               circle
                                               @click.stop="openGithub(project.github)">
                                        <el-icon><Link /></el-icon>
                                    </el-button>

                                    <el-button v-if="project.demo"
                                               circle
                                               @click.stop="openDemo(project.demo)">
                                        <el-icon><Monitor /></el-icon>
                                    </el-button>
                                </div>
                            </div>
                        </div>

                        <!-- Project Content -->
                        <div class="project-content">
                            <div class="project-header">
                                <h3 class="project-title">{{ project.title }}</h3>
                                <el-tag :type="getCategoryType(project.category)" size="small">
                                    {{ getCategoryName(project.category) }}
                                </el-tag>
                            </div>

                            <p class="project-description">{{ project.description }}</p>

                            <div class="project-features" v-if="project.features && project.features.length > 0">
                                <h5>主要功能：</h5>
                                <ul>
                                    <li v-for="feature in project.features.slice(0, 3)" :key="feature">
                                        {{ feature }}
                                    </li>
                                </ul>
                            </div>

                            <div class="project-tech" v-if="project.technologies && project.technologies.length > 0">
                                <el-tag v-for="tech in project.technologies.slice(0, 4)"
                                        :key="tech"
                                        size="small"
                                        effect="plain"
                                        class="tech-tag">
                                    {{ tech }}
                                </el-tag>
                                <span v-if="project.technologies.length > 4" class="more-tech">
                                    +{{ project.technologies.length - 4 }}
                                </span>
                            </div>

                            <div class="project-footer">
                                <div class="project-status">
                                    <el-tag :type="getStatusType(project.status)"
                                            size="small"
                                            effect="dark">
                                        {{ getStatusText(project.status) }}
                                    </el-tag>
                                </div>

                                <div class="project-date">
                                    {{ formatDate(project.date) }}
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>

            <!-- 篩選結果統計 -->
            <div v-if="!loading" class="filter-summary">
                <p class="summary-text">
                    {{ activeFilter === 'all' ? '全部專案' : getCategoryName(activeFilter) }}：
                    共 <strong>{{ filteredProjects.length }}</strong> 個專案
                </p>
            </div>

            <!-- Statistics Section -->
            <section v-if="!loading && statistics.length > 0" class="portfolio-stats">
                <h2 class="section-title">專案統計</h2>

                <el-row :gutter="30" class="stats-grid">
                    <el-col :xs="12" :sm="6" v-for="stat in statistics" :key="stat.label">
                        <div class="stat-item">
                            <div class="stat-icon">
                                <el-icon :size="32" :color="stat.color">
                                    <component :is="stat.icon" />
                                </el-icon>
                            </div>
                            <div class="stat-content">
                                <div class="stat-number">{{ stat.value }}</div>
                                <div class="stat-label">{{ stat.label }}</div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </section>

            <!-- Contact CTA -->
            <section v-if="!loading" class="contact-cta">
                <div class="cta-content">
                    <h2>有專案想要合作嗎？</h2>
                    <p>我很樂意討論您的專案需求，並提供專業的技術解決方案</p>

                    <div class="cta-buttons">
                        <el-button type="primary" size="large" @click="openEmail">
                            <el-icon><Message /></el-icon>
                            聯繫討論
                        </el-button>

                        <el-button size="large" @click="navigateToAbout">
                            <el-icon><User /></el-icon>
                            了解更多
                        </el-button>
                    </div>
                </div>
            </section>
        </div>
    </div>

    <!-- Project Detail Modal -->
    <el-dialog v-model="showProjectDetail"
               :title="selectedProject?.title"
               width="80%"
               top="5vh"
               class="project-detail-dialog"
               @closed="closeProjectDetail">
        <div v-if="selectedProject" class="project-detail">
            <!-- Project Images Gallery -->
            <div class="project-gallery" v-if="selectedProject.gallery && selectedProject.gallery.length > 0">
                <el-carousel height="400px" indicator-position="outside">
                    <el-carousel-item v-for="(image, index) in selectedProject.gallery" :key="index">
                        <img :src="image" :alt="`${selectedProject.title} - 圖片 ${index + 1}`" />
                    </el-carousel-item>
                </el-carousel>
            </div>

            <!-- Project Details -->
            <div class="detail-content">
                <el-row :gutter="30">
                    <el-col :xs="24" :md="16">
                        <div class="project-info">
                            <h3>專案簡介</h3>
                            <p class="project-full-description">
                                {{ selectedProject.fullDescription || selectedProject.description }}
                            </p>

                            <h3 v-if="selectedProject.features && selectedProject.features.length > 0">主要功能</h3>
                            <ul class="feature-list" v-if="selectedProject.features && selectedProject.features.length > 0">
                                <li v-for="feature in selectedProject.features" :key="feature">
                                    <el-icon><Check /></el-icon>
                                    {{ feature }}
                                </li>
                            </ul>

                            <h3 v-if="selectedProject.challenges && selectedProject.challenges.length > 0">技術挑戰與解決方案</h3>
                            <div class="challenges" v-if="selectedProject.challenges && selectedProject.challenges.length > 0">
                                <div v-for="challenge in selectedProject.challenges"
                                     :key="challenge.title"
                                     class="challenge-item">
                                    <h4>{{ challenge.title }}</h4>
                                    <p>{{ challenge.solution }}</p>
                                </div>
                            </div>
                        </div>
                    </el-col>

                    <el-col :xs="24" :md="8">
                        <div class="project-meta">
                            <div class="meta-section">
                                <h4>專案資訊</h4>
                                <div class="meta-item">
                                    <label>分類：</label>
                                    <span>{{ getCategoryName(selectedProject.category) }}</span>
                                </div>
                                <div class="meta-item">
                                    <label>狀態：</label>
                                    <el-tag :type="getStatusType(selectedProject.status)">
                                        {{ getStatusText(selectedProject.status) }}
                                    </el-tag>
                                </div>
                                <div class="meta-item" v-if="selectedProject.duration">
                                    <label>開發時間：</label>
                                    <span>{{ selectedProject.duration }}</span>
                                </div>
                                <div class="meta-item" v-if="selectedProject.teamSize">
                                    <label>團隊規模：</label>
                                    <span>{{ selectedProject.teamSize }}</span>
                                </div>
                            </div>

                            <div class="meta-section" v-if="selectedProject.technologies && selectedProject.technologies.length > 0">
                                <h4>使用技術</h4>
                                <div class="tech-tags">
                                    <el-tag v-for="tech in selectedProject.technologies"
                                            :key="tech"
                                            class="tech-tag">
                                        {{ tech }}
                                    </el-tag>
                                </div>
                            </div>

                            <div class="meta-section" v-if="selectedProject.github || selectedProject.demo">
                                <h4>相關連結</h4>
                                <div class="project-links">
                                    <el-button v-if="selectedProject.github"
                                               type="primary"
                                               @click="openGithub(selectedProject.github)"
                                               class="link-button">
                                        <el-icon><Link /></el-icon>
                                        GitHub
                                    </el-button>

                                    <el-button v-if="selectedProject.demo"
                                               @click="openDemo(selectedProject.demo)"
                                               class="link-button">
                                        <el-icon><Monitor /></el-icon>
                                        線上展示
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeProjectDetail">關閉</el-button>
                <el-button v-if="selectedProject?.demo"
                           type="primary"
                           @click="openDemo(selectedProject.demo)">
                    查看展示
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script src="./PortfolioPage.js"></script>
<style type="text/scss" lang="scss">
    @use './PortfolioPage.scss';
</style>