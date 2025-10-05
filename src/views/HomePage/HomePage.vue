<template>
    <div class="app-home">
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">全站式網頁設計解決方案</h1>
                    <p class="hero-subtitle">嚴謹網站開發流程、質感網頁設計、程式流暢體驗，一站到位</p>
                    <p class="hero-description">從網站洽詢、規劃、視覺設計、後台程式、網址、主機管理、SEO優化</p>
                    <div class="hero-actions">
                        <button class="btn btn-primary" @click="handleConsultClick">立即諮詢</button>
                        <button class="btn btn-outline" @click="handlePortfolioClick">查看作品</button>
                    </div>
                </div>
            </div>
            <div class="hero-background"></div>
        </section>

        <!-- Services Section -->
        <section class="services-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">專業服務項目</h2>
                    <p class="section-subtitle">提供完整的網站開發與數位行銷解決方案</p>
                </div>

                <div class="services-grid">
                    <div class="service-card" v-for="(service, index) in services" :key="index">
                        <div class="service-icon">
                            <Icon :icon="service.icon" />
                        </div>
                        <h3 class="service-title">{{ service.title }}</h3>
                        <p class="service-description">{{ service.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- After Service Section -->
        <section class="after-service-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">網站完成後的貼心服務</h2>
                    <p class="section-subtitle">持續為您的網站保駕護航</p>
                </div>

                <div class="after-services-grid">
                    <div class="after-service-card" v-for="(service, index) in afterServices" :key="index">
                        <div class="after-service-number">{{ index + 1 }}</div>
                        <h3 class="after-service-title">{{ service.title }}</h3>
                        <p class="after-service-description">{{ service.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Process Section -->
        <section class="process-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">嚴謹的開發流程</h2>
                    <p class="section-subtitle">每個環節都精心規劃，確保專案順利進行</p>
                </div>

                <div class="process-timeline">
                    <div class="process-item" v-for="(step, index) in processSteps" :key="index">
                        <div class="process-dot"></div>
                        <div class="process-content">
                            <h3 class="process-title">{{ step.title }}</h3>
                            <p class="process-description">{{ step.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2 class="cta-title">準備好打造您的專屬網站了嗎？</h2>
                    <p class="cta-description">立即聯繫我們，讓專業團隊為您量身打造完美解決方案</p>
                    <button class="btn btn-light" @click="handleConsultClick">免費諮詢</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script src="./HomePage.js"></script>

<style lang="scss" src="./HomePage.scss"></style>