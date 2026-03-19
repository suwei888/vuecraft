<template>
  <div class="landing-page">
    <!-- Particle Background -->
    <Particles
      id="tsparticles"
      :options="particlesOptions"
      class="particles-bg"
    />

    <!-- Navigation -->
    <nav class="nav-bar" v-motion-fade-in>
      <div class="nav-content">
        <div class="logo" v-motion-slide-in-left>
          <el-icon class="logo-icon"><TrendCharts /></el-icon>
          <span class="logo-text">VueCraft</span>
        </div>
        <div class="nav-links">
          <a href="#features" class="nav-link">{{ t('landing.nav.features') }}</a>
          <a href="#security" class="nav-link">{{ t('landing.nav.security') }}</a>
          <a href="#wallet" class="nav-link">{{ t('landing.nav.wallet') }}</a>
          <a href="#pricing" class="nav-link">{{ t('landing.nav.pricing') }}</a>
        </div>
        <div class="nav-actions">
          <LanguageSwitcher />
          <el-button
            type="primary"
            class="login-btn"
            @click="showLoginModal = true"
            v-motion-slide-in-right
          >
            <el-icon><User /></el-icon>
            {{ t('common.login') }}
          </el-button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section" v-motion-fade-in>
      <div class="hero-content">
        <h1 class="hero-title" v-motion-slide-in-bottom>
          <span class="gradient-text">{{ t('landing.title') }}</span>
          <br />
          {{ t('landing.subtitle') }}
        </h1>
        <p class="hero-subtitle" v-motion-slide-in-bottom :delay="200">
          {{ t('landing.description') }}
        </p>
        <div class="hero-buttons" v-motion-slide-in-bottom :delay="400">
          <el-button type="primary" size="large" class="cta-btn" @click="showLoginModal = true">
            {{ t('common.getStarted') }}
            <el-icon class="btn-icon"><ArrowRight /></el-icon>
          </el-button>
          <el-button size="large" class="learn-more-btn">
            {{ t('common.learnMore') }}
          </el-button>
        </div>
      </div>

      <!-- Price Charts Preview -->
      <div class="charts-preview" v-motion-slide-in-right :delay="300">
        <GlassCard class="chart-card" v-for="(chart, index) in charts" :key="index">
          <div class="chart-header">
            <span class="crypto-name">{{ chart.name }}</span>
            <span :class="['price-change', chart.positive ? 'positive' : 'negative']">
              {{ chart.change }}
            </span>
          </div>
          <div class="chart-price">${{ chart.price }}</div>
          <div class="mini-chart" :style="{ background: chart.gradient }"></div>
        </GlassCard>
      </div>
    </section>

    <!-- Trust Indicators -->
    <section class="trust-section" v-motion-fade-in :delay="500">
      <div class="trust-stats">
        <div class="stat-item" v-for="(stat, index) in trustStats" :key="index" v-motion-scale-in :delay="index * 100">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section" v-motion-fade-in>
      <h2 class="section-title">{{ t('landing.features') }}</h2>
      <div class="features-grid">
        <GlassCard
          class="feature-card"
          v-for="(feature, index) in features"
          :key="index"
          v-motion-slide-in-bottom
          :delay="index * 100"
        >
          <el-icon class="feature-icon"><component :is="feature.icon" /></el-icon>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </GlassCard>
      </div>
    </section>

    <!-- Security Section -->
    <section id="security" class="security-section" v-motion-fade-in>
      <h2 class="section-title">{{ t('landing.security') }}</h2>
      <div class="security-grid">
        <GlassCard
          class="security-card"
          v-for="(item, index) in securityFeatures"
          :key="index"
          v-motion-scale-in
          :delay="index * 150"
        >
          <div class="security-icon-wrapper">
            <el-icon class="security-icon"><component :is="item.icon" /></el-icon>
          </div>
          <h3 class="security-title">{{ item.title }}</h3>
          <p class="security-desc">{{ item.desc }}</p>
        </GlassCard>
      </div>
    </section>

    <!-- Wallet Integration Section -->
    <section id="wallet" class="wallet-section" v-motion-fade-in>
      <h2 class="section-title">{{ t('landing.walletIntegration') }}</h2>
      <div class="wallet-showcase">
        <GlassCard class="wallet-card" v-motion-slide-in-left>
          <h3 class="wallet-card-title">{{ t('landing.supportedWallets') }}</h3>
          <div class="wallet-logos">
            <div class="wallet-logo" v-for="(wallet, index) in wallets" :key="index">
              <div class="wallet-icon">{{ wallet.icon }}</div>
              <span class="wallet-name">{{ wallet.name }}</span>
            </div>
          </div>
        </GlassCard>
        <GlassCard class="wallet-features-card" v-motion-slide-in-right>
          <h3 class="wallet-card-title">{{ t('landing.walletFeatures') }}</h3>
          <ul class="wallet-features-list">
            <li v-for="(feature, index) in walletFeatures" :key="index">
              <el-icon><Check /></el-icon>
              {{ feature }}
            </li>
          </ul>
        </GlassCard>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer" v-motion-fade-in>
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <el-icon class="logo-icon"><TrendCharts /></el-icon>
            <span class="logo-text">VueCraft</span>
          </div>
          <p class="footer-desc">{{ t('landing.description') }}</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>{{ t('landing.footer.product') }}</h4>
            <a href="#">{{ t('landing.nav.features') }}</a>
            <a href="#">{{ t('landing.nav.pricing') }}</a>
            <a href="#">{{ t('landing.nav.security') }}</a>
          </div>
          <div class="footer-col">
            <h4>{{ t('landing.footer.company') }}</h4>
            <a href="#">{{ t('landing.footer.about') }}</a>
            <a href="#">{{ t('landing.footer.careers') }}</a>
            <a href="#">{{ t('landing.footer.contact') }}</a>
          </div>
          <div class="footer-col">
            <h4>{{ t('landing.footer.legal') }}</h4>
            <a href="#">{{ t('landing.footer.privacy') }}</a>
            <a href="#">{{ t('landing.footer.terms') }}</a>
            <a href="#">{{ t('landing.footer.policy') }}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>{{ t('landing.footer.copyright') }}</p>
      </div>
    </footer>

    <!-- Login Modal -->
    <LoginModal v-model="showLoginModal" @login="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import GlassCard from '@/components/landing/GlassCard.vue'
