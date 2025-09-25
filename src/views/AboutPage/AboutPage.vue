<template>
    <div class="app-about">
        <div class="page-container">
            <!-- Hero Section -->
            <section class="about-hero">
                <div class="hero-content">
                    <div class="hero-image">
                        <img src="/images/profile/about-photo.jpg"
                             alt="韓滷 - 全棧系統工程師"
                             class="profile-image" />
                    </div>

                    <div class="hero-text">
                        <h1 class="hero-title">
                            你好，我是
                            <span class="highlight">韓滷</span>
                        </h1>
                        <h2 class="hero-subtitle">全棧系統工程師</h2>
                        <p class="hero-description">
                            具備紮實的軟體開發基礎，擅長專案開發規劃、流程設計、各種 Bot 開發、
                            網頁前後端開發、高頻交易系統、微服務架構等。主要開發語言為 C# .NET，
                            擁有豐富的系統架構設計與實作經驗。
                        </p>

                        <div class="contact-buttons">
                            <el-button type="primary" size="large" @click="openEmail">
                                <el-icon><Message /></el-icon>
                                聯繫我
                            </el-button>

                            <el-button size="large" @click="downloadResume">
                                <el-icon><Download /></el-icon>
                                下載簡歷
                            </el-button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Skills Overview -->
            <section class="skills-overview">
                <h2 class="section-title">專業技能</h2>

                <el-row :gutter="30" class="skills-categories">
                    <el-col :xs="24" :sm="12" :md="8" v-for="category in skillCategories" :key="category.id">
                        <div class="skill-category">
                            <div class="category-header">
                                <el-icon :size="32" :color="category.color">
                                    <component :is="category.icon" />
                                </el-icon>
                                <h3 class="category-title">{{ category.title }}</h3>
                            </div>

                            <div class="skills-list">
                                <div v-for="skill in category.skills"
                                     :key="skill.name"
                                     class="skill-item">
                                    <div class="skill-info">
                                        <span class="skill-name">{{ skill.name }}</span>
                                        <span class="skill-level">{{ skill.level }}%</span>
                                    </div>
                                    <el-progress :percentage="skill.level"
                                                 :color="category.color"
                                                 :show-text="false"
                                                 :stroke-width="6" />
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </section>

            <!-- Experience Timeline -->
            <section class="experience-timeline">
                <h2 class="section-title">工作經歷</h2>

                <el-timeline class="timeline">
                    <el-timeline-item v-for="(experience, index) in experiences"
                                      :key="index"
                                      :timestamp="experience.period"
                                      placement="top"
                                      :type="experience.type"
                                      size="large">
                        <el-card class="experience-card">
                            <div class="experience-header">
                                <h3 class="company-name">{{ experience.company }}</h3>
                                <h4 class="position">{{ experience.position }}</h4>
                            </div>

                            <p class="experience-description">{{ experience.description }}</p>

                            <div class="achievements">
                                <h5>主要成就：</h5>
                                <ul>
                                    <li v-for="achievement in experience.achievements" :key="achievement">
                                        {{ achievement }}
                                    </li>
                                </ul>
                            </div>

                            <div class="tech-stack">
                                <el-tag v-for="tech in experience.technologies"
                                        :key="tech"
                                        size="small"
                                        class="tech-tag">
                                    {{ tech }}
                                </el-tag>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </section>

            <!-- Certificates & Education -->
            <section class="certificates-education">
                <el-row :gutter="40">
                    <el-col :xs="24" :md="12">
                        <div class="certificates">
                            <h2 class="section-title">專業認證</h2>

                            <div class="cert-list">
                                <div v-for="cert in certificates"
                                     :key="cert.id"
                                     class="cert-item">
                                    <el-card shadow="hover" class="cert-card">
                                        <div class="cert-content">
                                            <div class="cert-icon">
                                                <el-icon :size="24" :color="cert.color">
                                                    <component :is="cert.icon" />
                                                </el-icon>
                                            </div>

                                            <div class="cert-info">
                                                <h4 class="cert-name">{{ cert.name }}</h4>
                                                <p class="cert-issuer">{{ cert.issuer }}</p>
                                                <p class="cert-date">{{ cert.date }}</p>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                        </div>
                    </el-col>

                    <el-col :xs="24" :md="12">
                        <div class="education">
                            <h2 class="section-title">教育背景</h2>

                            <div class="edu-list">
                                <div v-for="edu in education"
                                     :key="edu.id"
                                     class="edu-item">
                                    <el-card shadow="hover" class="edu-card">
                                        <div class="edu-content">
                                            <div class="edu-icon">
                                                <el-icon :size="24" color="#667eea">
                                                    <School />
                                                </el-icon>
                                            </div>

                                            <div class="edu-info">
                                                <h4 class="edu-degree">{{ edu.degree }}</h4>
                                                <p class="edu-school">{{ edu.school }}</p>
                                                <p class="edu-period">{{ edu.period }}</p>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </section>

            <!-- Personal Interests -->
            <section class="personal-interests">
                <h2 class="section-title">個人興趣</h2>

                <el-row :gutter="20" class="interests-grid">
                    <el-col :xs="12" :sm="8" :md="6" v-for="interest in interests" :key="interest.id">
                        <div class="interest-item">
                            <div class="interest-icon">
                                <el-icon :size="40" :color="interest.color">
                                    <component :is="interest.icon" />
                                </el-icon>
                            </div>
                            <h4 class="interest-name">{{ interest.name }}</h4>
                        </div>
                    </el-col>
                </el-row>
            </section>
        </div>
    </div>
</template>


<script src="./AboutPage.js"></script>
<style type="text/scss" lang="scss">
    @use './AboutPage.scss';
</style>