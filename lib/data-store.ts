"use client";

// Data types
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
  description: string;
  location: string;
  category: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
  category: string;
  image?: string;
}

export interface Member {
  id: string;
  name: string;
  region: string;
  image?: string;
  fraction: string;
  position?: string;
  birthYear?: string;
  birthPlace?: string;
  nationality?: string;
  education?: string;
  university?: string;
  specialization?: string;
  degree?: string;
  languages?: string;
  email?: string;
  articles?: { id: string | number; title: string; image?: string }[];
}

export interface Article {
  id: string;
  title: string;
  date: string;
  author: string;
  position: string;
  image: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  date: string;
  image: string;
  type: "photo" | "video";
  duration?: string;
}

// Storage keys
const STORAGE_KEYS = {
  NEWS: "yp_news",
  EVENTS: "yp_events",
  MEMBERS: "yp_members",
  ARTICLES: "yp_articles",
  MEDIA: "yp_media",
  ADMIN_AUTH: "yp_admin_auth",
};

// Helper to safely access localStorage
const safeStorage = {
  get: (key: string, defaultValue: any = null) => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },
  set: (key: string, value: any) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  },
  remove: (key: string) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// News functions
export const getNews = (): NewsItem[] => {
  return safeStorage.get(STORAGE_KEYS.NEWS, []);
};

export const addNews = (news: Omit<NewsItem, "id">): NewsItem => {
  const newsList = getNews();
  const newItem = { ...news, id: generateId() };
  safeStorage.set(STORAGE_KEYS.NEWS, [newItem, ...newsList]);
  return newItem;
};

export const updateNews = (id: string, updates: Partial<NewsItem>): NewsItem | null => {
  const newsList = getNews();
  const index = newsList.findIndex((item) => item.id === id);
  if (index === -1) return null;
  
  const updated = { ...newsList[index], ...updates };
  newsList[index] = updated;
  safeStorage.set(STORAGE_KEYS.NEWS, newsList);
  return updated;
};

export const deleteNews = (id: string): boolean => {
  const newsList = getNews();
  const filtered = newsList.filter((item) => item.id !== id);
  if (filtered.length === newsList.length) return false;
  safeStorage.set(STORAGE_KEYS.NEWS, filtered);
  return true;
};

export const getNewsById = (id: string): NewsItem | null => {
  const newsList = getNews();
  return newsList.find((item) => item.id === id) || null;
};

// Events functions
export const getEvents = (): EventItem[] => {
  return safeStorage.get(STORAGE_KEYS.EVENTS, []);
};

export const addEvent = (event: Omit<EventItem, "id">): EventItem => {
  const events = getEvents();
  const newEvent = { ...event, id: generateId() };
  safeStorage.set(STORAGE_KEYS.EVENTS, [newEvent, ...events]);
  return newEvent;
};

export const updateEvent = (id: string, updates: Partial<EventItem>): EventItem | null => {
  const events = getEvents();
  const index = events.findIndex((item) => item.id === id);
  if (index === -1) return null;
  
  const updated = { ...events[index], ...updates };
  events[index] = updated;
  safeStorage.set(STORAGE_KEYS.EVENTS, events);
  return updated;
};

export const deleteEvent = (id: string): boolean => {
  const events = getEvents();
  const filtered = events.filter((item) => item.id !== id);
  if (filtered.length === events.length) return false;
  safeStorage.set(STORAGE_KEYS.EVENTS, filtered);
  return true;
};

export const getEventById = (id: string): EventItem | null => {
  const events = getEvents();
  return events.find((item) => item.id === id) || null;
};

// Members functions
export const getMembers = (): Member[] => {
  return safeStorage.get(STORAGE_KEYS.MEMBERS, []);
};

export const addMember = (member: Omit<Member, "id">): Member => {
  const members = getMembers();
  const newMember = { ...member, id: generateId() };
  safeStorage.set(STORAGE_KEYS.MEMBERS, [newMember, ...members]);
  return newMember;
};

