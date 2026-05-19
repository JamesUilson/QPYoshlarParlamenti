"use client";

import { ALL_DISTRICTS } from "./districts-data";

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
  committee?: string;
  yoshlarGuruhi?: string;
  articles?: { id: string | number; title: string; image?: string }[];
}

export interface Committee {
  id: string;
  name: string;
  chair: string;
  description?: string;
  image?: string;
  membersCount?: number;
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

export interface KengashMember {
  id: string;
  name: string;
  position: string;
  image?: string;
  description?: string;
}

export interface RahbariyatMember {
  id: string;
  name: string;
  position: string;
  image?: string;
  description?: string;
  detailId?: string;
}

export interface ElectionDistrict {
  id: string;
  number: number;
  name: string;
  region: string;
  districts: string[];
  mahallas?: string[];
}

export interface FriendshipGroup {
  id: string;
  country: string;
  flag?: string;
  members: number;
  chair: string;
  image?: string;
  description: string;
  established?: string;
}

// Storage keys
const STORAGE_KEYS = {
  NEWS: "yp_news",
  EVENTS: "yp_events",
  MEMBERS: "yp_members",
  ARTICLES: "yp_articles",
  MEDIA: "yp_media",
  ADMIN_AUTH: "yp_admin_auth",
  KENGASH: "yp_kengash",
  RAHBARIYAT: "yp_rahbariyat",
  COMMITTEES: "yp_committees",
  DISTRICTS: "yp_districts",
  FRIENDSHIP_GROUPS: "yp_friendship_groups",
};

// Compress base64 image: resize to max 800px wide, quality 0.6
export const compressImageBase64 = (base64: string, maxWidth = 800, quality = 0.6): Promise<string> => {
  return new Promise((resolve) => {
    if (!base64 || !base64.startsWith("data:image")) { resolve(base64); return; }
    const img = new window.Image();
    img.onload = () => {
      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(base64); return; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
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
    } catch (error: any) {
      if (error?.name === "QuotaExceededError" || error?.code === 22) {
        console.warn(`localStorage quota exceeded for key: ${key}. Trying to save without images...`);
        try {
          // Strip base64 images from value to free up space
          const stripped = JSON.parse(JSON.stringify(value, (k, v) => {
            if (typeof v === "string" && v.startsWith("data:image")) return "";
            return v;
          }));
          localStorage.setItem(key, JSON.stringify(stripped));
        } catch (e2) {
          console.error(`Still failed to write to localStorage: ${key}`, e2);
        }
      } else {
        console.error(`Error writing to localStorage: ${key}`, error);
      }
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

// Kengash functions
export const getKengash = (): KengashMember[] => safeStorage.get(STORAGE_KEYS.KENGASH, []);

export const addKengashMember = (m: Omit<KengashMember, "id">): KengashMember => {
  const list = getKengash();
  const item = { ...m, id: generateId() };
  safeStorage.set(STORAGE_KEYS.KENGASH, [item, ...list]);
  return item;
};

export const updateKengashMember = (id: string, updates: Partial<KengashMember>): KengashMember | null => {
  const list = getKengash();
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  safeStorage.set(STORAGE_KEYS.KENGASH, list);
  return list[idx];
};

export const deleteKengashMember = (id: string): boolean => {
  const list = getKengash();
  const filtered = list.filter(x => x.id !== id);
  if (filtered.length === list.length) return false;
  safeStorage.set(STORAGE_KEYS.KENGASH, filtered);
  return true;
};

// Rahbariyat functions
export const getRahbariyat = (): RahbariyatMember[] => safeStorage.get(STORAGE_KEYS.RAHBARIYAT, []);

export const addRahbariyatMember = (m: Omit<RahbariyatMember, "id">): RahbariyatMember => {
  const list = getRahbariyat();
  const item = { ...m, id: generateId() };
  safeStorage.set(STORAGE_KEYS.RAHBARIYAT, [item, ...list]);
  return item;
};

export const updateRahbariyatMember = (id: string, updates: Partial<RahbariyatMember>): RahbariyatMember | null => {
  const list = getRahbariyat();
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  safeStorage.set(STORAGE_KEYS.RAHBARIYAT, list);
  return list[idx];
};

export const deleteRahbariyatMember = (id: string): boolean => {
  const list = getRahbariyat();
  const filtered = list.filter(x => x.id !== id);
  if (filtered.length === list.length) return false;
  safeStorage.set(STORAGE_KEYS.RAHBARIYAT, filtered);
  return true;
};

// Committee functions
export const getCommittees = (): Committee[] => safeStorage.get(STORAGE_KEYS.COMMITTEES, []);

export const addCommittee = (c: Omit<Committee, "id">): Committee => {
  const list = getCommittees();
  const item = { ...c, id: generateId() };
  safeStorage.set(STORAGE_KEYS.COMMITTEES, [...list, item]);
  return item;
};

export const updateCommittee = (id: string, updates: Partial<Committee>): Committee | null => {
  const list = getCommittees();
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  safeStorage.set(STORAGE_KEYS.COMMITTEES, list);
  return list[idx];
};

export const deleteCommittee = (id: string): boolean => {
  const list = getCommittees();
  const filtered = list.filter(x => x.id !== id);
  if (filtered.length === list.length) return false;
  safeStorage.set(STORAGE_KEYS.COMMITTEES, filtered);
  return true;
};

// Friendship Group functions
export const getFriendshipGroups = (): FriendshipGroup[] => safeStorage.get(STORAGE_KEYS.FRIENDSHIP_GROUPS, []);

export const getFriendshipGroupById = (id: string): FriendshipGroup | null => {
  return getFriendshipGroups().find(g => g.id === id) || null;
};

export const addFriendshipGroup = (g: Omit<FriendshipGroup, "id">): FriendshipGroup => {
  const list = getFriendshipGroups();
  const item = { ...g, id: generateId() };
  safeStorage.set(STORAGE_KEYS.FRIENDSHIP_GROUPS, [...list, item]);
  return item;
};

export const updateFriendshipGroup = (id: string, updates: Partial<FriendshipGroup>): FriendshipGroup | null => {
  const list = getFriendshipGroups();
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  safeStorage.set(STORAGE_KEYS.FRIENDSHIP_GROUPS, list);
  return list[idx];
};

export const deleteFriendshipGroup = (id: string): boolean => {
  const list = getFriendshipGroups();
  const filtered = list.filter(x => x.id !== id);
  if (filtered.length === list.length) return false;
  safeStorage.set(STORAGE_KEYS.FRIENDSHIP_GROUPS, filtered);
  return true;
};

// Election District functions
export const getDistricts = (): ElectionDistrict[] => safeStorage.get(STORAGE_KEYS.DISTRICTS, []);

export const getDistrictByNumber = (num: number): ElectionDistrict | null => {
  const list = getDistricts();
  return list.find(d => d.number === num) || null;
};

export const getDistrictByName = (name: string): ElectionDistrict | null => {
  const list = getDistricts();
  return list.find(d => d.name === name || name.includes(d.number.toString())) || null;
};

export const addDistrict = (d: Omit<ElectionDistrict, "id">): ElectionDistrict => {
  const list = getDistricts();
  const item = { ...d, id: generateId() };
  safeStorage.set(STORAGE_KEYS.DISTRICTS, [...list, item]);
  return item;
};

export const updateDistrict = (id: string, updates: Partial<ElectionDistrict>): ElectionDistrict | null => {
  const list = getDistricts();
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  safeStorage.set(STORAGE_KEYS.DISTRICTS, list);
  return list[idx];
};

export const deleteDistrict = (id: string): boolean => {
  const list = getDistricts();
  const filtered = list.filter(x => x.id !== id);
  if (filtered.length === list.length) return false;
  safeStorage.set(STORAGE_KEYS.DISTRICTS, filtered);
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
  
  // Add sample news (skip duplicates by title)
  const existingTitles = new Set(getNews().map(n => n.title));
  if (getNews().length < 12) {
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
      {
        title: "Yoshlar parlamenti a'zolari qonun ijodkorligi bo'yicha malaka oshirdi",
        date: "05.02.2025",
        time: "10:00",
        image: "/images/media/IMG_3875.JPG",
        description: "Yoshlar parlamenti a'zolari qonun loyihalarini tayyorlash va muhokama qilish bo'yicha maxsus treningda ishtirok etdi.",
        location: "Toshkent",
        category: "Yoshlar parlamenti",
      },
      {
        title: "Xalqaro yoshlar forumida Yoshlar parlamenti delegatsiyasi ishtirok etdi",
        date: "03.02.2025",
        time: "09:00",
        image: "/images/media/IMG_3997.JPG",
        description: "O'zbekiston Yoshlar parlamenti delegatsiyasi Markaziy Osiyo yoshlar forumida qatnashib, ikki tomonlama hamkorlik masalalarini muhokama qildi.",
        location: "Toshkent",
        category: "Xalqaro aloqalar",
      },
      {
        title: "Yoshlar tadbirkorligini qo'llab-quvvatlash dasturi taqdim etildi",
        date: "01.02.2025",
        time: "14:00",
        image: "/images/media/IMG_3998.JPG",
        description: "Yoshlar parlamenti tomonidan yosh tadbirkorlarni moliyaviy va huquqiy qo'llab-quvvatlash bo'yicha yangi dastur taqdim etildi.",
        location: "Toshkent",
        category: "Yoshlar parlamenti",
      },
      {
        title: "Digitalizatsiya va yoshlar: yangi imkoniyatlar muhokama qilindi",
        date: "28.01.2025",
        time: "11:00",
        image: "/images/media/IMG_3999.JPG",
        description: "Yoshlar parlamenti raqamli iqtisodiyot va yoshlar uchun IT sohasidagi imkoniyatlar bo'yicha maxsus yig'ilish o'tkazdi.",
        location: "Toshkent",
        category: "Innovatsiya",
      },
      {
        title: "Ekologik madaniyatni shakllantirish bo'yicha aksiya o'tkazildi",
        date: "25.01.2025",
        time: "09:00",
        image: "/images/media/IMG_8069.JPG",
        description: "Yoshlar parlamenti a'zolari barcha viloyatlarda ekologik aksiyalar o'tkazib, ko'chatlar ekdi va muhit tozaligiga e'tibor qaratdi.",
        location: "Barcha viloyatlar",
        category: "Ekologiya",
      },
    ];
    sampleNews.filter(n => !existingTitles.has(n.title)).forEach(news => addNews(news));
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

  if (getCommittees().length === 0) {
    const committeeData: Omit<Committee, "id">[] = [
      { name: "Ta'lim, fan va yoshlar siyosati qo'mitasi", chair: "Xolmo'minov Sherzod", description: "Ta'lim, fan va yoshlar siyosati sohasidagi qonun loyihalarini ishlab chiqish va muhokama qilish bilan shug'ullanadi.", membersCount: 18 },
      { name: "Iqtisodiyot va tadbirkorlik qo'mitasi", chair: "Nazarov Bobur", description: "Iqtisodiyot va tadbirkorlik sohasidagi qonun loyihalarini ishlab chiqish va muhokama qilish bilan shug'ullanadi.", membersCount: 15 },
      { name: "Huquq va tartib-intizom qo'mitasi", chair: "Rahimova Dilnoza", description: "Huquq va tartib-intizom sohasidagi qonun loyihalarini ko'rib chiqadi.", membersCount: 14 },
      { name: "Ijtimoiy siyosat va sog'liqni saqlash qo'mitasi", chair: "Yusupova Maftuna", description: "Ijtimoiy siyosat va sog'liqni saqlash sohasidagi masalalarni ko'rib chiqadi.", membersCount: 16 },
      { name: "Madaniyat, sport va turizm qo'mitasi", chair: "Xasanov Jahongir", description: "Madaniyat, sport va turizm sohasidagi qonun loyihalarini muhokama qiladi.", membersCount: 13 },
      { name: "Atrof-muhit va ekologiya qo'mitasi", chair: "Toshmatova Zulfiya", description: "Atrof-muhit va ekologiya sohasidagi qonunchilikni takomillashtirish bilan shug'ullanadi.", membersCount: 12 },
      { name: "Tashqi aloqalar va parlament diplomatiyasi qo'mitasi", chair: "Mirzayev Asilbek", description: "Xalqaro hamkorlik va parlament diplomatiyasi masalalarini ko'rib chiqadi.", membersCount: 11 },
      { name: "Axborot texnologiyalari va innovatsiyalar qo'mitasi", chair: "Qodirov Ulugbek", description: "Axborot texnologiyalari va innovatsiyalar sohasidagi qonunchilikni rivojlantiradi.", membersCount: 14 },
    ];
    committeeData.forEach(c => addCommittee(c));
  }

  if (getFriendshipGroups().length === 0) {
    const groups: Omit<FriendshipGroup, "id">[] = [
      { country: "Rossiya", members: 15, chair: "Alisher Karimov", description: "O'zbekiston-Rossiya do'stlik guruhi Rossiya Federatsiyasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish, tajriba almashish, qo'shma loyihalarni amalga oshirish bilan shug'ullanadi.", established: "2019" },
      { country: "Turkiya", members: 12, chair: "Malika Rahimova", description: "O'zbekiston-Turkiya do'stlik guruhi Turkiya Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish va tajriba almashish bilan shug'ullanadi.", established: "2019" },
      { country: "Xitoy", members: 10, chair: "Bobur Toshmatov", description: "O'zbekiston-Xitoy do'stlik guruhi Xitoy Xalq Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish bilan shug'ullanadi.", established: "2020" },
      { country: "Koreya", members: 8, chair: "Dilshod Ahmedov", description: "O'zbekiston-Koreya do'stlik guruhi Koreya Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish bilan shug'ullanadi.", established: "2020" },
      { country: "Germaniya", members: 7, chair: "Nilufar Karimova", description: "O'zbekiston-Germaniya do'stlik guruhi Germaniya Federativ Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish bilan shug'ullanadi.", established: "2021" },
      { country: "Fransiya", members: 6, chair: "Jahongir Rasulov", description: "O'zbekiston-Fransiya do'stlik guruhi Fransiya Respublikasi yoshlar tashkilotlari bilan hamkorlikni rivojlantirish bilan shug'ullanadi.", established: "2021" },
    ];
    groups.forEach(g => addFriendshipGroup(g));
  }

  // Force reset if district count is wrong (old data had 135, correct is 75)
  const existingDistricts = getDistricts();
  if (existingDistricts.length !== ALL_DISTRICTS.length) {
    safeStorage.set(STORAGE_KEYS.DISTRICTS, []);
    ALL_DISTRICTS.forEach(d => addDistrict(d));
  }

  if (getKengash().length === 0) {
    const kengashData: Omit<KengashMember, "id">[] = [
      { name: "Sobitov Otabekxo'ja Yo'ldoshovich", position: "Yoshlar parlamenti raisi", image: "/images/deputatlar/photo_2025-05-03_20-38-24.jpg", description: "Yoshlar parlamenti raisi, uchinchi chaqiriq" },
      { name: "Axadova Husnora Akbar qizi", position: "Yoshlar parlamenti rais o'rinbosari", image: "/images/deputatlar/image_2025-05-03_19-34-15.png", description: "Yoshlar parlamenti rais o'rinbosari" },
      { name: "Suyarov Komiljon Sattarovich", position: "Rais o'rinbosari, O'zLiDeP yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-35-29.png", description: "O'zbekiston Liberal demokratik partiyasi yoshlar guruhi rahbari" },
      { name: "Murodov Nodir Oybek o'g'li", position: "Rais o'rinbosari, Milliy tiklanish yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-34-28.png", description: "O'zbekiston Milliy tiklanish demokratik partiyasi yoshlar guruhi rahbari" },
      { name: "Adilova Farzona Alisher qizi", position: "Rais o'rinbosari, Adolat partiyasi yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-34-38.png", description: "O'zbekiston Adolat sotsial demokratik partiyasi yoshlar guruhi rahbari" },
      { name: "O'ktamov Shoxruxbek Ulug'bek o'g'li", position: "Rais o'rinbosari, XDP yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-35-18.png", description: "O'zbekiston Xalq demokratik partiyasi yoshlar guruhi rahbari" },
      { name: "Ergash Moxinurxon Odilxon qizi", position: "Rais o'rinbosari, Ekologik partiya yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-34-53.png", description: "O'zbekiston Ekologik partiyasi yoshlar guruhi rahbari" },
    ];
    kengashData.forEach(m => addKengashMember(m));
  }

  if (getRahbariyat().length === 0) {
    const rahbariyatData: Omit<RahbariyatMember, "id">[] = [
      { name: "Sobitov Otabekxo'ja Yo'ldoshovich", position: "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi huzuridagi Yoshlar parlamentining Spikeri", image: "/images/deputatlar/photo_2025-05-03_20-38-24.jpg", description: "Uchinchi chaqiriq Yoshlar parlamenti Spikeri. 2025-yil 6-fevral kuni saylangan." },
      { name: "Axadova Husnora Akbar qizi", position: "Yoshlar parlamenti rais o'rinbosari", image: "/images/deputatlar/image_2025-05-03_19-34-15.png", description: "Yoshlar parlamenti rais o'rinbosari vazifasini bajaradi." },
      { name: "Suyarov Komiljon Sattarovich", position: "Yoshlar parlamenti rais o'rinbosari, O'zLiDeP yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-35-29.png", description: "O'zbekiston Liberal demokratik partiyasi yoshlar guruhi rahbari." },
      { name: "Murodov Nodir Oybek o'g'li", position: "Yoshlar parlamenti rais o'rinbosari, Milliy tiklanish yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-34-28.png", description: "O'zbekiston Milliy tiklanish demokratik partiyasi yoshlar guruhi rahbari." },
      { name: "Adilova Farzona Alisher qizi", position: "Yoshlar parlamenti rais o'rinbosari, Adolat partiyasi yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-34-38.png", description: "O'zbekiston Adolat sotsial demokratik partiyasi yoshlar guruhi rahbari." },
      { name: "O'ktamov Shoxruxbek Ulug'bek o'g'li", position: "Yoshlar parlamenti rais o'rinbosari, XDP yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-35-18.png", description: "O'zbekiston Xalq demokratik partiyasi yoshlar guruhi rahbari." },
      { name: "Ergash Moxinurxon Odilxon qizi", position: "Yoshlar parlamenti rais o'rinbosari, Ekologik partiya yoshlar guruhi rahbari", image: "/images/deputatlar/image_2025-05-03_19-34-53.png", description: "O'zbekiston Ekologik partiyasi yoshlar guruhi rahbari." },
    ];
    rahbariyatData.forEach(m => addRahbariyatMember(m));
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
