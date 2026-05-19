export interface DistrictSeed {
  number: number;
  name: string;
  region: string;
  districts: string[];
  mahallas?: string[];
}

const DISTRICT_1_MAHALLAS = [
  "Abay OFY", "Amir Temur MFY", "Beruniy OFY", "Biybazar OFY", "Birlik MFY", "Bunyodkor MFY", "Bo'ston MFY", "Guliston MFY", "Do'stlik MFY", "Do'stlik OFY",
  "Jayxun MFY", "Jumaniyazov MFY", "Ibn-Sino MFY", "Istiqlol MFY", "Qangshartal MFY", "Qiyot MFY", "Qizilqal'a OFY", "Markaziy MFY", "Maxtumquli OFY",
  "Mustaqillik MFY", "Navoiy MFY", "Navoiy OFY", "Navro'z MFY", "Nayman MFY", "Ozod OFY", "Oltinsoy OFY", "Palvash MFY", "Paxtakor MFY", "Sarkop OFY",
  "Tinchlik OFY", "To'qimachi MFY", "Turon MFY", "Xorazm MFY", "Shabboz OFY", "Shimom OFY", "Shobboz MFY", "Yangiobod MFY", "Chimboy choyxona MFY",
  "Xalqlar do'stligi MFY", "Botanika bog'i MFY", "Havo Yo'li MFY", "Aydin Yo'l MFY", "Shig'is MFY", "Shoirlar ovuli MFY", "Tinchlik MFY", "Sarbinoz MFY",
  "Tung'ish ko'nis MFY", "Qurilishchi MFY", "13-sonli Qoskol-2 MFY", "14-sonli Almazar MFY", "15-sonli Eli abat MFY", "16-sonli Darbent MFY",
  "17-sonli Bayterek MFY", "18-sonli Kebir ovul MFY", "19-sonli Kattagar MFY", "20-sonli Gone qala MFY", "21-sonli Taslaq-1 MFY", "22-sonli Taslaq-2 MFY",
  "23-sonli Qum ovul MFY", "24-sonli Jeke terek MFY", "25-sonli Turan MFY", "26-sonli Ko'k o'zak MFY", "27-sonli Temir jol MFY", "28-sonli Ornek MFY",
  "29-sonli Nur MFY", "30-sonli Qoskol-1 MFY", "31-sonli Qoskol-3 MFY", "32-sonli May ovul MFY", "33-sonli Qizil qum MFY", "34-sonli Jayhun MFY",
  "35-sonli Navro'z MFY", "36-sonli Nao'qan bag' MFY", "37-sonli Juvozchi MFY", "38-sonli Bes pobe MFY", "39-sonli Jiydeli boysin-1 MFY",
  "40-sonli Jiydeli baysin-2 MFY", "41-sonli Aq jag'is MFY", "42-sonli Samanbay-1 MFY", "43-sonli Samanbay-2 MFY", "44-sonli Qoratov MFY",
  "45-sonli Boz ovul MFY", "46-sonli Qutli qonis MFY", "47-sonli Qumbiz ovul MFY", "48-sonli Aq otao' MFY", "49-sonli Guzar MFY", "50-sonli Beket MFY",
  "51-sonli G'arezsizlik MFY", "52-sonli Nao'bahar MFY", "53-sonli AllaniYaz Qaharman MFY", "54-sonli Xojan ovul MFY",
  "Toktau MPJ", "Arbashi OFY", "Bakanshakli OFY", "Kerder OFY", "Krantau OFY", "Kutankul MFY", "Oqmangit PFY", "Oqterak MFY", "Samanbay OFY", "Takirkul OFY",
  "Qilichboy ovul FY tarkibidagi 'Besh ovul' MFY", "Qilichboy ovul FY tarkibidagi 'Tosh qal'a' MFY", "Qilichboy ovul FY tarkibidagi 'Yuqori qishloq' MFY",
  "Xalimbeg ovul fuqarolar yig'ini", "Xalimbeg ovul FY tarkibidagi 'AYoqchi' MFY", "Do'rman ovul fuqarolar yig'ini",
  "Durunki MFY", "Do'rman ovul FY tarkibidagi 'Bo'z solma' MFY", "Bo'z Yop ovul fuqarolar yig'ini", "Xitoy ovul fuqarolar yig'ini",
  "Xitoy ovul FY tarkibidagi 'Tor Yop' MFY", "Xitoy ovul FY tarkibidagi 'Namuna' MFY", "Kuyuk ko'pir ovul fuqarolar yig'ini",
  "Kuyuk ko'pir ovul FY tarkibidagi 'Qizilcholi' MFY", "Jumurtov shaharcha fuqarolar yig'ini", "Z.M.Bobur nomli ovul fuqarolar yig'ini",
  "Z.M.Bobur nomli ovul FY tarkibidagi 'Jumur ovul' MFY", "Oq oltin ovul fuqarolar yig'ini", "To'lqin ovul fuqarolar yig'ini",
  "Choyko'l ovul fuqarolar yig'ini", "Choyko'l ovul FY tarkibidagi 'Bosuv' MFY", "Qipchoq ovul fuqarolar yig'ini",
  "Qipchoq ovul FY tarkibidagi 'Daryo bo'yi' MFY", "Qipchoq ovul FY tarkibidagi 'Uyshin' MFY", "Qipchoq ovul FY tarkibidagi 'Besh tom' MFY",
  "Qangli ovul fuqarolar yig'ini", "Qangli ovul FY tarkibidagi 'Qum Yop' MFY", "Nazarxon ovul fuqarolar yig'ini",
  "A.Navoiy nomli MFY", "Chordara MFY", "Yangiobod MFY", "Beruniy nomli MFY", "Olmazor MFY", "Gulzor MFY", "Oybek nomli MFY", "Bo'ston MFY",
  "Qilichboy ovul FY tarkibidagi 'Xizr eli' MFY", "Do'rman ovul FY tarkibidagi 'Qoramon' MFY",
  "Kuyuk ko'pir ovul FY tarkibidagi 'O'zbekiston' MFY",
];