export const updateMember = (id: string, updates: Partial<Member>): Member | null => {
  const members = getMembers();
  const index = members.findIndex((item) => item.id === id);
  if (index === -1) return null;
  
  const updated = { ...members[index], ...updates };
  members[index] = updated;
  safeStorage.set(STORAGE_KEYS.MEMBERS, members);
  return updated;
};

export const deleteMember = (id: string): boolean => {
  const members = getMembers();
  const filtered = members.filter((item) => item.id !== id);
  if (filtered.length === members.length) return false;
  safeStorage.set(STORAGE_KEYS.MEMBERS, filtered);
  return true;
};

export const getMemberById = (id: string): Member | null => {
  const members = getMembers();
  return members.find((item) => item.id === id) || null;
};

export const getArticleById = (id: string): Article | null => {
  const articles = getArticles();
  return articles.find((item) => item.id === id) || null;
};

// Articles functions
export const getArticles = (): Article[] => {
  return safeStorage.get(STORAGE_KEYS.ARTICLES, []);
};

export const addArticle = (article: Omit<Article, "id">): Article => {
  const articles = getArticles();
  const newArticle = { ...article, id: generateId() };
  safeStorage.set(STORAGE_KEYS.ARTICLES, [newArticle, ...articles]);
  return newArticle;
};

export const updateArticle = (id: string, updates: Partial<Article>): Article | null => {
  const articles = getArticles();
  const index = articles.findIndex((item) => item.id === id);
  if (index === -1) return null;
  
  const updated = { ...articles[index], ...updates };
  articles[index] = updated;
  safeStorage.set(STORAGE_KEYS.ARTICLES, articles);
  return updated;
};

export const deleteArticle = (id: string): boolean => {
  const articles = getArticles();
  const filtered = articles.filter((item) => item.id !== id);
  if (filtered.length === articles.length) return false;
  safeStorage.set(STORAGE_KEYS.ARTICLES, filtered);
  return true;
};

// Media functions
export const getMedia = (): MediaItem[] => {
  return safeStorage.get(STORAGE_KEYS.MEDIA, []);
};

export const addMedia = (media: Omit<MediaItem, "id">): MediaItem => {
  const mediaList = getMedia();
  const newMedia = { ...media, id: generateId() };
  safeStorage.set(STORAGE_KEYS.MEDIA, [newMedia, ...mediaList]);
  return newMedia;
};

export const updateMedia = (id: string, updates: Partial<MediaItem>): MediaItem | null => {
  const mediaList = getMedia();
  const index = mediaList.findIndex((item) => item.id === id);
  if (index === -1) return null;
  
  const updated = { ...mediaList[index], ...updates };
  mediaList[index] = updated;
  safeStorage.set(STORAGE_KEYS.MEDIA, mediaList);
  return updated;
};

export const deleteMedia = (id: string): boolean => {
  const mediaList = getMedia();
  const filtered = mediaList.filter((item) => item.id !== id);
  if (filtered.length === mediaList.length) return false;
  safeStorage.set(STORAGE_KEYS.MEDIA, filtered);
  return true;
};

// Admin authentication (simple password-based)
const ADMIN_PASSWORD = "yoshlar2025"; // Default password

export const loginAdmin = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    safeStorage.set(STORAGE_KEYS.ADMIN_AUTH, { 
      isLoggedIn: true, 
      timestamp: Date.now() 
    });
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  safeStorage.remove(STORAGE_KEYS.ADMIN_AUTH);
};

export const isAdminLoggedIn = (): boolean => {
  const auth = safeStorage.get(STORAGE_KEYS.ADMIN_AUTH);
  if (!auth || !auth.isLoggedIn) return false;
  
  // Check if session expired (24 hours)
  const sessionDuration = 24 * 60 * 60 * 1000;
  if (Date.now() - auth.timestamp > sessionDuration) {
    logoutAdmin();
    return false;
  }
  
  return true;
};