import LoginModal from '@/components/landing/LoginModal.vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'

const { t } = useI18n()
const router = useRouter()
const showLoginModal = ref(false)

// Particles configuration

const particlesOptions = {
  background: {
    color: {
      value: 'transparent'
    }
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: ['#2563EB', '#3B82F6', '#F97316', '#8B5CF6']
    },
    links: {
      color: '#3B82F6',
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'bounce'
      }
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.3,
      random: true
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 3 },
      random: true
    }
  },
  detectRetina: true
}

// Chart data
const charts = ref([
  { name: 'BTC', price: '67,432.50', change: '+2.45%', positive: true, gradient: 'linear-gradient(90deg, #22c55e 0%, transparent 100%)' },
  { name: 'ETH', price: '3,521.80', change: '+1.82%', positive: true, gradient: 'linear-gradient(90deg, #22c55e 0%, transparent 100%)' },
  { name: 'SOL', price: '142.35', change: '-0.94%', positive: false, gradient: 'linear-gradient(90deg, #ef4444 0%, transparent 100%)' }
])

// Trust stats
const trustStats = [
  { value: '$10B+', label: t('landing.trust.tradingVolume') },
  { value: '2M+', label: t('landing.trust.activeUsers') },
  { value: '99.9%', label: t('landing.trust.uptime') },
  { value: '150+', label: t('landing.trust.countries') }
]

// Features
const features = [
  { icon: 'TrendCharts', title: t('features.realtimeCharts.title'), desc: t('features.realtimeCharts.desc') },
  { icon: 'Lightning', title: t('features.instantTrading.title'), desc: t('features.instantTrading.desc') },
  { icon: 'Shield', title: t('features.assetProtection.title'), desc: t('features.assetProtection.desc') },
  { icon: 'DataAnalysis', title: t('features.marketAnalysis.title'), desc: t('features.marketAnalysis.desc') },
  { icon: 'Wallet', title: t('features.multiWallet.title'), desc: t('features.multiWallet.desc') },
  { icon: 'Notification', title: t('features.smartAlerts.title'), desc: t('features.smartAlerts.desc') }
]

// Security features
const securityFeatures = [
  { icon: 'Lock', title: t('security.twoFactor.title'), desc: t('security.twoFactor.desc') },
  { icon: 'Key', title: t('security.encryption.title'), desc: t('security.encryption.desc') },
  { icon: 'View', title: t('security.biometric.title'), desc: t('security.biometric.desc') },
  { icon: 'Warning', title: t('security.antiPhishing.title'), desc: t('security.antiPhishing.desc') },
  { icon: 'Timer', title: t('security.sessionMonitor.title'), desc: t('security.sessionMonitor.desc') },
  { icon: 'CircleCheck', title: t('security.auditTrail.title'), desc: t('security.auditTrail.desc') }
]

// Wallets
const wallets = [
  { name: 'MetaMask', icon: '🦊' },
  { name: 'WalletConnect', icon: '🔗' },
  { name: 'Coinbase', icon: '💠' },
  { name: 'Trust', icon: '🛡️' },
  { name: 'Ledger', icon: '🔐' },
  { name: 'Trezor', icon: '📦' }
]

// Wallet features
const walletFeatures = [
  t('wallet.oneClick'),
  t('wallet.multiChain'),
  t('wallet.instantDeposits'),
  t('wallet.portfolioTracking'),
  t('wallet.crossDevice'),
  t('wallet.secureStorage')
]

const handleLogin = () => {
  showLoginModal.value = false
  router.push('/')
}
</script>

<style lang="scss" scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
  position: relative;
  overflow-x: hidden;
}

