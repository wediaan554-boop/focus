// FOCUS (فوكس) Master Dataset - Exact Real Buraidah Cafes (MD, Adham, Jomo, 80 Nov 28)

const SUKOON_DATA = {
  userLocation: {
    regionId: "qassim",
    regionName: "منطقة القصيم",
    cityId: "buraidah",
    cityName: "بريدة",
    neighborhood: "حي المنتزه",
    coordinates: { lat: 26.345, lng: 43.968 }
  },

  regions: [
    {
      id: "qassim",
      name: "منطقة القصيم 🌴",
      cities: [
        { id: "buraidah", name: "بريدة", defaultNeighborhood: "حي المنتزه" },
        { id: "unaizah", name: "عنيزة", defaultNeighborhood: "حي الفاخرية" },
        { id: "alrass", name: "الرس", defaultNeighborhood: "حي الشفاء" },
        { id: "bukayriyah", name: "البكيرية", defaultNeighborhood: "حي المنتزه" }
      ]
    },
    {
      id: "riyadh",
      name: "منطقة الرياض 🏙️",
      cities: [
        { id: "riyadh-olaya", name: "الرياض - حي العليا", defaultNeighborhood: "حي العليا" },
        { id: "riyadh-malqa", name: "الرياض - حي الملقا", defaultNeighborhood: "حي الملقا" },
        { id: "riyadh-sahafa", name: "الرياض - حي الصحافة", defaultNeighborhood: "حي الصحافة" },
        { id: "riyadh-nakheel", name: "الرياض - حي النخيل", defaultNeighborhood: "حي النخيل" }
      ]
    },
    {
      id: "makkah",
      name: "منطقة مكة المكرمة 🌊",
      cities: [
        { id: "jeddah", name: "جدة", defaultNeighborhood: "حي الروضة" },
        { id: "makkah-city", name: "مكة المكرمة", defaultNeighborhood: "حي العوالي" }
      ]
    },
    {
      id: "eastern",
      name: "المنطقة الشرقية 🛢️",
      cities: [
        { id: "dhahran", name: "الظهران (إثراء)", defaultNeighborhood: "حي الجامعة" },
        { id: "khobar", name: "الخبر", defaultNeighborhood: "حي الحزام الذهبي" },
        { id: "dammam", name: "الدمام", defaultNeighborhood: "حي الشاطئ" }
      ]
    },
    {
      id: "madinah",
      name: "منطقة المدينة المنورة 🕌",
      cities: [
        { id: "madinah-city", name: "المدينة المنورة", defaultNeighborhood: "حي سلطانة" }
      ]
    }
  ],

  categories: [
    { id: "all", name: "الكل", icon: "grid_view" },
    { id: "cafe", name: "مقاهي المذاكرة والعمل", icon: "local_cafe" },
    { id: "library", name: "مكتبات عامة صامتة", icon: "local_library" },
    { id: "coworking", name: "مساحات عمل مشتركة", icon: "work" }
  ],

  venues: [
    // ==========================================
    // 🌴 BURAIDAH (بريدة) - Famous Local Cafes Added
    // ==========================================
    {
      id: "v-bur-1",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "بيت الثقافة - مكتبة بريدة العامة",
      category: "library",
      categoryName: "مكتبة عامة وثقافية",
      neighborhood: "طريق الملك فهد، بريدة",
      address: "طريق الملك فهد، بريدة، المملكة العربية السعودية",
      distance: "400m",
      distanceValue: 400,
      rating: 4.9,
      reviewsCount: 420,
      noiseLevel: "silent",
      noiseText: "صامت تماماً 🔇",
      noiseColor: "secondary",
      occupancyRate: 15,
      isRecommended: true,
      verified: true,
      openingHours: "الأحد - الخميس: 9:00 ص - 12:00 م • الجمعة: 1:00 م - 12:00 م • السبت: 9:00 ص - 12:00 م",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=بيت+الثقافة+مكتبة+بريدة+العامة+طريق+الملك+فهد",
      mainImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "طاولات فردية مزودة بعوازل صوتية ومنافذ كهرباء", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "قهوة سوداء مقطرة", price: "8 ريال", desc: "قهوة ساخنة خفيفة للمذاكرة" },
        { name: "شاي أحمر / أخضر بالنعناع", price: "5 ريال", desc: "شاي طازج" },
        { name: "ماء نقي 500ml", price: "2 ريال", desc: "مياه معدنية" }
      ],
      description: "بيت الثقافة - مكتبة بريدة العامة على طريق الملك فهد، مبادرة هيئة المكتبات بوزارة الثقافة السعودية. يضم مكتبة رئيسية، مكتبة للطفل، ومساحات عمل صامتة مجهزة بمنافذ شحن وإضاءة مخصصة للقراءة والتركيز.",
      amenities: [
        { icon: "wifi", name: "واي فاي مجاني", desc: "ألياف ضوئية فائقة السرعة" },
        { icon: "power", name: "منافذ طاقة بكل طاولة", desc: "مقابس AC + USB-C" },
        { icon: "volume_off", name: "صامت تماماً", desc: "هدوء تام 100%" }
      ],
      coordinates: { lat: 26.345, lng: 43.968 },
      tablesFloorPlan: [
        { id: 1, number: "T-01", shape: "circle", cx: 80, cy: 80, r: 24, status: "available", zone: "جناح المذاكرة الصامتة", hasPower: true, seats: 1 },
        { id: 2, number: "T-02", shape: "circle", cx: 160, cy: 80, r: 24, status: "available", zone: "جناح المذاكرة الصامتة", hasPower: true, seats: 1 }
      ]
    },
    {
      id: "v-bur-md",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "ام دي كافيه",
      nameEn: "MD Specialty Coffee",
      category: "cafe",
      categoryName: "مقهى قهوة مختصة للمذاكرة",
      neighborhood: "شارع البخاري، حي الريان، بريدة",
      address: "شارع البخاري، حي الريان، بريدة 52379، القصيم",
      distance: "1.0km",
      distanceValue: 1000,
      rating: 4.9,
      reviewsCount: 380,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 20,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 24 ساعة (مفتوح طوال اليوم)",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=M+DEE+coffee+شارع+البخاري+حي+الريان+بريدة",
      mainImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "طاولات هادئة مجهزة بمنافذ طاقة للمذاكرة واللابتوب", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "ام دي V60 تقطير", price: "18 ريال", desc: "محصول فاخر ومذاق متوازن" },
        { name: "فلات وايت ام دي", price: "16 ريال", desc: "إسبريسو غني مع حليب" },
        { name: "آيس سبانيش لاتيه", price: "22 ريال", desc: "منعش وطاقة سريعة" },
        { name: "كرواسون طازج", price: "14 ريال", desc: "طازج يومياً" }
      ],
      description: "مقهى ام دي ببريدة على طريق الملك عبد الله، بيئة رايقة وأنيقة ومناسبة جداً للمذاكرة والعمل الطويل.",
      amenities: [
        { icon: "wifi", name: "إنترنت سريع", desc: "تغطية كاملة" },
        { icon: "power", name: "منافذ شحن بكل طاولة", desc: "متوفرة" },
        { icon: "coffee_maker", name: "قهوة مختصة", desc: "أعلى جودة" }
      ],
      coordinates: { lat: 26.350, lng: 43.970 },
      tablesFloorPlan: [
        { id: 1, number: "MD-01", shape: "circle", cx: 90, cy: 90, r: 24, status: "available", zone: "صالة التركيز", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-bur-jomo",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "جومو كافيه",
      nameEn: "Jomo Cafe",
      category: "cafe",
      categoryName: "مقهى دراسة هادئ بالنهار",
      neighborhood: "حي الريان، بريدة",
      address: "حي الريان، بريدة، القصيم",
      distance: "700m",
      distanceValue: 700,
      rating: 4.8,
      reviewsCount: 310,
      noiseLevel: "whisper",
      noiseText: "همس (هادئ جداً بالنهار) 🤫",
      noiseColor: "tertiary",
      occupancyRate: 15,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 6:30 ص - 12:30 ص (أجواء هادئة جداً بالنهار)",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=جومو+كافيه+حي+الريان+بريدة",
      mainImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "أجواء نهارية هادئة جداً وطاولات مريحة لقراءة الكتب والمذاكرة", url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "جومو V60 كولومبي", price: "19 ريال", desc: "نكهة فاكهية متوازنة" },
        { name: "آيس لاتيه جومو", price: "18 ريال", desc: "مشروب بارد ومثالي" },
        { name: "كيكة العسل", price: "22 ريال", desc: "طازجة ولذيذة" }
      ],
      description: "مقهى جومو بحي الريان ببريدة يتميز بأجواء هادئة جداً ورايقة في فترة النهار، خيار ممتاز للطلاب للمذاكرة وقراءة الكتب والعمل.",
      amenities: [
        { icon: "wb_sunny", name: "هادئ جداً بالنهار", desc: "أجواء مثالية للمذاكرة" },
        { icon: "wifi", name: "واي فاي مجاني", desc: "سريع" },
        { icon: "power", name: "مقابس كهربائية", desc: "بجوار الطاولات" }
      ],
      coordinates: { lat: 26.358, lng: 43.975 },
      tablesFloorPlan: [
        { id: 1, number: "JM-01", shape: "rect", x: 90, y: 90, width: 85, height: 40, rx: 6, status: "available", zone: "صالة النهار الهادئة", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-bur-adham",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "كافيه أدهم",
      nameEn: "Adham Specialty Coffee",
      category: "cafe",
      categoryName: "مقهى قهوة مختصة ومذاكرة",
      neighborhood: "حي الفايزية، بريدة",
      address: "حي الفايزية، بريدة، القصيم",
      distance: "850m",
      distanceValue: 850,
      rating: 4.8,
      reviewsCount: 290,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 25,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 6:00 ص - 1:00 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=أدهم+كافيه+حي+الفايزية+بريدة",
      mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "جلسات أنيقة ومخصصة لأصحاب الأجهزة الذكية والعمل", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "أدهم لاتيه الخاص", price: "22 ريال", desc: "المشروب التوقيعي لأدهم" },
        { name: "كولد برو أدهم", price: "20 ريال", desc: "قهوة باردة منقوعة" },
        { name: "سان سيباستيان تشيز كيك", price: "24 ريال", desc: "مخبوزات طازجة" }
      ],
      description: "كافيه أدهم بحي الفايزية ببريدة، مقهى متميز بالهدوء، الجودة، وتوفر أماكن مريحة للمذاكرة.",
      amenities: [
        { icon: "wifi", name: "واي فاي سريع", desc: "متوفر للجميع" },
        { icon: "power", name: "منافذ شحن", desc: "متوفرة" }
      ],
      coordinates: { lat: 26.365, lng: 43.982 },
      tablesFloorPlan: [
        { id: 1, number: "AD-01", shape: "circle", cx: 90, cy: 90, r: 24, status: "available", zone: "صالة العمل", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-bur-thamanyn",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "محمصة ثمانين",
      nameEn: "Thamanyn Specialty Coffee",
      category: "cafe",
      categoryName: "محمصة ومقهى قهوة مختصة",
      neighborhood: "حي النهضة، بريدة",
      address: "حي النهضة، بريدة، القصيم",
      distance: "1.1km",
      distanceValue: 1100,
      rating: 4.8,
      reviewsCount: 330,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 20,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 7:00 ص - 12:30 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=ثمانين+Thamanyn+coffee+بريدة+حي+النهضة",
      mainImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "أجواء ثمانين الهادئة بحي النهضة ببريدة - مناسبة للمذاكرة", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "ثمانين V60 مقطر", price: "20 ريال", desc: "محصول مميز من محمصة ثمانين" },
        { name: "كورتادو ثمانين", price: "15 ريال", desc: "إسبريسو مع رشة حليب متوازنة" },
        { name: "آيس لاتيه ثمانين", price: "19 ريال", desc: "منعش وطاقة للمذاكرة" }
      ],
      description: "محمصة ثمانين بحي النهضة ببريدة، محمصة قهوة مختصة بأجواء هادئة ورايقة تناسب المذاكرة والعمل بتركيز.",
      amenities: [
        { icon: "wifi", name: "واي فاي سريع", desc: "متوفر" },
        { icon: "power", name: "منافذ شحن", desc: "متوفرة" },
        { icon: "coffee_maker", name: "محمصة خاصة", desc: "بن طازج محمص" }
      ],
      coordinates: { lat: 26.372, lng: 43.962 },
      tablesFloorPlan: [
        { id: 1, number: "TH-01", shape: "rect", x: 90, y: 90, width: 85, height: 40, rx: 6, status: "available", zone: "صالة الجلوس", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-bur-28nov",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "محمصة 28 نوفمبر",
      nameEn: "28 November Roastery",
      category: "cafe",
      categoryName: "محمصة ومقهى قهوة مختصة",
      neighborhood: "شارع عثمان بن عفان، بريدة",
      address: "شارع عثمان بن عفان، بريدة، القصيم",
      distance: "750m",
      distanceValue: 750,
      rating: 4.8,
      reviewsCount: 280,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 25,
      isRecommended: true,
      verified: true,
      openingHours: "السبت - الخميس: 9:00 ص - 12:00 م • الجمعة: 2:00 م - 12:00 م",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=28+November+Roastery+بريدة+شارع+عثمان+بن+عفان",
      mainImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "محمصة 28 نوفمبر - جلسات هادئة ومخصصة للمذاكرة والعمل", url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "28 نوفمبر V60", price: "19 ريال", desc: "محصول فاخر من المحمصة" },
        { name: "فلات وايت 28 نوفمبر", price: "16 ريال", desc: "إسبريسو كريمي مع حليب" },
        { name: "كولد برو (Cold Brew)", price: "22 ريال", desc: "قهوة باردة منقوعة 12 ساعة" }
      ],
      description: "محمصة ومقهى 28 نوفمبر على شارع عثمان بن عفان ببريدة، وجهة القهوة المختصة والمحامص الفاخرة. أجواء هادئة مناسبة جداً للمذاكرة والعمل.",
      amenities: [
        { icon: "wifi", name: "واي فاي سريع", desc: "متوفر" },
        { icon: "power", name: "منافذ شحن", desc: "متوفرة" },
        { icon: "coffee_maker", name: "محمصة خاصة", desc: "بن طازج محمص يومياً" }
      ],
      coordinates: { lat: 26.365, lng: 43.980 },
      tablesFloorPlan: [
        { id: 1, number: "28N-01", shape: "circle", cx: 90, cy: 90, r: 24, status: "available", zone: "صالة القهوة الهادئة", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-bur-anwaan",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "عنوان القهوة",
      nameEn: "The Coffee Address",
      category: "cafe",
      categoryName: "مقهى قهوة مختصة للمذاكرة",
      neighborhood: "حي الفايزية (طريق الملك فهد)، بريدة",
      address: "طريق الملك فهد، حي الفايزية، بريدة، القصيم",
      distance: "600m",
      distanceValue: 600,
      rating: 4.8,
      reviewsCount: 420,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 25,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 6:00 ص - 1:00 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=عنوان+القهوة+حي+الفايزية+بريدة",
      mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "جلسات عنوان القهوة الهادئة بحي الفايزية ببريدة", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "V60 تقطير يدوي", price: "18 ريال", desc: "محصول متميز" },
        { name: "فلات وايت", price: "16 ريال", desc: "إسبريسو غني مع حليب" },
        { name: "آيس لاتيه", price: "20 ريال", desc: "بارد ومنعش" }
      ],
      description: "عنوان القهوة بحي الفايزية ببريدة على طريق الملك فهد، من أبرز مقاهي بريدة الهادئة المخصصة للمذاكرة والعمل بتركيز.",
      amenities: [
        { icon: "wifi", name: "إنترنت سريع", desc: "تغطية كاملة" },
        { icon: "power", name: "منافذ شحن", desc: "بجوار الطاولات" }
      ],
      coordinates: { lat: 26.360, lng: 43.975 },
      tablesFloorPlan: [
        { id: 1, number: "AQ-01", shape: "circle", cx: 90, cy: 90, r: 22, status: "available", zone: "صالة التركيز", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-bur-5",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "دوز كافيه",
      nameEn: "Dose Cafe",
      category: "cafe",
      categoryName: "مقهى دراسة ومشروبات",
      neighborhood: "طريق عثمان بن عفان (حي الأفق)",
      address: "طريق عثمان بن عفان، حي الأفق، بريدة",
      distance: "800m",
      distanceValue: 800,
      rating: 4.6,
      reviewsCount: 310,
      noiseLevel: "moderate",
      noiseText: "معتدل ☕",
      noiseColor: "tertiary",
      occupancyRate: 40,
      isRecommended: false,
      verified: true,
      openingHours: "يومياً: 24 ساعة (مفتوح طوال اليوم)",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=دوز+كافيه+بريدة",
      mainImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "طاولات جانبية مريحة للمذاكرة والمراجعة", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "دوز لاتيه الخاص (Dose Latte)", price: "21 ريال", desc: "المشروب التوقيعي لدوز كافيه" },
        { name: "آيس شيكن إسبريسو", price: "19 ريال", desc: "إسبريسو مخفوق مع الثلج" }
      ],
      description: "دوز كافيه بحي الأفق ببريدة مقهى مفتوح 24 ساعة بأجواء حيوية معتدلة يناسب المذاكرة والمراجعات الجماعية.",
      amenities: [
        { icon: "schedule", name: "مفتوح 24 ساعة", desc: "متوفر طوال اليوم" },
        { icon: "wifi", name: "واي فاي مجاني", desc: "سريع" }
      ],
      coordinates: { lat: 26.362, lng: 43.985 },
      tablesFloorPlan: [
        { id: 1, number: "D-01", shape: "circle", cx: 100, cy: 100, r: 24, status: "available", zone: "الركن الجانبي", hasPower: true, seats: 2 }
      ]
    },

    {
      id: "v-bur-warm",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "وارم كافيه",
      nameEn: "Warm Cafe",
      category: "cafe",
      categoryName: "مقهى قهوة مختصة",
      neighborhood: "حي الصفراء، بريدة",
      address: "حي الصفراء، بريدة، القصيم",
      distance: "900m",
      distanceValue: 900,
      rating: 4.7,
      reviewsCount: 260,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 30,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 6:00 ص - 4:00 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=وارم+كافيه+حي+الصفراء+بريدة",
      mainImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "وارم كافيه بحي الصفراء - أجواء دافئة ومريحة للمذاكرة", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "وارم لاتيه الخاص", price: "20 ريال", desc: "المشروب التوقيعي لوارم" },
        { name: "فلات وايت", price: "15 ريال", desc: "إسبريسو مع حليب مبخر" },
        { name: "آيس سبانيش لاتيه", price: "21 ريال", desc: "بارد ومنعش" }
      ],
      description: "وارم كافيه بحي الصفراء ببريدة، مقهى قهوة مختصة بأجواء دافئة ومريحة تناسب المذاكرة والعمل.",
      amenities: [
        { icon: "wifi", name: "واي فاي سريع", desc: "متوفر" },
        { icon: "power", name: "منافذ شحن", desc: "متوفرة" }
      ],
      coordinates: { lat: 26.355, lng: 43.990 },
      tablesFloorPlan: [
        { id: 1, number: "WR-01", shape: "rect", x: 90, y: 90, width: 85, height: 40, rx: 6, status: "available", zone: "صالة الجلوس", hasPower: true, seats: 2 }
      ]
    },

    {
      id: "v-bur-cbtl",
      cityId: "buraidah",
      cityName: "بريدة",
      regionId: "qassim",
      name: "ذا كوفي بين آند تي ليف",
      nameEn: "The Coffee Bean & Tea Leaf",
      category: "cafe",
      categoryName: "مقهى ومشروبات شاي وقهوة",
      neighborhood: "حي الإسكان، بريدة",
      address: "حي الإسكان، بريدة، القصيم",
      distance: "1.2km",
      distanceValue: 1200,
      rating: 4.7,
      reviewsCount: 350,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 25,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 6:00 ص - 1:00 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Coffee+Bean+and+Tea+Leaf+حي+الإسكان+بريدة",
      mainImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "ذا كوفي بين آند تي ليف بحي الإسكان - جلسات هادئة مريحة للمذاكرة والعمل", url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "آيس بلاك أوركيد لاتيه", price: "22 ريال", desc: "إسبريسو غني بنكهة الأوركيد المميزة" },
        { name: "قهوة مقطرة طازجة", price: "16 ريال", desc: "محصول كولومبي متميز" },
        { name: "تشكيلة الشاي الفاخر", price: "18 ريال", desc: "أوراق شاي مستوردة طازجة" }
      ],
      description: "ذا كوفي بين آند تي ليف بحي الإسكان ببريدة، ماركة عالمية مرموقة توفر أجواء هادئة وجلسات مخصصة للمذاكرة والعمل مع تنوع واسع من خيارات القهوة والشاي.",
      amenities: [
        { icon: "wifi", name: "واي فاي سريع", desc: "متوفر" },
        { icon: "power", name: "منافذ شحن", desc: "متوفرة" }
      ],
      coordinates: { lat: 26.370, lng: 43.960 },
      tablesFloorPlan: [
        { id: 1, number: "CB-01", shape: "rect", x: 90, y: 90, width: 85, height: 40, rx: 6, status: "available", zone: "صالة الجلوس", hasPower: true, seats: 2 }
      ]
    },

    // ==========================================
    // 🌴 UNAIZAH (عنيزة) - Strictly Verified Local Venues
    // ==========================================
    {
      id: "v-unz-1",
      cityId: "unaizah",
      cityName: "عنيزة",
      regionId: "qassim",
      name: "بلان كافيه",
      nameEn: "Blan Cafe",
      category: "cafe",
      categoryName: "مقهى دراسة وطاولات هادئة",
      neighborhood: "حي السويلمية، عنيزة",
      address: "حي السويلمية، عنيزة، القصيم",
      distance: "450m",
      distanceValue: 450,
      rating: 4.9,
      reviewsCount: 310,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 15,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 7:00 ص - 12:30 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=بلان+كافيه+عنيزة",
      mainImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "طاولات خاصة بالعمل والمذاكرة مع منافذ شحن مدمجة", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "بلان لاتيه الخاص", price: "21 ريال", desc: "نكهة مميزة وحليب طازج" },
        { name: "قهوة V60 تقطير", price: "18 ريال", desc: "تقطير يدوي احترافي" },
        { name: "كيكة التمر بالكراميل", price: "20 ريال", desc: "طازجة ودافئة" }
      ],
      description: "بلان كافيه بحي السويلمية في عنيزة، مقهى هادئ ورايق مناسب للمذاكرة والعمل بتركيز.",
      amenities: [
        { icon: "wifi", name: "إنترنت سريع جداً", desc: "واي فاي مفتوح" },
        { icon: "power", name: "منافذ شحن بكل طاولة", desc: "USB-C & AC" }
      ],
      coordinates: { lat: 26.085, lng: 43.990 },
      tablesFloorPlan: [
        { id: 1, number: "A-01", shape: "circle", cx: 100, cy: 100, r: 24, status: "available", zone: "ركن الدراسة والتركيز", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-unz-2",
      cityId: "unaizah",
      cityName: "عنيزة",
      regionId: "qassim",
      name: "مكتبة الجمعية الأهلية الصالحية بعنيزة",
      category: "library",
      categoryName: "مكتبة عامة ومركز معرفي",
      neighborhood: "مركز صالح بن صالح الاجتماعي (حي الهدا)",
      address: "محافظة عنيزة، حي الهدا، عنيزة، القصيم",
      distance: "800m",
      distanceValue: 800,
      rating: 4.9,
      reviewsCount: 260,
      noiseLevel: "silent",
      noiseText: "صامت تماماً 🔇",
      noiseColor: "secondary",
      occupancyRate: 10,
      isRecommended: true,
      verified: true,
      openingHours: "الأحد - الخميس: 8:00 ص - 9:00 م",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=مكتبة+الجمعية+الأهلية+الصالحية+عنيزة+حي+الهدا",
      mainImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "صالة قراءة صامتة ومكاتب بحث فردية", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "قهوة سعودية / شاي", price: "5 ريال", desc: "ضيافة دافئة" },
        { name: "ماء نقي", price: "2 ريال", desc: "مياه معدنية" }
      ],
      description: "من أعرق المراكز المعرفية والمكتبات الأهلية بعنيزة، تتبع مركز صالح بن صالح الاجتماعي بحي الهدا. تتيح مراجع علمية متكاملة وتوفر بيئة صامتة مجهزة بأعلى درجات الهدوء.",
      amenities: [
        { icon: "volume_off", name: "صامت تماماً", desc: "هدوء 100%" },
        { icon: "wifi", name: "واي فاي مجاني", desc: "سريع" }
      ],
      coordinates: { lat: 26.092, lng: 44.005 },
      tablesFloorPlan: [
        { id: 1, number: "S-01", shape: "rect", x: 90, y: 90, width: 100, height: 40, rx: 8, status: "available", zone: "صالة القراءة الصامتة", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-unz-neighbors",
      cityId: "unaizah",
      cityName: "عنيزة",
      regionId: "qassim",
      name: "كافيه نيبرز",
      nameEn: "Neighbors Coffee",
      category: "cafe",
      categoryName: "مقهى قهوة مختصة للمذاكرة",
      neighborhood: "طريق الملك عبد العزيز، عنيزة",
      address: "طريق الملك عبد العزيز، عنيزة، القصيم",
      distance: "600m",
      distanceValue: 600,
      rating: 4.8,
      reviewsCount: 290,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 20,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 6:00 ص - 1:00 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Neighbors+Coffee+عنيزة",
      mainImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "جلسات كافيه نيبرز الرايقة بعنيزة للمذاكرة والعمل", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "V60 كولومبي تقطير", price: "19 ريال", desc: "إيحاءات فاكهية متوازنة" },
        { name: "فلات وايت نيبرز", price: "16 ريال", desc: "إسبريسو غني مع حليب" },
        { name: "آيس سبانيش لاتيه", price: "21 ريال", desc: "بارد ومثالي للتركيز" }
      ],
      description: "كافيه نيبرز بعنيزة، وجهة متميزة للقهوة المختصة، يوفر جلسات هادئة وطاولات مجهزة بمنافذ طاقة للمذاكرة والعمل بتركيز.",
      amenities: [
        { icon: "wifi", name: "إنترنت سريع", desc: "متوفر" },
        { icon: "power", name: "منافذ شحن", desc: "بجوار الطاولات" }
      ],
      coordinates: { lat: 26.088, lng: 43.995 },
      tablesFloorPlan: [
        { id: 1, number: "NB-01", shape: "circle", cx: 90, cy: 90, r: 22, status: "available", zone: "صالة التركيز", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v-unz-greenside",
      cityId: "unaizah",
      cityName: "عنيزة",
      regionId: "qassim",
      name: "كافيه قرين سايد",
      nameEn: "Green Side Cafe",
      category: "cafe",
      categoryName: "مقهى قهوة مختصة وأجواء هادئة",
      neighborhood: "طريق الملك عبد العزيز (حي الواحة)، عنيزة",
      address: "طريق الملك عبد العزيز، عنيزة، القصيم",
      distance: "750m",
      distanceValue: 750,
      rating: 4.7,
      reviewsCount: 230,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 25,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 4:00 م - 1:30 ص",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Green+Side+Cafe+عنيزة",
      mainImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "أجواء قرين سايد الجذابة مع طاولات مخصصة لأجهزة اللابتوب", url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "قرين سايد لاتيه الخاص", price: "22 ريال", desc: "خلطة متميزة ومذاق ساحر" },
        { name: "قهوة V60 مقطرة", price: "18 ريال", desc: "محصول إثيوبي متميز" },
        { name: "كيكة الشوكولاتة الداكنة", price: "22 ريال", desc: "طازجة ولذيذة" }
      ],
      description: "كافيه قرين سايد بالقرب من فندق الواحة بعنيزة، تصميم راقي وأجواء هادئة جداً مع إضاءة مناسبة للمذاكرة وقراءة الكتب.",
      amenities: [
        { icon: "wifi", name: "واي فاي مجاني", desc: "سريع" },
        { icon: "power", name: "مقابس طاقة", desc: "متوفرة" }
      ],
      coordinates: { lat: 26.082, lng: 44.000 },
      tablesFloorPlan: [
        { id: 1, number: "GS-01", shape: "rect", x: 90, y: 90, width: 85, height: 40, rx: 6, status: "available", zone: "صالة الجلوس الهادئة", hasPower: true, seats: 2 }
      ]
    },

    // ==========================================
    // 🏙️ RIYADH (الرياض)
    // ==========================================
    {
      id: "v-ruh-elixir",
      cityId: "riyadh-sahafa",
      cityName: "الرياض - حي الصحافة / التخصصي",
      regionId: "riyadh",
      name: "محمصة ومقهى إليكسير بن (Elixir Bunn Riyadh)",
      category: "cafe",
      categoryName: "محمصة ومقهى قهوة مختصة",
      neighborhood: "طريق التخصصي (حي النخيل / الصحافة)",
      address: "طريق التخصصي، الرياض",
      distance: "1.1km",
      distanceValue: 1100,
      rating: 4.9,
      reviewsCount: 1250,
      noiseLevel: "whisper",
      noiseText: "همس 🤫",
      noiseColor: "tertiary",
      occupancyRate: 35,
      isRecommended: true,
      verified: true,
      openingHours: "يومياً: 6:30 ص - 12:00 منتصف الليل",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Elixir+Bunn+Coffee+Roasters+Riyadh",
      mainImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "طاولات مذاكرة وعوازل في أفرع إليكسير بن بالرياض", url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "إليكسير V60 مقطر", price: "20 ريال", desc: "محصول التخصصي الخاص" },
        { name: "فلات وايت إليكسير", price: "18 ريال", desc: "إسبريسو فاخر مع حليب" }
      ],
      description: "المقر الشهير لمحمصة إليكسير بن بالرياض (طريق التخصصي). من أبرز معالم القهوة المختصة بالرياض للعمل والمذاكرة.",
      amenities: [
        { icon: "wifi", name: "إنترنت ألياف ضوئية", desc: "فائق السرعة" },
        { icon: "power", name: "مقابس كهرباء", desc: "متوفرة" }
      ],
      coordinates: { lat: 24.770, lng: 46.650 },
      tablesFloorPlan: [
        { id: 1, number: "EB-R1", shape: "circle", cx: 90, cy: 90, r: 24, status: "available", zone: "صالة العمل", hasPower: true, seats: 2 }
      ]
    },
    {
      id: "v1",
      cityId: "riyadh-olaya",
      cityName: "الرياض - حي العليا",
      regionId: "riyadh",
      name: "مكتبة الملك فهد الوطنية",
      category: "library",
      categoryName: "مكتبة وطنية صامتة",
      neighborhood: "طريق الملك فهد (حي العليا)",
      address: "طريق الملك فهد، حي العليا، الرياض",
      distance: "500m",
      distanceValue: 500,
      rating: 4.9,
      reviewsCount: 650,
      noiseLevel: "silent",
      noiseText: "صامت تماماً 🔇",
      noiseColor: "secondary",
      occupancyRate: 20,
      isRecommended: true,
      verified: true,
      openingHours: "الأحد - الخميس: 8:00 ص - 8:00 م",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=King+Fahd+National+Library+Riyadh",
      mainImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "طاولة فردية مع عازل صوتي ومقبس كهرباء", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "قهوة سوداء مقطرة", price: "10 ريال", desc: "قهوة ساخنة" },
        { name: "شاي دافئ", price: "5 ريال", desc: "أنواع متنوعة" }
      ],
      description: "المكتبة الوطنية الصامتة الأولى بالمملكة. إضاءة طبيعية ممتازة، عزل صوتي تام، ومقابس كهربائية مدمجة بكل الطاولات.",
      amenities: [
        { icon: "wifi", name: "إنترنت 500Mbps", desc: "ألياف ضوئية" },
        { icon: "power", name: "مقابس AC + USB-C", desc: "بكل طاولة" }
      ],
      coordinates: { lat: 24.688, lng: 46.685 },
      tablesFloorPlan: [
        { id: 1, number: "T-01", shape: "circle", cx: 80, cy: 80, r: 24, status: "available", zone: "منطقة الصمت الفردي", hasPower: true, seats: 1 }
      ]
    },

    // ==========================================
    // 🛢️ DHAHRAN (الظهران إثراء)
    // ==========================================
    {
      id: "v-dhn-1",
      cityId: "dhahran",
      cityName: "الظهران (إثراء)",
      regionId: "eastern",
      name: "مكتبة مركز الملك عبد العزيز الثقافي (إثراء)",
      category: "library",
      categoryName: "مكتبة ثقافية صامتة",
      neighborhood: "الظهران",
      address: "مركز إثراء، الظهران، المنطقة الشرقية",
      distance: "500m",
      distanceValue: 500,
      rating: 4.9,
      reviewsCount: 920,
      noiseLevel: "silent",
      noiseText: "صامت تماماً 🔇",
      noiseColor: "secondary",
      occupancyRate: 15,
      isRecommended: true,
      verified: true,
      openingHours: "الإثنين - السبت: 9:00 ص - 10:00 م (الأحد مغلق)",
      isOpenNow: true,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ithra+Library+Dhahran",
      mainImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
      ],
      tablePhotos: [
        { title: "أفخم صالة قراءة صامتة بالشرقية مجهزة بأحدث التقنيات", url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" }
      ],
      menu: [
        { name: "قهوة مقطرة إثراء", price: "15 ريال", desc: "قهوة اختيارات خاصة" },
        { name: "شاي ومشروبات ساخنة", price: "10 ريال", desc: "متوفرة بمقهى المكتبة" }
      ],
      description: "مكتبة إثراء بالظهران تُعد من أجمل وأهدأ المكتبات بالمملكة. 4 طوابق مخصصة بالكامل للهدوء والمذاكرة والتركيز.",
      amenities: [
        { icon: "volume_off", name: "هدوء وصمت تام", desc: "عزل صوتي متطور" },
        { icon: "wifi", name: "إنترنت سريع جداً", desc: "مجاني للجميع" }
      ],
      coordinates: { lat: 26.305, lng: 50.122 },
      tablesFloorPlan: [
        { id: 1, number: "ITH-01", shape: "circle", cx: 100, cy: 100, r: 24, status: "available", zone: "طابق التأمل الصامت", hasPower: true, seats: 1 }
      ]
    }
  ],

  liveUpdates: [
    { id: "u1", venueName: "ام دي كافيه (بريدة - طريق الملك عبد الله)", text: "طاولات المذاكرة متوفرة وبأجواء هادئة ممتازة.", time: "منذ دقيقتين" },
    { id: "u2", venueName: "جومو كافيه (بريدة - طريق علي بن أبي طالب)", text: "أجواء نهارية هادئة جداً ورايقة للمذاكرة والمطالعة.", time: "منذ 6 دقائق" },
    { id: "u3", venueName: "كافيه أدهم (بريدة - طريق عثمان بن عفان)", text: "طاولات اللابتوب والعمل مجهزة ومتاحة بشغور ممتاز.", time: "منذ 12 دقيقة" },
    { id: "u4", venueName: "كافيه 80 (28 نوفمبر) (بريدة - حي النهضة)", text: "هدوء ممتاز وجلسات أنيقة مخصصة للمذاكرة بتركيز.", time: "منذ 20 دقيقة" }
  ]
};

// Saved Places List Initializer
if (!localStorage.getItem('focus_saved')) {
  localStorage.setItem('focus_saved', JSON.stringify(['v-bur-md', 'v-bur-jomo', 'v-bur-1']));
}
