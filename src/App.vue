<template>
    <div class="app-main">
        <!-- Header Navigation -->
        <header class="app-header">
            <div class="header-container">
                <div class="header-left">
                    <h1 class="site-title">
                        <router-link to="/" class="title-link">
                            全棧系統工程師
                            <span class="subtitle">韓滷</span>
                        </router-link>
                    </h1>
                </div>

                <nav class="header-nav">
                    <el-menu :default-active="activeIndex"
                             mode="horizontal"
                             router
                             class="nav-menu"
                             @select="handleSelect">
                        <el-menu-item index="/" route="/">
                            <el-icon><House /></el-icon>
                            <span>首頁</span>
                        </el-menu-item>

                        <el-menu-item index="/about" route="/about">
                            <el-icon><User /></el-icon>
                            <span>關於我</span>
                        </el-menu-item>

                        <el-menu-item index="/portfolio" route="/portfolio">
                            <el-icon><Folder /></el-icon>
                            <span>作品集</span>
                        </el-menu-item>

                        <el-sub-menu index="/articles">
                            <template #title>
                                <el-icon><Document /></el-icon>
                                <span>專欄文章</span>
                            </template>

                            <el-menu-item index="/articles/tech" route="/articles/tech">
                                技術分享
                            </el-menu-item>
                            <el-menu-item index="/articles/experience" route="/articles/experience">
                                開發心得
                            </el-menu-item>
                            <el-menu-item index="/articles/tutorial" route="/articles/tutorial">
                                教學文章
                            </el-menu-item>
                            <el-menu-item index="/articles/news" route="/articles/news">
                                技術動態
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </nav>
            </div>
        </header>

        <!-- Main Content -->
        <main class="app-main-content">
            <router-view />
        </main>

        <!-- Footer -->
        <footer class="app-footer">
            <div class="footer-content">
                <div class="contact-info">
                    <p>
                        <el-icon><Message /></el-icon>
                        信箱: awc0450056@gmail.com
                    </p>
                    <p>
                        <el-icon><ChatDotRound /></el-icon>
                        Telegram: @your_telegram
                    </p>
                </div>
                <div class="copyright">
                    <p>&copy; 2024 全棧系統工程師 韓滷. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script src="./App.js"></script>
<style type="text/scss" lang="scss">
    @use './App.scss';
</style>