// Rasmiy manba: O'zbekiston Respublikasi Markaziy saylov komissiyasining
// 2024 yil 10 avgustdagi 1362-son qarori ilovasi (75 ta saylov okrugi)
export const ALL_DISTRICTS: DistrictSeed[] = [
  // Qoraqalpog'iston Respublikasi (1-4)
  { number: 1, name: "1 - Qoraqalpog'iston Respublikasi saylov okrugi", region: "Qoraqalpog'iston Respublikasi", districts: ["Nukus shahri (qisman)", "Amudaryo tumani", "Beruniy tumani (qisman)"], mahallas: DISTRICT_1_MAHALLAS },
  { number: 2, name: "2 - Qoraqalpog'iston Respublikasi saylov okrugi", region: "Qoraqalpog'iston Respublikasi", districts: ["To'rtko'l tumani", "Elliqqa'la tumani", "Beruniy tumani (qisman)"] },
  { number: 3, name: "3 - Qoraqalpog'iston Respublikasi saylov okrugi", region: "Qoraqalpog'iston Respublikasi", districts: ["Mo'ynoq tumani", "Qo'ng'irot tumani", "Qonliko'l tumani", "Shumanay tumani", "Xo'jayli tumani", "Taxiatosh tumani"] },
  { number: 4, name: "4 - Qoraqalpog'iston Respublikasi saylov okrugi", region: "Qoraqalpog'iston Respublikasi", districts: ["Taxtako'pir tumani", "Qorao'zak tumani", "Kegeyli tumani", "Bo'zatov tumani", "Chimboy tumani", "Nukus tumani", "Nukus shahri (qisman)"] },

  // Andijon viloyati (5-11)
  { number: 5, name: "5 - Andijon viloyati saylov okrugi", region: "Andijon viloyati", districts: ["Andijon shahri (to'liq)"] },
  { number: 6, name: "6 - Andijon viloyati saylov okrugi", region: "Andijon viloyati", districts: ["Oltinko'l tumani (to'liq)", "Andijon tumani (qisman)"] },
  { number: 7, name: "7 - Andijon viloyati saylov okrugi", region: "Andijon viloyati", districts: ["Asaka tumani (to'liq)", "Shahrixon tumani (qisman)"] },
  { number: 8, name: "8 - Andijon viloyati saylov okrugi", region: "Andijon viloyati", districts: ["Bo'ston tumani", "Ulug'nor tumani", "Baliqchi tumani", "Shahrixon tumani (qisman)"] },
  { number: 9, name: "9 - Andijon viloyati saylov okrugi", region: "Andijon viloyati", districts: ["Izboskan tumani", "Paxtaobod tumani"] },
  { number: 10, name: "10 - Andijon viloyati saylov okrugi", region: "Andijon viloyati", districts: ["Xo'jaobod tumani", "Buloqboshi tumani", "Marhamat tumani"] },
  { number: 11, name: "11 - Andijon viloyati saylov okrugi", region: "Andijon viloyati", districts: ["Jalaquduq tumani", "Qo'rg'ontepa tumani", "Xonobod shahri"] },

  // Buxoro viloyati (12-15)
  { number: 12, name: "12 - Buxoro viloyati saylov okrugi", region: "Buxoro viloyati", districts: ["Buxoro shahri", "Kogon shahri", "Kogon tumani", "Qorovulbozor tumani", "Buxoro tumani (qisman)"] },
  { number: 13, name: "13 - Buxoro viloyati saylov okrugi", region: "Buxoro viloyati", districts: ["Vobkent tumani", "Peshku tumani", "Romitan tumani", "Buxoro tumani (qisman)"] },
  { number: 14, name: "14 - Buxoro viloyati saylov okrugi", region: "Buxoro viloyati", districts: ["Jondor tumani", "Olot tumani", "Qorako'l tumani", "Buxoro tumani (qisman)"] },
  { number: 15, name: "15 - Buxoro viloyati saylov okrugi", region: "Buxoro viloyati", districts: ["G'ijduvon tumani", "Shofirkon tumani", "Buxoro tumani (qisman)"] },

  // Jizzax viloyati (16-18)
  { number: 16, name: "16 - Jizzax viloyati saylov okrugi", region: "Jizzax viloyati", districts: ["Jizzax shahri", "Sharof Rashidov tumani", "Zafarobod tumani"] },
  { number: 17, name: "17 - Jizzax viloyati saylov okrugi", region: "Jizzax viloyati", districts: ["G'allaorol tumani", "Mirzacho'l tumani", "Do'stlik tumani", "Baxmal tumani", "Arnasoy tumani", "Forish tumani"] },
  { number: 18, name: "18 - Jizzax viloyati saylov okrugi", region: "Jizzax viloyati", districts: ["Zarbdor tumani", "Paxtakor tumani", "Yangiobod tumani", "Zomin tumani"] },

  // Navoiy viloyati (19-21)
  { number: 19, name: "19 - Navoiy viloyati saylov okrugi", region: "Navoiy viloyati", districts: ["Navoiy shahri", "Karmana tumani"] },
  { number: 20, name: "20 - Navoiy viloyati saylov okrugi", region: "Navoiy viloyati", districts: ["Konimex tumani", "Zarafshon shahri", "Uchquduq tumani", "Tomdi tumani"] },
  { number: 21, name: "21 - Navoiy viloyati saylov okrugi", region: "Navoiy viloyati", districts: ["Xatirchi tumani", "G'ozg'on shahri", "Nurota tumani"] },

  // Namangan viloyati (22-27)
  { number: 22, name: "22 - Namangan viloyati saylov okrugi", region: "Namangan viloyati", districts: ["Namangan shahri (qisman)", "To'raqo'rg'on tumani"] },
  { number: 23, name: "23 - Namangan viloyati saylov okrugi", region: "Namangan viloyati", districts: ["Namangan shahri (qisman)", "Mingbuloq tumani", "Namangan tumani"] },
  { number: 24, name: "24 - Namangan viloyati saylov okrugi", region: "Namangan viloyati", districts: ["Namangan shahri (to'liq)", "Yangi Namangan tumani"] },
  { number: 25, name: "25 - Namangan viloyati saylov okrugi", region: "Namangan viloyati", districts: ["Chust tumani", "Pop tumani", "Chortoq tumani"] },
  { number: 26, name: "26 - Namangan viloyati saylov okrugi", region: "Namangan viloyati", districts: ["Kosonsoy tumani", "Norin tumani", "Uychi tumani"] },
  { number: 27, name: "27 - Namangan viloyati saylov okrugi", region: "Namangan viloyati", districts: ["Yangiqo'rg'on tumani", "Chortoq tumani (qisman)"] },

  // Samarqand viloyati (28-35)
  { number: 28, name: "28 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Samarqand shahri (to'liq)"] },
  { number: 29, name: "29 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Samarqand tumani (qisman)", "Toyloq tumani"] },
  { number: 30, name: "30 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Bulung'ur tumani", "Qo'shrabot tumani", "Samarqand tumani (qisman)"] },
  { number: 31, name: "31 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Narpay tumani", "Paxtachi tumani", "Kattaqo'rg'on shahri"] },
  { number: 32, name: "32 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Oqdaryo tumani", "Ishtixon tumani", "Jomboy tumani"] },
  { number: 33, name: "33 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Kattaqo'rg'on tumani", "Qo'shrabot tumani (qisman)"] },
  { number: 34, name: "34 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Payariq tumani", "Pastdarg'om tumani"] },
  { number: 35, name: "35 - Samarqand viloyati saylov okrugi", region: "Samarqand viloyati", districts: ["Urgut tumani"] },

  // Sirdaryo viloyati (36-37)
  { number: 36, name: "36 - Sirdaryo viloyati saylov okrugi", region: "Sirdaryo viloyati", districts: ["Guliston shahri", "Mirzaobod tumani", "Oqoltin tumani", "Sayxunobod tumani", "Sirdaryo tumani"] },
  { number: 37, name: "37 - Sirdaryo viloyati saylov okrugi", region: "Sirdaryo viloyati", districts: ["Boyovut tumani", "Shirin shahri", "Xovos tumani", "Yangiyer shahri"] },

  // Surxondaryo viloyati (38-43)
  { number: 38, name: "38 - Surxondaryo viloyati saylov okrugi", region: "Surxondaryo viloyati", districts: ["Termiz shahri", "Angor tumani", "Termiz tumani"] },
  { number: 39, name: "39 - Surxondaryo viloyati saylov okrugi", region: "Surxondaryo viloyati", districts: ["Boysun tumani", "Muzrabot tumani", "Sherobod tumani"] },
  { number: 40, name: "40 - Surxondaryo viloyati saylov okrugi", region: "Surxondaryo viloyati", districts: ["Jarqo'rg'on tumani", "Bandixon tumani", "Qiziriq tumani"] },
  { number: 41, name: "41 - Surxondaryo viloyati saylov okrugi", region: "Surxondaryo viloyati", districts: ["Oltinsoy tumani", "Qumqo'rg'on tumani (qisman)", "Sho'rchi tumani (qisman)"] },
  { number: 42, name: "42 - Surxondaryo viloyati saylov okrugi", region: "Surxondaryo viloyati", districts: ["Denov tumani", "Sho'rchi tumani (qisman)"] },
  { number: 43, name: "43 - Surxondaryo viloyati saylov okrugi", region: "Surxondaryo viloyati", districts: ["Sariosiyo tumani", "Uzun tumani", "Sho'rchi tumani (qisman)"] },

  // Toshkent viloyati (44-50)
  { number: 44, name: "44 - Toshkent viloyati saylov okrugi", region: "Toshkent viloyati", districts: ["Nurafshon shahri", "Piskent tumani", "Oqqo'rg'on tumani", "O'rtachirchiq tumani (qisman)", "Quyi Chirchiq tumani (qisman)"] },
  { number: 45, name: "45 - Toshkent viloyati saylov okrugi", region: "Toshkent viloyati", districts: ["Ohangaron tumani", "Ohangaron shahri", "Angren shahri", "Olmaliq shahri"] },
  { number: 46, name: "46 - Toshkent viloyati saylov okrugi", region: "Toshkent viloyati", districts: ["Bekobod shahri", "Bekobod tumani", "Bo'ka tumani"] },
  { number: 47, name: "47 - Toshkent viloyati saylov okrugi", region: "Toshkent viloyati", districts: ["Chirchiq shahri", "Bo'stonliq tumani", "Qibray tumani (qisman)"] },
  { number: 48, name: "48 - Toshkent viloyati saylov okrugi", region: "Toshkent viloyati", districts: ["Zangiota tumani", "Toshkent tumani", "Qibray tumani (qisman)"] },
  { number: 49, name: "49 - Toshkent viloyati saylov okrugi", region: "Toshkent viloyati", districts: ["Parkent tumani", "Yuqori Chirchiq tumani", "O'rta Chirchiq tumani (qisman)", "Qibray tumani (qisman)"] },
  { number: 50, name: "50 - Toshkent viloyati saylov okrugi", region: "Toshkent viloyati", districts: ["Yangiyo'l shahri", "Chinoz tumani", "Yangiyo'l tumani", "Quyi Chirchiq tumani (qisman)"] },

  // Farg'ona viloyati (51-58)
  { number: 51, name: "51 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Beshariq tumani", "O'zbekiston tumani", "Furqat tumani (qisman)"] },
  { number: 52, name: "52 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Qo'qon shahri", "Dang'ara tumani", "Furqat tumani (qisman)"] },
  { number: 53, name: "53 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Uchko'prik tumani", "Buvayda tumani"] },
  { number: 54, name: "54 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Bag'dod tumani", "Rishton tumani", "So'x tumani"] },
  { number: 55, name: "55 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Oltiariq tumani", "Qo'shtepa tumani"] },
  { number: 56, name: "56 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Marg'ilon shahri", "Toshloq tumani", "Farg'ona shahri (qisman)"] },
  { number: 57, name: "57 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Farg'ona tumani (to'liq)", "Farg'ona shahri (qisman)"] },
  { number: 58, name: "58 - Farg'ona viloyati saylov okrugi", region: "Farg'ona viloyati", districts: ["Quva tumani", "Yozyovon tumani", "Quvasoy shahri", "Farg'ona shahri (qisman)"] },

  // Xorazm viloyati (59-62)
  { number: 59, name: "59 - Xorazm viloyati saylov okrugi", region: "Xorazm viloyati", districts: ["Urganch shahri", "Xonqa tumani", "Urganch tumani (qisman)"] },
  { number: 60, name: "60 - Xorazm viloyati saylov okrugi", region: "Xorazm viloyati", districts: ["Xiva shahri", "Qo'shko'pir tumani", "Xiva tumani", "Urganch tumani (qisman)", "Yangiariq tumani (qisman)"] },
  { number: 61, name: "61 - Xorazm viloyati saylov okrugi", region: "Xorazm viloyati", districts: ["Bog'ot tumani", "Gurlan tumani", "Hazorasp tumani", "Shovot tumani"] },
  { number: 62, name: "62 - Xorazm viloyati saylov okrugi", region: "Xorazm viloyati", districts: ["Yangibozor tumani", "Tuproqqal'a tumani", "Pitnak shahri", "Yangiariq tumani (qisman)"] },

  // Qashqadaryo viloyati (63-69)
  { number: 63, name: "63 - Qashqadaryo viloyati saylov okrugi", region: "Qashqadaryo viloyati", districts: ["Qarshi shahri", "Nishon tumani"] },
  { number: 64, name: "64 - Qashqadaryo viloyati saylov okrugi", region: "Qashqadaryo viloyati", districts: ["G'uzor tumani", "Dehqonobod tumani", "Kasbi tumani"] },
  { number: 65, name: "65 - Qashqadaryo viloyati saylov okrugi", region: "Qashqadaryo viloyati", districts: ["Muborak tumani", "Mirishkor tumani", "Qarshi tumani (qisman)"] },
  { number: 66, name: "66 - Qashqadaryo viloyati saylov okrugi", region: "Qashqadaryo viloyati", districts: ["Qamashi tumani", "Koson tumani", "Qarshi tumani (qisman)"] },
  { number: 67, name: "67 - Qashqadaryo viloyati saylov okrugi", region: "Qashqadaryo viloyati", districts: ["Chiroqchi tumani", "Kitob tumani", "Shahrisabz shahri"] },
  { number: 68, name: "68 - Qashqadaryo viloyati saylov okrugi", region: "Qashqadaryo viloyati", districts: ["Yakkabog' tumani", "Shahrisabz tumani"] },
  { number: 69, name: "69 - Qashqadaryo viloyati saylov okrugi", region: "Qashqadaryo viloyati", districts: ["Kamashi tumani", "Tangi tumani", "Beshkent tumani"] },

  // Toshkent shahri (70-75)
  { number: 70, name: "70 - Toshkent shahar saylov okrugi", region: "Toshkent shahri", districts: ["Bektimir tumani", "Mirobod tumani", "Yashnobod tumani (qisman)"] },
  { number: 71, name: "71 - Toshkent shahar saylov okrugi", region: "Toshkent shahri", districts: ["Uchtepa tumani (to'liq)", "Chilonzor tumani (qisman)"] },
  { number: 72, name: "72 - Toshkent shahar saylov okrugi", region: "Toshkent shahri", districts: ["Yangihaёt tumani", "Sergeli tumani", "Yakkasaroy tumani", "Chilonzor tumani (qisman)"] },
  { number: 73, name: "73 - Toshkent shahar saylov okrugi", region: "Toshkent shahri", districts: ["Mirzo Ulug'bek tumani (to'liq)", "Yashnobod tumani (qisman)", "Yunusobod tumani (qisman)"] },
  { number: 74, name: "74 - Toshkent shahar saylov okrugi", region: "Toshkent shahri", districts: ["Shayxontohur tumani (to'liq)", "Olmazor tumani (qisman)"] },
  { number: 75, name: "75 - Toshkent shahar saylov okrugi", region: "Toshkent shahri", districts: ["Yunusobod tumani (qisman)", "Olmazor tumani (qisman)"] },
];
