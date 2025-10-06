import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

export default {
    name: 'HomePage',

    setup() {
        const router = useRouter()
        // 主要服務項目
        const services = ref([
            {
                icon: 'hugeicons:user-circle',
                title: '個人客製化網頁設計',
                description: '量身打造專屬於您的個人品牌網站，展現獨特風格與專業形象'
            },
            {
                icon: 'hugeicons:office-365',
                title: '企業形象網站設計',
                description: '提升企業專業形象，建立客戶信任，打造具有競爭力的線上門面'
            },
            {
                icon: 'hugeicons:message-01',
                title: 'LINE 官方帳號建置',
                description: '建立官方帳號，打造專屬的客戶溝通管道，提升品牌互動率'
            },
            {
                icon: 'hugeicons:bot',
                title: 'LINE 機器人建置',
                description: '智能客服機器人，24小時自動回覆，提升客戶服務效率'
            },
            {
                icon: 'hugeicons:telegram',
                title: 'Telegram 機器人建置',
                description: '建置 Telegram 自動化機器人，拓展國際市場的溝通渠道'
            },
            {
                icon: 'hugeicons:facebook-01',
                title: 'Facebook 粉專機器人',
                description: '自動化管理粉絲專頁，即時回應訊息，提升社群經營效率'
            },
            {
                icon: 'hugeicons:search-01',
                title: '網站 Google SEO 建置',
                description: '專業SEO優化服務，提升網站搜尋排名，增加自然流量'
            },
            {
                icon: 'hugeicons:mobile-programming-01',
                title: 'RWD 響應式設計',
                description: '完美適配所有裝置，確保在手機、平板、電腦都有最佳瀏覽體驗'
            },
            {
                icon: 'hugeicons:global',
                title: '網域申請',
                description: '協助申請專屬網域名稱，建立品牌識別度與專業形象'
            },
            {
                icon: 'hugeicons:api',
                title: 'API 串接技術支援',
                description: '整合第三方服務，串接金流、物流、CRM等各式系統'
            },
            {
                icon: 'hugeicons:server-stack-01',
                title: '主機轉移服務',
                description: '專業的主機搬遷服務，確保網站平穩遷移，不影響營運'
            },
            {
                icon: 'hugeicons:cloud',
                title: '主機雲端託管',
                description: '提供穩定可靠的雲端主機服務，確保網站高速運行'
            }
        ]);

        // 後續服務項目
        const afterServices = ref([
            {
                title: 'SEO 優化服務',
                description: '持續優化網站SEO，定期分析關鍵字排名，提升搜尋引擎能見度，為網站帶來更多自然流量'
            },
            {
                title: '系統維護與更新',
                description: '定期系統檢測、安全性更新、功能優化，確保網站穩定運行，提供最佳使用體驗'
            },
            {
                title: '後台影音教育訓練',
                description: '提供完整的後台操作教學影片，讓您輕鬆上手網站管理，隨時更新內容無需擔心'
            },
            {
                title: 'API 文件產出與管理',
                description: '提供完整的API技術文件，方便後續系統串接與擴充，確保系統持續成長'
            }
        ]);

        // 開發流程
        const processSteps = ref([
            {
                title: '網站需求洽詢',
                description: '深入了解您的需求與目標，提供專業建議與完整規劃'
            },
            {
                title: '網站規劃與報價',
                description: '制定詳細的專案計劃、功能規格與時程，提供透明合理的報價'
            },
            {
                title: '視覺設計與確認',
                description: '打造符合品牌形象的視覺設計，確保每個細節都完美呈現'
            },
            {
                title: '前後台程式開發',
                description: '採用最新技術開發，確保程式碼品質與系統效能'
            },
            {
                title: '網址與主機設定',
                description: '協助申請網域、設定主機環境，確保網站穩定上線'
            },
            {
                title: 'SEO 優化設定',
                description: '完整的SEO設定，讓網站在搜尋引擎中獲得更好的排名'
            },
            {
                title: '測試與上線',
                description: '嚴格測試各項功能，確保無誤後正式上線'
            },
            {
                title: '教育訓練與交接',
                description: '提供完整的操作教學，確保您能輕鬆管理網站'
            }
        ]);

        // 初始化滾動動畫
        const initScrollAnimation = () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -100px 0px'
                }
            );

            // 觀察所有需要動畫的元素
            const animatedElements = document.querySelectorAll(
                '.service-card, .after-service-card, .process-item'
            );

            animatedElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        };

        // 處理按鈕點擊
        const handleConsultClick = () => {
            console.log('諮詢按鈕被點擊');
            window.open("https://line.me/ti/p/llWJZ4iuiJ", "mozillaTab");
        };

        const handlePortfolioClick = () => {
            // 這裡可以添加導航到作品集頁面的邏輯
            console.log('作品集按鈕被點擊');
            router.push('/portfolio')
        };

        // 組件掛載後初始化動畫
        onMounted(() => {
            initScrollAnimation();
        });

        return {
            services,
            afterServices,
            processSteps,
            handleConsultClick,
            handlePortfolioClick
        };
    }
};