// Initialize with sample data if empty
export const initializeData = () => {
  if (typeof window === "undefined") return;
  
  // Only initialize if no data exists
  if (getNews().length === 0) {
    const sampleNews: Omit<NewsItem, "id">[] = [
      {
        title: "Buxoro davlat universitetida yoshlar uchun yaratilgan sharoitlar o'rganildi",
        date: "19.02.2025",
        time: "15:00",
        image: "/images/media/IMG_3950.JPG",
        description: "Oliy Majlis Qonunchilik palatasi huzuridagi Yoshlar parlamenti raisi Otabek Sobitov Buxoro davlat universitetiga tashrif buyurdi. Tashrif davomida u universitet faoliyati, ta'lim sifati, ilmiy izlanishlar va talabalar uchun yaratilgan imkoniyatlar bilan yaqindan tanishdi.",
        location: "Oliy Majlis Qonunchilik palatasi",
        category: "Qonunchilik palatasi",
      },
      {
        title: "Yoshlar parlamenti Raisi talabalar bilan ochiq muloqotda ishtirok etdi",
        date: "18.02.2025",
        time: "11:00",
        image: "/images/media/IMG_8125.JPG",
        description: "Buxoro davlat universitetida faol va tashabbuskor talabalar bilan ochiq muloqot tashkil etildi. Uchrashuv davomida yoshlarning ilm-fanga bo'lgan qiziqishi, jamiyatdagi o'rni va ularning tashabbuslarini qo'llab-quvvatlash masalalari muhokama qilindi.",
        location: "Oliy Majlis Qonunchilik palatasi",
        category: "Qonunchilik palatasi",
      },
      {
        title: "Yoshlar parlamenti Raisi Kogon tumanidagi 1-sonli jazoni ijro etish muassasida mahkumlar bilan suhbatlashildi",
        date: "13.02.2025",
        time: "11:00",
        image: "/images/media/IMG_3998.JPG",
        description: "Yoshlar parlamenti Raisi Kogon tumanidagi 1-sonli jazoni ijro etish muassasi faoliyati bilan yaqindan tanishdi. Muassasada maxkumlarni kasb-hunar o'rganishlari, xorijiy tillarni o'zlashitirish, yaratilgan shart-sharoitlar bilan tanishilib.",
        location: "Oliy Majlis Qonunchilik palatasi",
        category: "Yoshlar parlamenti",
      },
      {
        title: "Xorazm - dunyo taraqqiyotining beshigi, dunyo sivilizatsiyasi va madaniyatiga bebaho hissa qo'shgan Sharq gavhari",
        date: "11.02.2025",
        time: "10:00",
        image: "/images/news/photo_2025-05-06_00-47-28.jpg",
        description: "Har oyning oxirgi haftasida xalq bilan muloqot qilish, odamlarni o'ylantirayotgan masalalarga yechim topish maqsadida hududlarda bo'lib, saylovchilar bilan muloqotlar o'tkazamiz. Ochig'i, har gal borganimizda biror o'zgarish yoki yangilanishning guvohi bo'lamiz.",
        location: "Oliy Majlis Qonunchilik palatasi",
        category: "Xalqaro aloqalar",
      },
      {
        title: "Prezidentimiz Shavkat Mirziyoyevning Xorazm viloyatiga tashrifi tarixiy voqea bo'ldi",
        date: "10.02.2025",
        time: "14:00",
        image: "/images/news/photo_2025-05-06_00-47-23.jpg",
        description: "Davlatimiz rahbarining 'Xorazm – shonli tariximiz bilan yangi islohotlarimiz tutashgan chorraha' deya ta'kidlagan so'zlari bugungi kundagi o'zgarishlarning voha ahli hayotida naqadar muhim o'rin tutganini yaqqol ko'rsatdi.",
        location: "Oliy Majlis Qonunchilik palatasi",
        category: "Yoshlar parlamenti",
      },
      {
        title: "Turistik imkoniyatlar — voha ravnaqida muhim bosqich",
        date: "08.02.2025",
        time: "09:00",
        image: "/images/news/photo_2025-05-06_00-47-13.jpg",
        description: "Davlatimiz rahbari Xorazm viloyatiga tashrifini bugungi kunda soatiga atigi 400 nafar yo'lovchiga xizmat ko'rsata olishi mumkin bo'lgan Urganch xalqaro aeroportini modernizatsiya qilish loyihalari bilan tanishishdan boshladi.",
        location: "Oliy Majlis Qonunchilik palatasi",
        category: "Xalqaro aloqalar",
      },
    ];
    sampleNews.forEach(news => addNews(news));
  }
  
  if (getEvents().length === 0) {
    const sampleEvents: Omit<EventItem, "id">[] = [
      {
        title: "Sudga qadar ish yuritish bosqichida huquqlarni ta'minlash",
        date: "22.02.2025",
        time: "13:40",
        description: "Oliy Majlis Qonunchilik palatasidagi O'zLiDeP fraksiyasi hamda Xalqaro ishlar qo'mitasining go'shma yig'ilishi.",
        location: "Oliy Majlis Qonunchilik palatasi",
        category: "Yalpi majlislar",
      },
      {
        title: "Qonunchilik palatasi 1-yalpi majlisi",
        date: "16.05.2025",
        time: "10:00",
        description: "Majlisda quyidagi masalalar ko'rib chiqiladi: qonun loyihalarini muhokama qilish, davlat organlari rahbarlarining hisobotlarini eshitish, parlament so'rovlarini yuborish.",
        location: "Qonunchilik palatasi majlislar zali",
        category: "Yalpi majlislar",
      },
      {
        title: "Qonunchilik palatasi 2-yalpi majlisi",
        date: "17.05.2025",
        time: "10:00",
        description: "Majlisda quyidagi masalalar ko'rib chiqiladi: qonun loyihalarini muhokama qilish, davlat organlari rahbarlarining hisobotlarini eshitish.",
        location: "Qonunchilik palatasi majlislar zali",
        category: "Yalpi majlislar",
      },
      {
        title: "Siyosiy partiyalar yoshlar guruhlari yig'ilishi",
        date: "20.02.2025",
        time: "14:00",
        description: "Siyosiy partiyalarning yoshlar guruhlari yig'ilishi bo'lib o'tadi.",
        location: "Oliy Majlis binosi",
        category: "Siyosiy partiyalar",
      },
      {
        title: "Ta'lim va fan qo'mitasi yig'ilishi",
        date: "25.02.2025",
        time: "10:00",
        description: "Ta'lim va fan qo'mitasining navbatdagi yig'ilishi.",
        location: "Qo'mita majlislar zali",
        category: "Qo'mitalar yig'ilishi",
      },
    ];
    sampleEvents.forEach(event => addEvent(event));
  }

  if (getMembers().length === 0) {
    const sampleMembers: Omit<Member, "id">[] = [
      { name: "Jiyenbayev Berdakh Kalbay o'g'li", region: "1-Qoraqalpog'iston Respublikasi saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/1. Jiyenbayev Berdakh Kalbay o'g'li.JPG", fraction: "O'zlidep" },
      { name: "Khojanova Gul'banu Jenis qizi", region: "2-Qoraqalpog'iston Respublikasi saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/2. Khojanova Gul'banu Jenis qizi.JPG", fraction: "O'zlidep" },
      { name: "Bazarbayeva Shakhnoza Sultonbayevna", region: "3-Qoraqalpog'iston Respublikasi saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/3. Bazarbayeva Shakhnoza Sultonbayevna.JPG", fraction: "O'zlidep" },
      { name: "Radjapov Babur Gulamjanovich", region: "4-Qoraqalpog'iston Respublikasi saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/4. Radjapov Babur Gulamjanovich.jpg", fraction: "O'zlidep" },
      { name: "Nurullo Rasulov Ilxomjon o'g'li", region: "5-Andijon viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/5.Nurullo Rasulov Ilxomjon o'g'li.jpg", fraction: "O'zlidep" },
      { name: "Vohidov Shohjahon Abduvosi o'g'li", region: "6-Andijon viloyati saylov okrugi", image: "", fraction: "O'zlidep" },
      { name: "Abdullayev Jaxongir Qaxramonjon", region: "7-Andijon viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/7.Abdullayev Jaxongir Qaxramonjon.jpg", fraction: "O'zlidep" },
      { name: "Maxammadaliyev Asadbek Mamarasul o'g'li", region: "8-Andijon viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/8.Maxammadaliyev Asadbek Mamarasul o'g'li.jpg", fraction: "O'zlidep" },
      { name: "Mamirjonova Safinozi Xursandbek qizi", region: "9-Andijon viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/9.Mamirjonova Safinozi Xursandbek qizi.jpg", fraction: "O'zlidep" },
      { name: "Abdurahmonov Asadbek Oybek o'g'li", region: "10-Andijon viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/10. AbdurahmonovAsadbek Oybek o'g'li.JPG", fraction: "O'zlidep" },
      { name: "Azizova Visola Behzod qizi", region: "11-Andijon viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/11.Azizova visola.jpg", fraction: "O'zlidep" },
      { name: "Karimov Bexruz Baxtiyorovich", region: "12-Buxoro viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/12. Karimov Bexruz Baxtiyorovich.jpg", fraction: "O'zlidep" },
      { name: "Bobojonov Saidjon O'tkirovich Sayidjon", region: "13-Buxoro viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/13.Bobojonov Sayidjon.jpg", fraction: "Eco" },
      { name: "Fayziyeva Fotima Toxir qizi", region: "14-Buxoro viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/14.Fayziyeva Fotima Toxir qizi.JPG", fraction: "Milliy tiklanish" },
      { name: "Zarifova Sagina Siddik qizi", region: "15-Buxoro viloyati saylov okrugi", image: "/images/yoshlar parlamenti azolari rasmi/1/15.Zarifova Sagina Siddik qizi.jpg", fraction: "Milliy tiklanish" },
    ];
    sampleMembers.forEach(member => addMember(member));
  }

  if (getArticles().length === 0) {
    const sampleArticles: Omit<Article, "id">[] = [
      { title: "Yoshlar parlamenti: kecha, bugun va ertaga", date: "15.02.2025", author: "Alisher Karimov", position: "Yoshlar parlamenti raisi", image: "/placeholder.svg?height=200&width=400&text=Article+1", description: "Ushbu maqolada Yoshlar parlamentining tashkil etilishi, bugungi kundagi faoliyati va kelajakdagi rejalari haqida so'z yuritiladi." },
      { title: "Yoshlar va qonun ijodkorligi", date: "10.02.2025", author: "Malika Rahimova", position: "Yoshlar parlamenti rais o'rinbosari", image: "/placeholder.svg?height=200&width=400&text=Article+2", description: "Ushbu maqolada yoshlarning qonun ijodkorligi jarayonidagi ishtiroki haqida so'z yuritiladi." },
      { title: "Yoshlar parlamenti va xalqaro hamkorlik", date: "05.02.2025", author: "Bobur Toshmatov", position: "Yoshlar parlamenti kotibi", image: "/placeholder.svg?height=200&width=400&text=Article+3", description: "Ushbu maqolada Yoshlar parlamentining xalqaro hamkorligi haqida so'z yuritiladi." },
      { title: "Yoshlar parlamenti qo'mitalari faoliyati", date: "01.02.2025", author: "Dilshod Ahmedov", position: "Ta'lim va fan qo'mitasi raisi", image: "/placeholder.svg?height=200&width=400&text=Article+4", description: "Ushbu maqolada Yoshlar parlamenti qo'mitalari faoliyati haqida so'z yuritiladi." },
      { title: "Yoshlar parlamenti va yoshlar bandligi", date: "25.01.2025", author: "Nilufar Karimova", position: "Madaniyat va sport qo'mitasi raisi", image: "/placeholder.svg?height=200&width=400&text=Article+5", description: "Ushbu maqolada yoshlar bandligi masalalari haqida so'z yuritiladi." },
      { title: "Yoshlar parlamenti va yoshlar tadbirkorligi", date: "20.01.2025", author: "Jahongir Rasulov", position: "Innovatsion rivojlanish qo'mitasi raisi", image: "/placeholder.svg?height=200&width=400&text=Article+6", description: "Ushbu maqolada yoshlar tadbirkorligi haqida so'z yuritiladi." },
    ];
    sampleArticles.forEach(article => addArticle(article));
  }

  if (getMedia().length === 0) {
    const sampleMedia: Omit<MediaItem, "id">[] = [
      { title: "Yoshlar parlamenti yalpi majlisi", date: "15.02.2025", image: "/images/media/IMG_3875.JPG", type: "photo" },
      { title: "Xalqaro delegatsiya bilan uchrashuv", date: "10.02.2025", image: "/images/media/IMG_3876.JPG", type: "photo" },
      { title: "Yoshlar parlamenti qo'mitalari yig'ilishi", date: "05.02.2025", image: "/images/media/IMG_3877.JPG", type: "photo" },
      { title: "Yoshlar parlamenti a'zolari bilan davra suhbati", date: "01.02.2025", image: "/images/media/IMG_3878.JPG", type: "photo" },
      { title: "Yoshlar parlamenti a'zolarining xorijiy mamlakatlarga tashrifi", date: "25.01.2025", image: "/images/media/IMG_3950.JPG", type: "photo" },
      { title: "Yoshlar parlamenti a'zolari bilan ochiq muloqot", date: "20.01.2025", image: "/images/media/IMG_3954.JPG", type: "photo" },
      { title: "Yoshlar parlamenti yalpi majlisi - video", date: "15.02.2025", image: "/images/media1.png", type: "video", duration: "1:30:25" },
      { title: "Xalqaro delegatsiya bilan uchrashuv - video", date: "10.02.2025", image: "/images/media/IMG_3955.JPG", type: "video", duration: "45:12" },
      { title: "Yoshlar parlamenti qo'mitalari yig'ilishi - video", date: "05.02.2025", image: "/images/media/IMG_3956.JPG", type: "video", duration: "1:15:40" },
      { title: "Yoshlar parlamenti a'zolari bilan davra suhbati - video", date: "01.02.2025", image: "/images/media/IMG_3996.JPG", type: "video", duration: "55:30" },
    ];
    sampleMedia.forEach(media => addMedia(media));
  }
};