.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

// Navigation
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .nav-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .logo-icon {
      font-size: 2rem;
      color: #2563eb;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(90deg, #2563eb, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .nav-links {
    display: flex;
    gap: 2rem;

    .nav-link {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;

      &:hover {
        color: #3b82f6;
      }
    }
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .login-btn {
    background: linear-gradient(135deg, #2563eb, #8b5cf6);
    border: none;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    border-radius: 8px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
    }
  }
}

// Hero Section
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 4rem 4rem;
  position: relative;
  z-index: 1;

  .hero-content {
    max-width: 600px;

    .hero-title {
      font-size: 4rem;
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: white;

      .gradient-text {
        background: linear-gradient(90deg, #2563eb, #f97316, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% auto;
        animation: gradient-shift 3s ease infinite;
      }
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;

      .cta-btn {
        background: linear-gradient(135deg, #f97316, #2563eb);
        border: none;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 12px;

        .btn-icon {
          margin-left: 0.5rem;
          transition: transform 0.3s;
        }

        &:hover .btn-icon {
          transform: translateX(5px);
        }
      }

      .learn-more-btn {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        border-radius: 12px;

        &:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  .charts-preview {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .chart-card {
      min-width: 280px;

      .chart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        padding: 10px;
        .crypto-name {
          font-weight: 700;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .price-change {
          font-weight: 600;
          font-size: 0.9rem;

          &.positive {
            color: #4ade80;
          }

          &.negative {
            color: #f87171;
          }
        }
      }

      .chart-price {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: white;
        padding: 0 10px;
      }

      .mini-chart {
        height: 40px;
        border-radius: 4px;
        opacity: 0.6;
      }
    }
  }
}

// Trust Section
.trust-section {
  padding: 4rem 2rem;
  position: relative;
  z-index: 1;

  .trust-stats {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    .stat-item {
      text-align: center;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);

      .stat-value {
        font-size: 2.5rem;
        font-weight: 900;
        background: linear-gradient(90deg, #2563eb, #f97316);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .stat-label {
        color: rgba(255, 255, 255, 0.6);
        margin-top: 0.5rem;
        font-size: 1rem;
      }
    }
  }
}

// Section Title
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #2563eb, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

// Features Section
.features-section {
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;

  .features-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .feature-card {
    text-align: center;
    padding: 2rem;

    .feature-icon {
      font-size: 3rem;
      color: #2563eb;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .feature-desc {
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.6;
    }
  }
}

// Security Section
.security-section {
  padding: 6rem 2rem;
  background: rgba(37, 99, 235, 0.05);
  position: relative;
  z-index: 1;

  .security-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .security-card {
    text-align: center;
    padding: 2rem;

    .security-icon-wrapper {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      .security-icon {
        font-size: 2.5rem;
        color: white;
      }
    }

    .security-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .security-desc {
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.6;
    }
  }
}

// Wallet Section
.wallet-section {
  padding: 6rem 2rem;
  position: relative;
  z-index: 1;

  .wallet-showcase {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .wallet-card {
    padding: 2rem;

    .wallet-card-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .wallet-logos {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;

      .wallet-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }

        .wallet-icon {
          font-size: 2rem;
        }

        .wallet-name {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }

  .wallet-features-card {
    padding: 2rem;

    .wallet-card-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .wallet-features-list {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        font-size: 1rem;

        .el-icon {
          color: #22c55e;
          font-size: 1.25rem;
        }
      }
    }
  }
}

// Footer
.footer {
  background: rgba(0, 0, 0, 0.5);
  padding: 4rem 2rem 2rem;
  position: relative;
  z-index: 1;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-bottom: 3rem;
  }

  .footer-brand {
    .logo {
      margin-bottom: 1rem;
    }

    .footer-desc {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    .footer-col {
      h4 {
        font-weight: 700;
        margin-bottom: 1rem;
        color: white;
      }

      a {
        display: block;
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        padding: 0.5rem 0;
        transition: color 0.3s;

        &:hover {
          color: #3b82f6;
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
  }
}

// Animations
@keyframes gradient-shift {
  0% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0% center;
  }
}

// Responsive
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    padding: 8rem 2rem 4rem;
    text-align: center;

    .hero-content {
      .hero-title {
        font-size: 3rem;
      }

      .hero-buttons {
        justify-content: center;
      }
    }

    .charts-preview {
      margin-top: 3rem;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  .features-grid,
  .security-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  .wallet-showcase {
    grid-template-columns: 1fr !important;
  }

  .trust-stats {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .nav-bar {
    .nav-links {
      display: none;
    }
  }

  .hero-section {
    .hero-content {
      .hero-title {
        font-size: 2rem;
      }
    }
  }

  .features-grid,
  .security-grid {
    grid-template-columns: 1fr !important;
  }

  .trust-stats {
    grid-template-columns: 1fr !important;
  }

  .footer-content {
    grid-template-columns: 1fr !important;
  }

  .footer-links {
    grid-template-columns: 1fr !important;
  }
}
</style>
