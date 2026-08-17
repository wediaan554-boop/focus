// FOCUS (فوكس) Core Application Logic - Real Buraidah Cafes (MD, Adham, Jomo, 80 Nov 28)

const SukoonApp = {
  state: {
    activeTab: 'explore',
    activeCategory: 'all',
    searchQuery: '',
    filters: {
      noiseLevel: 'all',
      availability: 'all',
      amenity: 'all',
      type: 'all'
    },
    selectedRegionId: localStorage.getItem('focus_region') || 'qassim',
    selectedCityId: localStorage.getItem('focus_city') || 'buraidah',
    selectedCityName: localStorage.getItem('focus_city_name') || 'بريدة',
    selectedRegionName: localStorage.getItem('focus_region_name') || 'القصيم',

    currentVenueId: null,
    savedVenueIds: JSON.parse(localStorage.getItem('focus_saved') || '["v-bur-md", "v-bur-jomo", "v-bur-1"]'),
    darkMode: localStorage.getItem('focus_dark') === 'true',
    lang: localStorage.getItem('focus_lang') || 'ar'
  },

  init() {
    if (this.state.darkMode) {
      document.documentElement.classList.add('dark');
      const darkIcon = document.getElementById('dark-mode-icon');
      if (darkIcon) darkIcon.textContent = 'light_mode';
    }

    this.applyLanguage();
    this.updateLocationHeaderLabel();
    this.updateSavedBadge();
    this.initFirebaseIntegration();
    this.switchTab('explore');
  },

  toggleLanguage() {
    this.state.lang = this.state.lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('focus_lang', this.state.lang);
    this.applyLanguage();
  },

  applyLanguage() {
    const isEn = this.state.lang === 'en';
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';
    document.documentElement.lang = isEn ? 'en' : 'ar';

    const langBtnText = document.getElementById('lang-toggle-text');
    if (langBtnText) langBtnText.textContent = isEn ? 'العربية' : 'English';

    const tagline = document.getElementById('header-tagline');
    if (tagline) tagline.textContent = isEn ? 'FOCUS is your guide to quiet places 🍃' : 'فوكس هو خريطتك لأهدى الأماكن 🍃';

    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.placeholder = isEn ? 'Search for cafe, library, neighborhood...' : 'ابحث عن مقهى، مكتبة، حي، مخرج كهرباء...';

    const navExplore = document.getElementById('nav-label-explore');
    if (navExplore) navExplore.textContent = isEn ? 'Explore' : 'استكشاف';

    const navSearch = document.getElementById('nav-label-search');
    if (navSearch) navSearch.textContent = isEn ? 'Filter' : 'التصفية';

    const navSaved = document.getElementById('nav-label-saved');
    if (navSaved) navSaved.textContent = isEn ? 'Saved' : 'المحفوظات';

    const navProfile = document.getElementById('nav-label-profile');
    if (navProfile) navProfile.textContent = isEn ? 'Profile' : 'حسابي';

    this.updateLocationHeaderLabel();
    if (this.state.activeTab) this.switchTab(this.state.activeTab);
  },

  getVenueName(v) {
    if (!v) return '';
    return (this.state.lang === 'en' && v.nameEn) ? v.nameEn : v.name;
  },

  async initFirebaseIntegration() {
    if (window.FocusFirebase) {
      const isConnected = await window.FocusFirebase.init();
      this.updateFirebaseStatusUI(isConnected);

      if (isConnected) {
        window.FocusFirebase.subscribeVenues((remoteVenues) => {
          this.mergeRemoteVenues(remoteVenues);
        });
      }
    }
  },

  updateFirebaseStatusUI(isConnected) {
    const label = document.getElementById('firebase-status-label');
    const indicator = document.getElementById('firebase-status-indicator');
    
    if (isConnected) {
      if (label) label.textContent = 'focus-e933d (متصل 🔥)';
      if (indicator) {
        indicator.className = 'w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]';
        indicator.title = 'Firebase متصل بنجاح 🟢';
      }
    } else {
      if (label) label.textContent = 'focus-e933d';
      if (indicator) {
        indicator.className = 'w-2 h-2 rounded-full bg-amber-400 animate-pulse';
        indicator.title = 'في انتظار إدخال مفاتيح API Key';
      }
    }
  },

  mergeRemoteVenues(remoteVenues) {
    if (!remoteVenues || !remoteVenues.length) return;
    
    remoteVenues.forEach(rv => {
      const idx = SUKOON_DATA.venues.findIndex(v => v.id === rv.id);
      if (idx > -1) {
        SUKOON_DATA.venues[idx] = { ...SUKOON_DATA.venues[idx], ...rv };
      } else {
        SUKOON_DATA.venues.push(rv);
      }
    });

    if (this.state.activeTab === 'explore') {
      this.renderExploreView();
    }
  },

  openFirebaseSettingsModal() {
    const modal = document.getElementById('modal-container');
    modal.classList.remove('hidden');

    const savedApiKey = localStorage.getItem('focus_firebase_api_key') || '';
    const savedSenderId = localStorage.getItem('focus_firebase_sender_id') || '';
    const savedAppId = localStorage.getItem('focus_firebase_app_id') || '';
    const isConnected = window.FocusFirebase && window.FocusFirebase.isInitialized;

    modal.innerHTML = `
      <div class="bg-surface dark:bg-[#0f1912] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative page-fade-in border border-emerald-500/20">
        
        <div class="sticky top-0 z-30 bg-surface/90 dark:bg-[#0f1912]/90 backdrop-blur-md px-6 py-4 border-b border-surface-variant/40 dark:border-outline-variant/20 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="text-xl">🔥</span>
            <div>
              <h2 class="font-bold text-sm text-primary dark:text-emerald-400">إعدادات Firebase (focus-e933d)</h2>
              <p class="text-[11px] text-outline font-bold">ربط قاعدة البيانات Firestore والتوثيق</p>
            </div>
          </div>
          <button onclick="SukoonApp.closeModal()" aria-label="إغلاق" class="w-9 h-9 rounded-full bg-surface-container dark:bg-surface-container-high flex items-center justify-center text-primary dark:text-white">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 p-6 flex flex-col gap-5 text-xs">
          
          <div class="p-4 rounded-2xl ${isConnected ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300' : 'bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300'} flex items-center gap-3">
            <span class="material-symbols-outlined text-2xl">${isConnected ? 'verified' : 'info'}</span>
            <div>
              <div class="font-bold text-sm">${isConnected ? 'متصل بنجاح مع focus-e933d 🔥' : 'وضع البيانات المحلية (Offline Preview)'}</div>
              <div class="text-[11px] opacity-90">${isConnected ? 'تم ربط Firestore و Auth بنجاح وتعمل المزامنة الحية.' : 'أدخل مفتاح Web API Key الخاص بك من كونسول Firebase لتفعيل المزامنة الحية.'}</div>
            </div>
          </div>

          <form onsubmit="SukoonApp.saveFirebaseSettings(event)" class="flex flex-col gap-4">
            <div>
              <label class="block font-bold text-on-surface dark:text-emerald-300 mb-1">معرف المشروع (Project ID)</label>
              <input type="text" value="focus-e933d" disabled class="w-full bg-surface-container dark:bg-[#142017] border border-outline-variant/30 rounded-xl p-3 text-xs font-mono text-outline cursor-not-allowed" />
            </div>

            <div>
              <label class="block font-bold text-on-surface dark:text-emerald-300 mb-1">Web API Key <span class="text-error">*</span></label>
              <input id="fb-input-apikey" type="text" required placeholder="AIzaSy..." value="${savedApiKey}" class="w-full bg-surface-container-lowest dark:bg-[#1a291e] border border-emerald-500/30 rounded-xl p-3 text-xs font-mono text-on-surface dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-on-surface dark:text-emerald-300 mb-1">Messaging Sender ID (اختياري)</label>
                <input id="fb-input-senderid" type="text" placeholder="123456789..." value="${savedSenderId}" class="w-full bg-surface-container-lowest dark:bg-[#1a291e] border border-outline-variant/30 rounded-xl p-3 text-xs font-mono text-on-surface dark:text-white" />
              </div>
              <div>
                <label class="block font-bold text-on-surface dark:text-emerald-300 mb-1">App ID (اختياري)</label>
                <input id="fb-input-appid" type="text" placeholder="1:12345:web:abc..." value="${savedAppId}" class="w-full bg-surface-container-lowest dark:bg-[#1a291e] border border-outline-variant/30 rounded-xl p-3 text-xs font-mono text-on-surface dark:text-white" />
              </div>
            </div>

            <button type="submit" class="w-full bg-primary hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2">
              <span class="material-symbols-outlined text-base">cloud_sync</span>
              <span>حفظ الاتصال واختبار Firebase</span>
            </button>
          </form>

        </div>
      </div>
    `;
  },

  async saveFirebaseSettings(event) {
    if (event) event.preventDefault();
    const apiKey = document.getElementById('fb-input-apikey')?.value;
    const senderId = document.getElementById('fb-input-senderid')?.value;
    const appId = document.getElementById('fb-input-appid')?.value;

    if (!apiKey) {
      this.showToast('يرجى إدخال Web API Key الخاص بـ Firebase', 'warning');
      return;
    }

    if (window.FocusFirebase) {
      const isConnected = await window.FocusFirebase.saveConfig(apiKey, senderId, appId);
      this.updateFirebaseStatusUI(isConnected);

      if (isConnected) {
        this.showToast('تم الربط والاتصال بنجاح بـ Firebase focus-e933d 🔥', 'check_circle');
        this.closeModal();
      } else {
        this.showToast('تعذر الاتصال بالمفاتيح المدخلة، تأكد من صحة المفتاح.', 'error');
      }
    }
  },

  openNoiseReportModal(venueId) {
    const venue = SUKOON_DATA.venues.find(v => v.id === venueId);
    if (!venue) return;

    const modal = document.getElementById('modal-container');
    modal.classList.remove('hidden');

    modal.innerHTML = `
      <div class="bg-surface dark:bg-[#0f1912] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden p-6 flex flex-col gap-5 page-fade-in border border-emerald-500/20">
        <div class="flex justify-between items-center border-b border-surface-variant/40 dark:border-outline-variant/20 pb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary dark:text-emerald-400">equalizer</span>
            <h3 class="font-bold text-sm text-primary dark:text-emerald-400">تحديث مستوى الهدوء المباشر</h3>
          </div>
          <button onclick="SukoonApp.closeModal()" class="w-8 h-8 rounded-full bg-surface-container dark:bg-surface-container-high flex items-center justify-center">
            <span class="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        <div>
          <div class="font-bold text-base text-on-surface dark:text-white mb-1">${venue.name}</div>
          <p class="text-xs text-outline font-bold">شاركي الزوار حالة الهدوء والازدحام حالياً في المكان 🍃</p>
        </div>

        <div class="flex flex-col gap-2.5">
          <button onclick="SukoonApp.submitLiveNoiseReport('${venue.id}', 'hush', 'هدوء تام 🟢')" class="w-full p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-between hover:bg-emerald-500/20 transition-all">
            <span class="flex items-center gap-2"><span>🤫</span> <span>هدوء ممتايز ومناسب جداً للتركيز والدراسة</span></span>
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          
          <button onclick="SukoonApp.submitLiveNoiseReport('${venue.id}', 'chill', 'هدوء متوسط 🟡')" class="w-full p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center justify-between hover:bg-amber-500/20 transition-all">
            <span class="flex items-center gap-2"><span>☕</span> <span>صوت معتدل / أصوات مقهى طبيعية</span></span>
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          <button onclick="SukoonApp.submitLiveNoiseReport('${venue.id}', 'lively', 'مكتظ / حيوية عالية 🔴')" class="w-full p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 font-bold text-xs flex items-center justify-between hover:bg-rose-500/20 transition-all">
            <span class="flex items-center gap-2"><span>🔥</span> <span>زحمة وأصوات عالية</span></span>
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
        </div>
      </div>
    `;
  },

  async submitLiveNoiseReport(venueId, noiseLevel, noiseLabel) {
    const venue = SUKOON_DATA.venues.find(v => v.id === venueId);
    if (venue) {
      venue.noiseLevel = noiseLevel;
      venue.noiseLabel = noiseLabel;
    }

    if (window.FocusFirebase) {
      await window.FocusFirebase.submitNoiseReport(venueId, {
        noiseLevel: noiseLevel,
        noiseLabel: noiseLabel
      });
    }

    this.showToast('تم إرسال التحديث الحسابي والتأثير فوراً في خريطة FOCUS!', 'verified');
    this.closeModal();
    if (this.state.activeTab === 'explore') this.renderExploreView();
  },

  isVenueOpen(v) {
    if (!v || !v.openingHours) return true;
    const h = v.openingHours;
    if (h.includes("24 ساعة") || h.includes("24h") || h.includes("طوال اليوم")) return true;

    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const parseTimeStr = (str, isPM) => {
      let [hrs, mins] = str.split(':').map(Number);
      if (isNaN(mins)) mins = 0;
      if (isPM && hrs < 12) hrs += 12;
      if (!isPM && hrs === 12) hrs = 0;
      return hrs * 60 + mins;
    };

    const match = h.match(/(\d{1,2}(?::\d{2})?)\s*(ص|م)\s*-\s*(\d{1,2}(?::\d{2})?)\s*(ص|م)/);
    if (match) {
      const openMins = parseTimeStr(match[1], match[2] === 'م');
      let closeMins = parseTimeStr(match[3], match[4] === 'م');

      if (closeMins <= openMins) {
        return currentMins >= openMins || currentMins < closeMins;
      } else {
        return currentMins >= openMins && currentMins < closeMins;
      }
    }

    return v.isOpenNow !== false;
  },

  updateLocationHeaderLabel() {
    const label = document.getElementById('current-location-label');
    if (label) {
      label.textContent = `${this.state.selectedRegionName}، ${this.state.selectedCityName}`;
    }
  },

  openLocationModal() {
    const modal = document.getElementById('modal-container');
    modal.classList.remove('hidden');

    modal.innerHTML = `
      <div class="bg-surface dark:bg-[#0f1912] w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative page-fade-in border border-emerald-500/20">
        
        <div class="sticky top-0 z-30 bg-surface/90 dark:bg-[#0f1912]/90 backdrop-blur-md px-6 py-4 border-b border-surface-variant/40 dark:border-outline-variant/20 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-xl">location_on</span>
            <h2 class="font-bold text-base text-primary dark:text-emerald-400">حدد مدينتك لتصفح خريطة FOCUS</h2>
          </div>
          <button onclick="SukoonApp.closeModal()" aria-label="إغلاق" class="w-9 h-9 rounded-full bg-surface-container dark:bg-surface-container-high flex items-center justify-center text-primary dark:text-white">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 p-6 flex flex-col gap-6">
          
          <button 
            onclick="SukoonApp.selectCity('buraidah', 'بريدة', 'qassim', 'منطقة القصيم', true)"
            class="w-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 py-3.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
          >
            <span class="material-symbols-outlined text-lg">my_location</span>
            <span>تحديد موقعي التلقائي (GPS - بريدة، القصيم)</span>
          </button>

          <div class="text-xs text-outline font-bold">أو اختر المنطقة والمدينة يدوياً:</div>

          <div class="flex flex-col gap-4">
            ${SUKOON_DATA.regions.map(r => `
              <div class="bg-surface-container-lowest dark:bg-[#142017] rounded-2xl p-4 border border-emerald-500/10 shadow-sm">
                <h3 class="font-bold text-sm text-primary dark:text-emerald-400 mb-3 flex items-center gap-2">
                  <span>${r.name}</span>
                </h3>
                <div class="grid grid-cols-2 gap-2">
                  ${r.cities.map(c => `
                    <button 
                      onclick="SukoonApp.selectCity('${c.id}', '${c.name}', '${r.id}', '${r.name}')"
                      class="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-right transition-all flex items-center justify-between border ${
                        this.state.selectedCityId === c.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-surface-container-low dark:bg-surface-container-high text-on-surface dark:text-white border-transparent hover:border-primary/40'
                      }"
                    >
                      <span>${c.name}</span>
                      ${this.state.selectedCityId === c.id ? '<span class="material-symbols-outlined text-sm">check</span>' : ''}
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

        </div>

      </div>
    `;
  },

  selectCity(cityId, cityName, regionId, regionName, isGps = false) {
    this.state.selectedCityId = cityId;
    this.state.selectedCityName = cityName;
    this.state.selectedRegionId = regionId;
    this.state.selectedRegionName = regionName.replace(/[^\u0600-\u06FF\s]/g, '').trim();

    localStorage.setItem('focus_city', cityId);
    localStorage.setItem('focus_city_name', cityName);
    localStorage.setItem('focus_region', regionId);
    localStorage.setItem('focus_region_name', this.state.selectedRegionName);

    this.updateLocationHeaderLabel();
    this.closeModal();

    if (isGps) {
      this.showToast('تم تحديد الموقع الجغرافي تلقائياً (بريدة، القصيم)', 'my_location');
    } else {
      this.showToast(`FOCUS يعرض الأماكن المتاحة في (${cityName})`, 'location_on');
    }

    this.switchTab(this.state.activeTab);
  },

  toggleDarkMode() {
    this.state.darkMode = !this.state.darkMode;
    localStorage.setItem('focus_dark', this.state.darkMode);
    document.documentElement.classList.toggle('dark', this.state.darkMode);
    
    const darkIcon = document.getElementById('dark-mode-icon');
    if (darkIcon) {
      darkIcon.textContent = this.state.darkMode ? 'light_mode' : 'dark_mode';
    }
    this.showToast(this.state.darkMode ? 'تم تفعيل الوضع الداكن' : 'تم تفعيل الوضع الفاتح');
  },

  showToast(message, icon = 'check_circle') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'bg-primary text-on-primary px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-label-md pointer-events-auto page-fade-in border border-primary-container';
    toast.innerHTML = `
      <span class="material-symbols-outlined text-emerald-300 text-lg">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  switchTab(tabName) {
    this.state.activeTab = tabName;
    
    ['explore', 'search', 'saved', 'profile'].forEach(t => {
      const btn = document.getElementById(`nav-tab-${t}`);
      if (btn) {
        if (t === tabName) {
          btn.className = 'flex flex-col items-center justify-center px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold scale-95 transition-all';
        } else {
          btn.className = 'flex flex-col items-center justify-center px-4 py-1.5 rounded-full text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-emerald-400 transition-all';
        }
      }
    });

    const mainView = document.getElementById('app-view');
    mainView.className = 'w-full max-w-5xl mx-auto px-container-margin py-stack-md min-h-[calc(100vh-160px)] page-fade-in';

    switch (tabName) {
      case 'explore':
        this.renderExploreView();
        break;
      case 'search':
        this.renderSearchView();
        break;
      case 'saved':
        this.renderSavedView();
        break;
      case 'profile':
        this.renderProfileView();
        break;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  filterCategory(catId) {
    this.state.activeCategory = catId;
    this.renderExploreView();
  },

  onSearchFocus() {
    if (this.state.activeTab !== 'search') {
      this.switchTab('search');
    }
  },

  handleSearchInput(val) {
    this.state.searchQuery = val.trim().toLowerCase();
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      clearBtn.classList.toggle('hidden', !val);
    }
    if (this.state.activeTab === 'search') {
      this.renderSearchView();
    } else if (this.state.activeTab === 'explore') {
      this.renderExploreView();
    }
  },

  clearSearch() {
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
    this.handleSearchInput('');
  },

  toggleBookmark(venueId, event) {
    if (event) event.stopPropagation();

    const idx = this.state.savedVenueIds.indexOf(venueId);
    if (idx > -1) {
      this.state.savedVenueIds.splice(idx, 1);
      this.showToast('تم إزالة المكان من المحفوظات', 'bookmark_remove');
    } else {
      this.state.savedVenueIds.push(venueId);
      this.showToast('تم حفظ المكان في مفضلة FOCUS', 'bookmark_added');
    }

    localStorage.setItem('focus_saved', JSON.stringify(this.state.savedVenueIds));
    this.updateSavedBadge();

    if (window.FocusFirebase && window.FocusFirebase.syncUserSavedVenues) {
      window.FocusFirebase.syncUserSavedVenues(this.state.savedVenueIds);
    }

    if (this.state.activeTab === 'saved') {
      this.renderSavedView();
    } else if (this.state.activeTab === 'explore') {
      this.renderExploreView();
    }
  },

  updateSavedBadge() {
    const badge = document.getElementById('saved-badge-count');
    if (badge) {
      const count = this.state.savedVenueIds.length;
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    }
  },

  getFilteredVenues() {
    const cityMatches = SUKOON_DATA.venues.filter(v => v.cityId === this.state.selectedCityId);
    const regionMatches = SUKOON_DATA.venues.filter(v => v.regionId === this.state.selectedRegionId);
    
    let baseList = cityMatches.length > 0 ? cityMatches : (regionMatches.length > 0 ? regionMatches : SUKOON_DATA.venues);

    return baseList.filter(v => {
      if (this.state.activeCategory !== 'all' && v.category !== this.state.activeCategory) {
        return false;
      }
      if (this.state.searchQuery) {
        const q = this.state.searchQuery;
        const matchName = v.name.toLowerCase().includes(q);
        const matchAddress = v.address.toLowerCase().includes(q);
        const matchCategory = v.categoryName.toLowerCase().includes(q);
        const matchNeighborhood = v.neighborhood.toLowerCase().includes(q);
        const matchCity = v.cityName.toLowerCase().includes(q);
        if (!matchName && !matchAddress && !matchCategory && !matchNeighborhood && !matchCity) {
          return false;
        }
      }
      if (this.state.filters.noiseLevel !== 'all' && v.noiseLevel !== this.state.filters.noiseLevel) {
        return false;
      }
      if (this.state.filters.type !== 'all' && v.category !== this.state.filters.type) {
        return false;
      }
      if (this.state.filters.amenity !== 'all') {
        const hasAmenity = v.amenities.some(a => a.icon === this.state.filters.amenity);
        if (!hasAmenity) return false;
      }
      return true;
    });
  },

  // --- VIEW 1: EXPLORE ---
  renderExploreView() {
    const mainView = document.getElementById('app-view');
    const venues = this.getFilteredVenues();
    const recommendedVenues = venues.filter(v => v.isRecommended || v.rating >= 4.7);
    const displayVenues = recommendedVenues.length > 0 ? recommendedVenues : venues;

    mainView.innerHTML = `
      <!-- Slogan Callout Header with FOCUS English Logo -->
      <section class="mb-5 bg-surface-container-lowest dark:bg-[#142017] rounded-2xl p-4 border border-emerald-500/20 flex justify-between items-center shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl shadow-sm">
            F
          </div>
          <div>
            <div class="font-extrabold text-sm text-primary dark:text-emerald-400">FOCUS - فوكس هو خريطتك لأهدى الأماكن 🍃</div>
            <div class="text-xs text-outline">الموقع المحدد: ${this.state.selectedRegionName}، ${this.state.selectedCityName}</div>
          </div>
        </div>
        <button onclick="SukoonApp.openLocationModal()" class="px-3.5 py-1.5 bg-primary text-on-primary rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-800 transition-colors flex items-center gap-1">
          <span>تغيير المدينة</span>
          <span class="material-symbols-outlined text-sm">swap_horiz</span>
        </button>
      </section>

      <!-- Category Filter Chips -->
      <section class="mb-stack-lg overflow-x-auto pb-2 hide-scrollbar">
        <div class="flex gap-2">
          ${SUKOON_DATA.categories.map(cat => `
            <button 
              onclick="SukoonApp.filterCategory('${cat.id}')"
              class="shrink-0 px-4 py-2.5 rounded-full text-label-md font-medium transition-all flex items-center gap-2 border ${
                this.state.activeCategory === cat.id 
                  ? 'bg-primary text-on-primary border-primary shadow-md scale-95' 
                  : 'bg-surface-container-lowest dark:bg-[#142017] text-on-surface-variant dark:text-outline-variant border-surface-variant dark:border-outline-variant/30 hover:border-primary'
              }"
            >
              <span class="material-symbols-outlined text-lg">${cat.icon}</span>
              <span>${cat.name}</span>
            </button>
          `).join('')}
        </div>
      </section>

      <!-- Section 1: Nearest To You in FOCUS -->
      <section class="mb-stack-lg flex flex-col gap-stack-md">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary dark:text-emerald-400">near_me</span>
              الأقرب إليكِ في ${this.state.selectedCityName}
            </h2>
            <p class="text-xs text-on-surface-variant dark:text-outline-variant mt-0.5">مقاهي ومكتبات مربوطة بخرائط Google مباشرة</p>
          </div>
          <button onclick="SukoonApp.switchTab('search')" class="text-label-md font-semibold text-primary dark:text-emerald-400 hover:underline flex items-center gap-1">
            <span>عرض الكل</span>
            <span class="material-symbols-outlined text-sm rotate-180">arrow_back</span>
          </button>
        </div>

        <div class="flex overflow-x-auto gap-gutter pb-4 snap-x snap-mandatory hide-scrollbar">
          ${displayVenues.map(v => this.renderVenueCard(v)).join('')}
        </div>
      </section>

      <!-- Section 2: All Quiet Places -->
      <section class="mb-stack-lg flex flex-col gap-stack-md">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-xl font-bold text-on-surface dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary">graphic_eq</span>
              جميع مقاهي ومكتبات ${this.state.selectedCityName}
            </h2>
            <p class="text-xs text-on-surface-variant dark:text-outline-variant mt-0.5">معلومات دقيقة عن أوقات العمل، المنيو والأسعار وروابط Google Maps</p>
          </div>
          <button onclick="SukoonApp.openLocationModal()" class="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container dark:bg-surface-container-high text-on-surface-variant hover:bg-primary hover:text-white transition-colors">
            <span class="material-symbols-outlined text-sm">tune</span>
          </button>
        </div>

        <div class="flex flex-col gap-stack-md">
          ${venues.map(v => this.renderVenueListItem(v)).join('')}
        </div>
      </section>

      <!-- Section 3: Live FOCUS Updates Stream -->
      <section class="mb-stack-lg bg-surface-container-lowest dark:bg-[#142017] rounded-3xl p-6 border border-emerald-500/20 shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <span class="pulse-live"></span>
          <h3 class="font-bold text-lg text-primary dark:text-emerald-400">تحديثات المقاهي والهدوء المباشرة</h3>
        </div>
        <div class="flex flex-col gap-3">
          ${SUKOON_DATA.liveUpdates.map(u => `
            <div class="p-3.5 rounded-2xl bg-surface-container-low dark:bg-surface-container-high flex items-start gap-3 border border-outline-variant/10">
              <span class="material-symbols-outlined text-secondary text-xl mt-0.5">sensors</span>
              <div class="flex-1">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-bold text-sm text-on-surface dark:text-white">${u.venueName}</span>
                  <span class="text-[11px] text-outline">${u.time}</span>
                </div>
                <p class="text-xs text-on-surface-variant dark:text-outline-variant leading-relaxed">${u.text}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  renderVenueCard(v) {
    const isSaved = this.state.savedVenueIds.includes(v.id);
    return `
      <div 
        onclick="SukoonApp.openVenueDetailsModal('${v.id}')"
        class="snap-start shrink-0 w-[280px] bg-surface-container-lowest dark:bg-[#142017] rounded-3xl shadow-[0px_4px_20px_rgba(21,128,61,0.05)] overflow-hidden flex flex-col group cursor-pointer border border-emerald-500/20 hover:border-emerald-600 transition-all card-hover"
      >
        <div class="relative h-44 w-full overflow-hidden">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${v.mainImage}" alt="${v.name}" />
          
          <div class="absolute top-3 right-3 bg-emerald-700 text-white backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm text-[11px] font-bold">
            <span class="material-symbols-outlined text-xs">schedule</span>
            <span>مفتوح الآن</span>
          </div>

          <button 
            onclick="SukoonApp.toggleBookmark('${v.id}', event)"
            aria-label="حفظ المكان"
            class="absolute top-3 left-3 w-8 h-8 rounded-full bg-surface/90 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center text-primary dark:text-white hover:scale-110 transition-transform shadow-sm"
          >
            <span class="material-symbols-outlined text-base" style="font-variation-settings: 'FILL' ${isSaved ? 1 : 0};">bookmark</span>
          </button>

          <a 
            href="${v.googleMapsUrl}" 
            target="_blank"
            onclick="event.stopPropagation()"
            class="absolute bottom-3 left-3 bg-surface/90 dark:bg-black/70 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm text-[11px] font-bold text-primary dark:text-emerald-400 hover:scale-105 transition-transform"
          >
            <span class="material-symbols-outlined text-xs">map</span>
            <span>Google Maps</span>
          </a>
        </div>

        <div class="p-4 flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-body-md text-on-surface dark:text-white truncate max-w-[180px]">${this.getVenueName(v)}</h3>
            <div class="flex items-center gap-0.5 text-amber-500 font-bold text-xs">
              <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
              <span>${v.rating}</span>
            </div>
          </div>

          <p class="text-xs text-on-surface-variant dark:text-outline-variant truncate">${v.cityName} • ${v.neighborhood}</p>

          <div class="flex items-center justify-between mt-2 pt-2 border-t border-surface-variant/40 dark:border-outline-variant/20">
            <span class="text-xs font-semibold text-secondary flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">volume_off</span>
              ${v.noiseText}
            </span>
            <span class="text-xs text-primary font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">menu_book</span>
              المنيو والأسعار
            </span>
          </div>
        </div>
      </div>
    `;
  },

  renderVenueListItem(v) {
    const isSaved = this.state.savedVenueIds.includes(v.id);
    const isOpen = this.isVenueOpen(v);
    return `
      <div 
        onclick="SukoonApp.openVenueDetailsModal('${v.id}')"
        class="bg-surface-container-lowest dark:bg-[#142017] rounded-2xl p-3.5 flex gap-4 items-center shadow-[0px_4px_20px_rgba(21,128,61,0.03)] border border-emerald-500/20 cursor-pointer hover:border-emerald-600 hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-all group card-hover"
      >
        <img class="w-20 h-20 rounded-xl object-cover group-hover:opacity-90 transition-opacity" src="${v.mainImage}" alt="${this.getVenueName(v)}" />

        <div class="flex-1 flex flex-col justify-center min-w-0">
          <div class="flex justify-between items-start mb-1">
            <h3 class="font-bold text-body-md text-on-surface dark:text-white truncate">${this.getVenueName(v)}</h3>
            <div class="flex items-center gap-2">
              <a 
                href="${v.googleMapsUrl}" 
                target="_blank"
                onclick="event.stopPropagation()"
                class="px-2.5 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-lg text-[11px] font-bold flex items-center gap-1 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <span>خرائط Google</span>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </a>
              <button 
                onclick="SukoonApp.toggleBookmark('${v.id}', event)"
                class="text-outline hover:text-primary transition-colors"
              >
                <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' ${isSaved ? 1 : 0};">bookmark</span>
              </button>
            </div>
          </div>

          <p class="text-xs text-on-surface-variant dark:text-outline-variant truncate mb-1">${v.cityName} • ${v.neighborhood} • ${v.distance}</p>
          
          <div class="flex items-center gap-1.5 font-bold text-[11px] mb-2 truncate">
            ${isOpen ? `
              <span class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                مفتوح الآن 🟢
              </span>
            ` : `
              <span class="inline-flex items-center gap-1 bg-rose-500/10 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-md border border-rose-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                مغلق الآن 🔴
              </span>
            `}
            <span class="text-emerald-700 dark:text-emerald-400 font-semibold truncate">⏱️ ${v.openingHours}</span>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md">
              <span class="material-symbols-outlined text-secondary text-xs">volume_off</span>
              <span class="text-[11px] font-semibold text-secondary">${v.noiseText}</span>
            </div>
            <div class="w-20 h-2 bg-surface-container dark:bg-surface-container-high rounded-full overflow-hidden">
              <div class="h-full bg-secondary" style="width: ${v.occupancyRate}%"></div>
            </div>
            <span class="text-[11px] text-on-surface-variant dark:text-outline-variant font-medium">${v.occupancyRate}% مشغول</span>
          </div>
        </div>
      </div>
    `;
  },

  renderSearchView() {
    const mainView = document.getElementById('app-view');
    const filteredVenues = this.getFilteredVenues();

    mainView.innerHTML = `
      <div class="flex justify-between items-center bg-surface-container-lowest dark:bg-[#142017] p-4 rounded-2xl border border-emerald-500/20 mb-stack-md">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary dark:text-emerald-400">location_on</span>
          <span class="text-xs font-bold text-primary dark:text-emerald-400">خريطة FOCUS في: ${this.state.selectedRegionName}، ${this.state.selectedCityName}</span>
        </div>
        <button onclick="SukoonApp.openLocationModal()" class="text-xs font-bold text-secondary underline">تغيير المدينة</button>
      </div>

      <!-- Filter Controls -->
      <section class="flex flex-col gap-6 bg-surface-container-lowest dark:bg-[#142017] rounded-3xl p-6 border border-emerald-500/20 shadow-sm mb-stack-lg">
        
        <!-- Noise Level -->
        <div class="flex flex-col gap-2">
          <label class="font-bold text-sm text-primary dark:text-emerald-400 flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary">graphic_eq</span>
            مستوى الهدوء المطلوب
          </label>
          <div class="flex flex-wrap gap-2">
            ${[
              { id: 'all', label: 'الكل' },
              { id: 'silent', label: 'صامت تماماً 🔇' },
              { id: 'whisper', label: 'همس 🤫' },
              { id: 'moderate', label: 'معتدل ☕' }
            ].map(item => `
              <button 
                onclick="SukoonApp.setFilter('noiseLevel', '${item.id}')"
                class="px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                  this.state.filters.noiseLevel === item.id
                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                    : 'bg-surface-container-low dark:bg-surface-container-high text-on-surface-variant dark:text-outline-variant border-surface-variant dark:border-outline-variant/30 hover:border-primary'
                }"
              >
                ${item.label}
              </button>
            `).join('')}
          </div>
        </div>

        <hr class="border-surface-variant/40 dark:border-outline-variant/20"/>

        <!-- Venue Type -->
        <div class="flex flex-col gap-2">
          <label class="font-bold text-sm text-primary dark:text-emerald-400 flex items-center gap-2">
            <span class="material-symbols-outlined text-secondary">category</span>
            نوع المكان
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${[
              { id: 'all', name: 'جميع الأنواع', icon: 'grid_view' },
              { id: 'cafe', name: 'مقهى دراسة', icon: 'local_cafe' },
              { id: 'library', name: 'مكتبة صامتة', icon: 'local_library' },
              { id: 'coworking', name: 'مساحة عمل', icon: 'work' }
            ].map(type => `
              <div 
                onclick="SukoonApp.setFilter('type', '${type.id}')"
                class="rounded-2xl p-3.5 flex flex-col items-center justify-center gap-2 border-2 cursor-pointer transition-all ${
                  this.state.filters.type === type.id
                    ? 'bg-emerald-500/10 border-primary text-primary dark:text-emerald-400 shadow-sm'
                    : 'bg-surface-container-low dark:bg-surface-container-high border-transparent text-on-surface-variant dark:text-outline-variant hover:border-outline-variant'
                }"
              >
                <span class="material-symbols-outlined text-2xl">${type.icon}</span>
                <span class="text-xs font-bold text-center">${type.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Results List -->
      <div class="flex flex-col gap-stack-md mb-stack-lg">
        ${filteredVenues.length > 0 ? (
          filteredVenues.map(v => this.renderVenueListItem(v)).join('')
        ) : `
          <div class="text-center py-12 bg-surface-container-lowest dark:bg-[#142017] rounded-3xl p-8">
            <span class="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
            <h3 class="font-bold text-lg text-on-surface dark:text-white">لم نجد أماكن تطابق الفلترة الحالية في ${this.state.selectedCityName}</h3>
            <button onclick="SukoonApp.openLocationModal()" class="mt-4 px-6 py-2.5 bg-primary text-on-primary rounded-full text-xs font-bold shadow-md">اختر مدينة أخرى في FOCUS</button>
          </div>
        `}
      </div>
    `;
  },

  setFilter(key, value) {
    this.state.filters[key] = value;
    this.renderSearchView();
  },

  resetFilters() {
    this.state.filters = { noiseLevel: 'all', availability: 'all', amenity: 'all', type: 'all' };
    this.state.searchQuery = '';
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
    this.renderSearchView();
  },

  openFilterModal() {
    this.switchTab('search');
  },

  // --- VIEW 3: PLACE DETAILS MODAL WITH WORKING HOURS & GOOGLE MAPS LINK ---
  openVenueDetailsModal(venueId) {
    const venue = SUKOON_DATA.venues.find(v => v.id === venueId);
    if (!venue) return;

    this.state.currentVenueId = venueId;
    const isSaved = this.state.savedVenueIds.includes(venueId);

    const modal = document.getElementById('modal-container');
    modal.classList.remove('hidden');

    modal.innerHTML = `
      <div class="bg-surface dark:bg-[#0f1912] w-full max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col relative page-fade-in border border-emerald-500/20">
        
        <!-- Sticky Header Bar inside Modal -->
        <div class="sticky top-0 z-30 bg-surface/90 dark:bg-[#0f1912]/90 backdrop-blur-md px-6 py-4 border-b border-surface-variant/40 dark:border-outline-variant/20 flex justify-between items-center">
          <button onclick="SukoonApp.closeModal()" aria-label="إغلاق" class="w-9 h-9 rounded-full bg-surface-container dark:bg-surface-container-high flex items-center justify-center text-primary dark:text-white hover:bg-primary hover:text-white transition-colors">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
          <h2 class="font-bold text-lg text-primary dark:text-emerald-400 truncate max-w-[240px]">${this.getVenueName(venue)}</h2>
          <button onclick="SukoonApp.toggleBookmark('${venue.id}', event); SukoonApp.openVenueDetailsModal('${venue.id}')" aria-label="حفظ" class="w-9 h-9 rounded-full bg-surface-container dark:bg-surface-container-high flex items-center justify-center text-primary dark:text-white">
            <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' ${isSaved ? 1 : 0};">bookmark</span>
          </button>
        </div>

        <!-- Scrollable Modal Body -->
        <div class="overflow-y-auto flex-1 p-6 flex flex-col gap-6">
          
          <!-- Image Gallery Carousel -->
          <div class="w-full h-64 sm:h-72 rounded-3xl overflow-hidden relative shadow-md">
            <img id="detail-main-img" class="w-full h-full object-cover transition-opacity duration-300" src="${venue.mainImage}" alt="${this.getVenueName(venue)}" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div class="absolute bottom-4 right-4 left-4 flex justify-between items-end">
              <div class="text-white">
                <span class="inline-block bg-emerald-700/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-1">
                  ${venue.noiseText}
                </span>
                <h3 class="text-xl font-bold">${this.getVenueName(venue)}</h3>
                <p class="text-xs text-gray-200">${venue.cityName} - ${venue.address}</p>
              </div>
              <div class="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-amber-400 font-bold text-xs">
                <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                <span>${venue.rating} (${venue.reviewsCount} تقييم)</span>
              </div>
            </div>
          </div>

          <!-- Working Hours Callout Badge -->
          <div class="${this.isVenueOpen(venue) ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'} border rounded-2xl p-4 flex items-center gap-3">
            <span class="material-symbols-outlined ${this.isVenueOpen(venue) ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'} text-3xl">schedule</span>
            <div>
              <div class="font-bold text-xs ${this.isVenueOpen(venue) ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'} flex items-center gap-1.5">
                <span>${this.isVenueOpen(venue) ? 'مفتوح الآن 🟢' : 'مغلق الآن 🔴'}</span>
                ${this.isVenueOpen(venue) ? '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>' : ''}
              </div>
              <div class="text-xs font-semibold text-on-surface dark:text-white mt-0.5">${venue.openingHours}</div>
            </div>
          </div>

          <!-- Live Crowd Reporting Box -->
          <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm">
            <div>
              <div class="font-bold text-xs text-primary dark:text-emerald-300 flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">sensors</span>
                <span>الحالة الحية: <b>${venue.noiseLabel || venue.noiseText}</b></span>
              </div>
              <p class="text-[11px] text-outline font-bold mt-0.5">حدثي نسبة الهدوء أو الازدحام مباشرة في Firebase</p>
            </div>
            <button onclick="SukoonApp.openNoiseReportModal('${venue.id}')" class="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-emerald-800 transition-all shadow-sm shrink-0 flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">equalizer</span>
              <span>تحديث التواجد</span>
            </button>
          </div>

          <!-- Description -->
          <div>
            <h3 class="font-bold text-base text-primary dark:text-emerald-400 mb-2">عن المكان والأجواء</h3>
            <p class="text-sm text-on-surface-variant dark:text-outline-variant leading-relaxed">${venue.description}</p>
          </div>

          <!-- MENU SECTION FROM GOOGLE MAPS -->
          <div class="bg-surface-container-lowest dark:bg-[#142017] rounded-3xl p-5 border border-emerald-500/20 shadow-sm">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-base text-primary dark:text-emerald-400 flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-xl">restaurant_menu</span>
                المنيو وقائمة الأسعار (Google Maps)
              </h3>
              <a href="${venue.googleMapsUrl}" target="_blank" class="text-xs text-primary font-bold underline flex items-center gap-1">
                <span>منيو Google Maps</span>
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </a>
            </div>

            <div class="flex flex-col gap-3">
              ${venue.menu && venue.menu.length > 0 ? (
                venue.menu.map(m => `
                  <div class="p-3 rounded-2xl bg-surface-container-low dark:bg-surface-container-high flex justify-between items-center border border-outline-variant/10">
                    <div>
                      <div class="font-bold text-xs text-on-surface dark:text-white">${m.name}</div>
                      <div class="text-[11px] text-outline">${m.desc}</div>
                    </div>
                    <div class="font-bold text-sm text-emerald-700 dark:text-emerald-400 shrink-0 bg-emerald-500/10 px-3 py-1 rounded-xl">
                      ${m.price}
                    </div>
                  </div>
                `).join('')
              ) : `
                <div class="text-xs text-outline text-center py-4">قائمة المشروبات متوفرة مباشرة في المكان.</div>
              `}
            </div>
          </div>

          <!-- Amenities Bento Grid -->
          <div>
            <h3 class="font-bold text-base text-primary dark:text-emerald-400 mb-3">المرافق والتجهيزات</h3>
            <div class="grid grid-cols-2 gap-3">
              ${venue.amenities.map(a => `
                <div class="bg-surface-container-low dark:bg-surface-container-high rounded-2xl p-3.5 flex items-center gap-3 border border-outline-variant/20">
                  <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-2xl">${a.icon}</span>
                  <div>
                    <div class="font-bold text-xs text-on-surface dark:text-white">${a.name}</div>
                    <div class="text-[11px] text-on-surface-variant dark:text-outline-variant">${a.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Location & Direct Google Maps Button -->
          <div class="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low dark:bg-surface-container-high p-4 flex justify-between items-center">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-3xl">location_on</span>
              <div>
                <div class="font-bold text-sm text-on-surface dark:text-white">${venue.cityName} - ${venue.neighborhood}</div>
                <div class="text-xs text-outline">يبعد ${venue.distance} عن موقعك</div>
              </div>
            </div>
            <a href="${venue.googleMapsUrl}" target="_blank" class="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold shadow-sm flex items-center gap-1">
              <span>خرائط Google 📍</span>
            </a>
          </div>

        </div>

        <!-- Modal Action Bottom Bar -->
        <div class="p-4 bg-surface-container-lowest dark:bg-[#0f1912] border-t border-surface-variant/40 dark:border-outline-variant/20 flex gap-3">
          <button 
            onclick="SukoonApp.openFloorplanViewerModal('${venue.id}')"
            class="flex-1 bg-primary text-on-primary py-3.5 rounded-2xl font-bold text-sm shadow-md hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>مخطط الطاولات الشاغرة 🗺️</span>
          </button>
          <a 
            href="${venue.googleMapsUrl}" 
            target="_blank"
            class="px-5 bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1 border border-emerald-500/30 hover:bg-emerald-700 transition-colors"
          >
            <span>افتح في خرائط Google 📍</span>
          </a>
        </div>
      </div>
    `;
  },

  closeModal() {
    const modal = document.getElementById('modal-container');
    modal.classList.add('hidden');
    modal.innerHTML = '';
  },

  // --- VIEW 4: PURE TABLE FLOORPLAN VIEWER ---
  openFloorplanViewerModal(venueId) {
    const venue = SUKOON_DATA.venues.find(v => v.id === venueId);
    if (!venue) return;

    const modal = document.getElementById('modal-container');
    modal.classList.remove('hidden');

    modal.innerHTML = `
      <div class="bg-surface dark:bg-[#0f1912] w-full max-w-3xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col relative page-fade-in border border-emerald-500/20">
        
        <div class="sticky top-0 z-30 bg-surface/90 dark:bg-[#0f1912]/90 backdrop-blur-md px-6 py-4 border-b border-surface-variant/40 dark:border-outline-variant/20 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <button onclick="SukoonApp.openVenueDetailsModal('${venue.id}')" class="w-9 h-9 rounded-full bg-surface-container dark:bg-surface-container-high flex items-center justify-center text-primary dark:text-white">
              <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
            <div>
              <h2 class="font-bold text-base text-primary dark:text-emerald-400">مخطط الشغور وتوزيع الطاولات</h2>
              <p class="text-[11px] text-outline">${venue.name} - ${venue.cityName}</p>
            </div>
          </div>
          <button onclick="SukoonApp.closeModal()" class="w-9 h-9 rounded-full bg-surface-container dark:bg-surface-container-high flex items-center justify-center text-primary dark:text-white">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 p-6 flex flex-col gap-6">
          
          <div class="flex justify-center gap-6 bg-surface-container-lowest dark:bg-surface-container-high p-3 rounded-2xl border border-surface-variant/40 dark:border-outline-variant/20 text-xs">
            <div class="flex items-center gap-2">
              <div class="w-3.5 h-3.5 rounded-full bg-secondary"></div>
              <span class="text-on-surface dark:text-white font-medium">متاحة حالياً</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3.5 h-3.5 rounded-full bg-error"></div>
              <span class="text-on-surface dark:text-white font-medium">مشغولة</span>
            </div>
          </div>

          <div class="relative bg-surface-container-lowest dark:bg-[#142017] rounded-3xl shadow-inner p-4 aspect-square max-w-md mx-auto w-full flex items-center justify-center border border-emerald-500/20 overflow-hidden">
            <svg class="w-full h-full relative z-10" viewBox="0 0 400 400" id="floor-plan-svg">
              <rect x="10" y="10" width="380" height="380" rx="16" fill="none" stroke="currentColor" class="text-outline-variant opacity-30" stroke-width="2" stroke-dasharray="6"></rect>
              <path d="M 170 390 L 230 390" stroke="#15803d" stroke-width="6" stroke-linecap="round"></path>
              <text x="200" y="380" text-anchor="middle" class="fill-outline text-[11px] font-bold">المدخل الرئيسي</text>

              <path d="M 220 20 L 380 20 L 380 220" fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="4"></path>
              <text x="300" y="40" text-anchor="middle" class="fill-secondary text-[11px] font-bold">منطقة الصمت التام 🔇</text>

              ${venue.tablesFloorPlan.map(t => {
                let statusClass = 'table-available';
                if (t.status === 'occupied') statusClass = 'table-occupied';

                if (t.shape === 'circle') {
                  return `
                    <g class="cursor-pointer" onclick="SukoonApp.showToast('طاولة ${t.number}: ${t.zone}', 'info')">
                      <circle 
                        cx="${t.cx}" cy="${t.cy}" r="${t.r}" 
                        class="${statusClass}" 
                      />
                      <text x="${t.cx}" y="${t.cy + 4}" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" pointer-events="none">
                        ${t.number}
                      </text>
                    </g>
                  `;
                } else {
                  return `
                    <g class="cursor-pointer" onclick="SukoonApp.showToast('طاولة ${t.number}: ${t.zone}', 'info')">
                      <rect 
                        x="${t.x}" y="${t.y}" width="${t.width}" height="${t.height}" rx="${t.rx || 6}" 
                        class="${statusClass}" 
                      />
                      <text x="${t.x + t.width/2}" y="${t.y + t.height/2 + 4}" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold" pointer-events="none">
                        ${t.number}
                      </text>
                    </g>
                  `;
                }
              }).join('')}
            </svg>
          </div>

        </div>

      </div>
    `;
  },

  // --- VIEW 5: SAVED BOOKMARKS ---
  renderSavedView() {
    const mainView = document.getElementById('app-view');
    const savedVenues = SUKOON_DATA.venues.filter(v => this.state.savedVenueIds.includes(v.id));

    mainView.innerHTML = `
      <div class="flex justify-between items-center mb-stack-lg">
        <div>
          <h1 class="text-2xl font-bold text-on-surface dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary dark:text-emerald-400">bookmark</span>
            الأماكن والمقاهي المحفوظة (${savedVenues.length})
          </h1>
          <p class="text-xs text-outline mt-0.5">مساحاتك المفضلة على خريطة FOCUS للوصول السريع</p>
        </div>
      </div>

      <div class="flex flex-col gap-stack-md">
        ${savedVenues.length > 0 ? (
          savedVenues.map(v => this.renderVenueListItem(v)).join('')
        ) : `
          <div class="text-center py-16 bg-surface-container-lowest dark:bg-[#142017] rounded-3xl p-8 border border-emerald-500/20">
            <span class="material-symbols-outlined text-5xl text-outline mb-3">bookmark_border</span>
            <h2 class="font-bold text-lg text-on-surface dark:text-white">لم تقمي بحفظ أي مكان حتى الآن</h2>
            <p class="text-xs text-outline mt-1 mb-4">انقري على أيقونة الإشارة المرجعية لأي مقهى أو مكتبة لحفظه هنا.</p>
            <button onclick="SukoonApp.switchTab('explore')" class="px-6 py-2.5 bg-primary text-on-primary rounded-full text-xs font-bold shadow-md">استكشفي في FOCUS</button>
          </div>
        `}
      </div>
    `;
  },

  // --- VIEW 6: PROFILE & PREFERENCES ---
  renderProfileView() {
    const mainView = document.getElementById('app-view');

    mainView.innerHTML = `
      <section class="bg-surface-container-lowest dark:bg-[#142017] rounded-3xl p-6 border border-emerald-500/20 shadow-sm mb-stack-lg flex items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-primary text-on-primary font-bold text-2xl flex items-center justify-center shadow-md">
          و
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold text-on-surface dark:text-white">وديان الحربي</h1>
          <p class="text-xs text-outline">طالبة • ${this.state.selectedCityName}</p>
          <div class="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full mt-1">
            <span class="material-symbols-outlined text-xs">workspace_premium</span>
            عضوة متميزة في تطبيق FOCUS
          </div>
        </div>
        <button onclick="SukoonApp.openLocationModal()" class="px-3 py-1.5 bg-surface-container-low dark:bg-surface-container-high text-xs font-bold rounded-xl border border-outline-variant/30 flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">location_on</span>
          <span>الموقع</span>
        </button>
      </section>

      <section class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-stack-lg">
        <div class="bg-surface-container-low dark:bg-surface-container-high rounded-2xl p-4 text-center border border-outline-variant/20">
          <div class="text-2xl font-bold text-primary dark:text-emerald-400">48 ساعة</div>
          <div class="text-xs text-outline mt-0.5">ساعات التركيز والمذاكرة</div>
        </div>
        <div class="bg-surface-container-low dark:bg-surface-container-high rounded-2xl p-4 text-center border border-outline-variant/20">
          <div class="text-2xl font-bold text-secondary">${this.state.savedVenueIds.length} أماكن</div>
          <div class="text-xs text-outline mt-0.5">المفضلة في خريطة FOCUS</div>
        </div>
        <div class="bg-surface-container-low dark:bg-surface-container-high rounded-2xl p-4 text-center border border-outline-variant/20 col-span-2 md:col-span-1">
          <div class="text-2xl font-bold text-emerald-600">أخضر للتركيز</div>
          <div class="text-xs text-outline mt-0.5">نمط الألوان المفضل</div>
        </div>
      </section>

      <section class="bg-surface-container-lowest dark:bg-[#142017] rounded-3xl p-6 border border-emerald-500/20 shadow-sm">
        <h2 class="text-lg font-bold text-on-surface dark:text-white mb-4">التفضيلات والإعدادات</h2>
        
        <div class="flex flex-col gap-4 text-sm">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold text-on-surface dark:text-white">تحديد موقعي</div>
              <div class="text-xs text-outline">الموقع الحالي: ${this.state.selectedRegionName}، ${this.state.selectedCityName}</div>
            </div>
            <button onclick="SukoonApp.openLocationModal()" class="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold">
              تغيير
            </button>
          </div>

          <hr class="border-surface-variant/40 dark:border-outline-variant/20"/>

          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold text-on-surface dark:text-white">الوضع الداكن (Dark Mode)</div>
              <div class="text-xs text-outline">مريح للعين أثناء تصفح تطبيق FOCUS ليلاً</div>
            </div>
            <button onclick="SukoonApp.toggleDarkMode()" class="px-4 py-1.5 rounded-full bg-surface-container dark:bg-surface-container-high text-xs font-bold">
              ${this.state.darkMode ? 'إيقاف' : 'تفعيل'}
            </button>
          </div>
        </div>
      </section>
    `;
  }
};

window.SukoonApp = SukoonApp;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SukoonApp.init());
} else {
  SukoonApp.init();
}