// Visitor Statistics Types
export interface VisitorStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  lastVisit: string;
  pageViews: Record<string, number>;
}

// Get visitor stats
export const getVisitorStats = (): VisitorStats => {
  if (typeof window === "undefined") {
    return { totalVisits: 0, uniqueVisitors: 0, todayVisits: 0, lastVisit: "", pageViews: {} };
  }
  const stats = localStorage.getItem("yp_visitor_stats");
  if (!stats) {
    return { totalVisits: 0, uniqueVisitors: 0, todayVisits: 0, lastVisit: "", pageViews: {} };
  }
  return JSON.parse(stats);
};

// Track visit
export const trackVisit = (page: string) => {
  if (typeof window === "undefined") return;
  
  const today = new Date().toISOString().split('T')[0];
  const stats = getVisitorStats();
  
  // Check if this is a new day
  if (stats.lastVisit !== today) {
    stats.todayVisits = 0;
  }
  
  // Check if unique visitor (simple check using localStorage)
  const visitorId = localStorage.getItem("yp_visitor_id");
  if (!visitorId) {
    const newId = crypto.randomUUID();
    localStorage.setItem("yp_visitor_id", newId);
    stats.uniqueVisitors++;
  }
  
  stats.totalVisits++;
  stats.todayVisits++;
  stats.lastVisit = today;
  
  // Track page views
  if (!stats.pageViews[page]) {
    stats.pageViews[page] = 0;
  }
  stats.pageViews[page]++;
  
  localStorage.setItem("yp_visitor_stats", JSON.stringify(stats));
};

// Reset visitor stats (admin only)
export const resetVisitorStats = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("yp_visitor_stats");
};
