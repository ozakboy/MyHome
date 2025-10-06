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
                             @select="handleSelect"
                             :ellipsis="screenWidth <= 1280 && screenWidth > 720">
                        <el-menu-item index="/" route="/">
                            <el-icon><Home01 /></el-icon>
                            <span>首頁</span>
                        </el-menu-item>

                        <el-menu-item index="/about" route="/about">
                            <el-icon><UserCircle /></el-icon>
                            <span>關於我</span>
                        </el-menu-item>

                        <el-menu-item index="/portfolio" route="/portfolio">
                            <el-icon><Folder01 /></el-icon>
                            <span>作品集</span>
                        </el-menu-item>

                        <!--<el-sub-menu index="/articles">
                            <template #title>
                                <el-icon><FileScript /></el-icon>
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
                        </el-sub-menu>-->
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
                    <span class="contact-label">聯絡方式:</span>
                    <div class="contact-icons">
                        <a href="mailto:awc0450056@gmail.com"
                           class="contact-icon"
                           title="Email: awc0450056@gmail.com"
                           target="_blank">
                            <el-icon :size="24"><MailSend01 /></el-icon>
                        </a>
                        <a href="https://telegram.me/minksaki64"
                           class="contact-icon"
                           title="Telegram: @minksaki64"
                           target="_blank">
                            <el-icon :size="24"><Telegram /></el-icon>
                        </a>
                        <a href="https://line.me/ti/p/llWJZ4iuiJ"
                           class="contact-icon"
                           title="Line"
                           target="_blank">
                            <el-icon :size="24"><Message01 /></el-icon>
                        </a>
                    </div>
                </div>
                <div class="copyright">
                    <p>&copy; 2025 全棧系統工程師 韓滷. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script src="./App.js"></script>
<style type="text/scss" lang="scss">
    @use './App.scss';
</style>