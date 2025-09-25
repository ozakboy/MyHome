<template>
  <div class="app-home">
    <div class="page-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              全棧系統工程師
              <span class="highlight">韓滷</span>
            </h1>
            <p class="hero-subtitle">
              專精於 C# .NET 後端開發、Vue.js 前端設計、微服務架構、高頻交易系統
            </p>
            <p class="hero-description">
              具備完整的全棧開發能力，從前端設計到後端API，從資料庫管理到伺服器部署，
              提供一站式的系統解決方案。
            </p>
            
            <div class="hero-actions">
              <el-button 
                type="primary" 
                size="large" 
                @click="navigateToPortfolio"
                class="action-button"
              >
                <el-icon><Folder /></el-icon>
                查看作品集
              </el-button>
              
              <el-button 
                size="large" 
                @click="navigateToAbout"
                class="action-button secondary"
              >
                <el-icon><User /></el-icon>
                了解更多
              </el-button>
            </div>
          </div>
          
          <div class="hero-image">
            <div class="avatar-container">
              <img 
                src="/images/profile/avatar.jpg" 
                alt="韓滷 - 全棧系統工程師"
                class="avatar-image"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="skills-section">
        <h2 class="section-title">核心技能</h2>
        
        <el-row :gutter="24" class="skills-grid">
          <el-col :xs="24" :sm="12" :md="8" v-for="skill in skills" :key="skill.id">
            <el-card class="skill-card" shadow="hover">
              <div class="skill-content">
                <div class="skill-icon">
                  <el-icon :size="40" :color="skill.color">
                    <component :is="skill.icon" />
                  </el-icon>
                </div>
                <h3 class="skill-title">{{ skill.title }}</h3>
                <p class="skill-description">{{ skill.description }}</p>
                
                <div class="skill-tags">
                  <el-tag 
                    v-for="tag in skill.tags" 
                    :key="tag"
                    size="small"
                    class="skill-tag"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>

      <!-- Recent Articles Section -->

      <!--<section class="articles-section">
        <div class="section-header">
          <h2 class="section-title">最新文章</h2>
          <el-button 
            type="text" 
            @click="navigateToArticles"
            class="view-all-button"
          >
            查看全部文章
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
        
        <el-row :gutter="24" class="articles-grid">
          <el-col :xs="24" :sm="12" :md="8" v-for="article in recentArticles" :key="article.id">
            <el-card class="article-card" shadow="hover" @click="navigateToArticle(article)">
              <div class="article-content">
                <div class="article-meta">
                  <el-tag :type="getCategoryType(article.category)" size="small">
                    {{ article.categoryName }}
                  </el-tag>
                  <span class="article-date">{{ formatDate(article.date) }}</span>
                </div>
                
                <h3 class="article-title">{{ article.title }}</h3>
                <p class="article-excerpt">{{ article.excerpt }}</p>
                
                <div class="article-footer">
                  <div class="article-tags">
                    <el-tag 
                      v-for="tag in article.tags.slice(0, 2)" 
                      :key="tag"
                      size="small"
                      effect="plain"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                  
                  <div class="read-more">
                    <el-icon><View /></el-icon>
                    閱讀更多
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </section>-->

      <!-- Contact Section -->
      <section class="contact-section">
        <h2 class="section-title">聯繫方式</h2>
        
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <el-icon size="24" color="#667eea"><Message /></el-icon>
              <div class="contact-details">
                <h3>電子信箱</h3>
                <p>awc0450056@gmail.com</p>
              </div>
            </div>
            
            <div class="contact-item">
              <el-icon size="24" color="#667eea"><ChatDotRound /></el-icon>
              <div class="contact-details">
                <h3>Telegram</h3>
                <a href="https://telegram.me/minksaki64">@minksaki64</a>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  </div>
</template>



<script src="./HomePage.js"></script>
<style type="text/scss" lang="scss">
    @use './HomePage.scss';
</style>